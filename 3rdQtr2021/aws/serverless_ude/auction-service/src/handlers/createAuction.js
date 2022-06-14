// async function createAuction(event, context) {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ event, context }),
//   };
// }

// export const handler = createAuction;

import { v4 as uuid } from 'uuid'
import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors'; // it will help showing the errors in 
/// more declarative way

import createAuctionSchema from '../lib/schema/createAuctionSchema'
import validator from '@middy/validator';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const { title } = event.body
  const { email } = event.requestContext.authorizer
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1)
  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0
    },
    seller: email,
    pictureUrl: null,
  }

  try {
    await dynamodb.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,//"AuctionTable",
      Item: auction
    }).promise()
  } catch (err) {
    console.error(err)
    throw createError.InternalServerError(err)
  }
  return {
    statusCode: 201,
    body: JSON.stringify(auction)
  }
}

export const handler = commonMiddleware(createAuction)
  .use(
    validator({
      inputSchema: createAuctionSchema,
      ajvOptions: {
        strict: false,
      },
    })
  )


// export const handler = createAuction;