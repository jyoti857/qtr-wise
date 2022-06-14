import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();

export const closeAuction = async (auction) => {

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED'
    },
    ExpressionAttributeNames: {
      "#status": 'status'
    }
  }
  const { title, seller, highestBid: { amount, bidder } } = auction;
  // const result = 
  await dynamodb.update(params).promise();
  // return result;

  if (amount === 0) {
    await sqs.sendMessage({
      QueueUrl: process.env.MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        recipient: seller,
        subject: "No bids on your auction item :(",
        body: `oh no! Your item ${title} did not get any bids. Better luck next time!`
      })
    }).promise()
    return;
  }
  const notifySeller = sqs.sendMessage({
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
      recipient: seller,
      subject: "your item has been sold!",
      body: `woohoo! your item ${title} has been sold for $${amount}!`
    })
  }).promise();

  const notifyBidder = sqs.sendMessage({
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
      recipient: bidder,
      subject: "You won the auction!",
      body: `What a great deal, you got yourself a ${title} for $${amount}!`
    })
  }).promise();

  return Promise.all([notifyBidder, notifySeller])


}