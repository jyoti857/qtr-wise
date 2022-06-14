import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'eu-west-1' });


async function sendMail(event, context) {
  const record = event.Records[0]
  console.log("record processing ---> ", record)

  const mail = JSON.parse(record.body)
  const { subject, body, recipient } = mail
  const params = {
    Source: 'jyotiranjan739@gmail.com', // the sender, that I verfied using Amazon SES
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      }
    }
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log('send mail return result -->', result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
export const handler = sendMail;
