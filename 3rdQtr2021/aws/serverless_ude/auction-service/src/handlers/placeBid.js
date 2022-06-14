import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors';
import { getAuctionById } from './getAuction';
import validator from '@middy/validator';
import placeBidSchema from '../lib/schema/placeBidSchema'

const dynamodb = new AWS.DynamoDB.DocumentClient();

const placeBid = async (event, context) => {
  const { id } = event.pathParameters
  const { amount } = event.body;
  const { email } = event.requestContext.authorizer;
  const auction = await getAuctionById(id)
  if (auction.status !== 'OPEN') {
    console.log("auction.status --->", auction)
    throw new createError.Forbidden('Can not be placed a bid on a closed auction')
  }
  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden("Amount placed is not higher than the existing!")
  }
  if (auction.seller === email) {
    throw new createError.Forbidden("you can not bid on your own auctions!")
  }
  if (auction.highestBid.bidder === email) {
    throw new createError.Forbidden("you are already the highest bidder!")
  }
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set highestBid.amount = :amount, highestBid.bidder = :email',
    // need to mention the :amount, basically a mapping :amount --> amount variable comes from event.body
    ExpressionAttributeValues: {
      ':amount': amount,
      ':email': email
    },
    ReturnValues: "ALL_NEW",
  };
  let updateAuction;
  try {
    const result = await dynamodb.update(params).promise();
    updateAuction = result.Attributes;
  } catch (err) {
    console.error(err)
    throw new createError.InternalServerError(err)
  }
  return {
    statusCode: 200,
    body: JSON.stringify(updateAuction)
  }
}

export const handler = commonMiddleware(placeBid)
  .use(validator({
    inputSchema: placeBidSchema,
    ajvOptions: {
      strict: false,
    }
  }))