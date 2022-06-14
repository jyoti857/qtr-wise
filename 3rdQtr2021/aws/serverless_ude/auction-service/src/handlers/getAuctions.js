import AWS from 'aws-sdk'
import middy from '@middy/core';
import commonMiddleware from '../lib/commonMiddleware'
import getAuctionsSchema from '../lib/schema/getAuctionsSchema'
import validtor from '@middy/validator'
import createError from 'http-errors';
const dynamodb = new AWS.DynamoDB.DocumentClient();

const getAuctions = async (event, context) => {
  const { status } = event.queryStringParameters;
  console.log("status *** ---> ", status)
  let auctions;
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: "statusAndEndDate",
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeValues: {
      ':status': status,
    },
    ExpressionAttributeNames: {
      "#status": 'status'
    }
  }
  try {
    // const result = await dynamodb.scan({
    //   TableName: process.env.AUCTIONS_TABLE_NAME
    // }).promise()
    const result = await dynamodb.query(params).promise();
    auctions = result.Items;
  } catch (err) {
    console.error(err)
    throw new createError.InternalServerError(err)
  }
  return {
    statusCode: 200,
    body: JSON.stringify(auctions)
  }
}

export const handler = commonMiddleware(getAuctions).use(
  validtor({
    inputSchema: getAuctionsSchema,
    ajvOptions: {
      useDefaults: true,  
      strict: false,
    },
  })
)