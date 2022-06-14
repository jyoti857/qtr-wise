import { uploadPictureToS3 } from "../lib/uploadPictureToS3";
import { getAuctionById } from "./getAuction";
import middy from '@middy/core'
import httpErrorHandler from "@middy/http-error-handler";
import createError from 'http-errors';
import { setAuctionPictureUrl } from "../lib/setAuctionPictureUrl";
import validator from "@middy/validator";
import uploadAuctionPictureSchema from '../lib/schema/uploadAuctionPictureSchema'
export async function uploadAuctionPicture(event) {
  const { id } = event.pathParameters;
  const { email } = event.requestContext.authorizer
  const auction = await getAuctionById(id);
  const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64')

  if (auction.seller !== email) {
    throw new createError.InternalServerError('You are not the seller of this auction!')
  }
  let updatedAuction;
  try {
    const pictureUrl = await uploadPictureToS3(auction.id + 'jpg', buffer);
    console.log("upload to s3 result --->", pictureUrl)
    updatedAuction = await setAuctionPictureUrl(auction.id, pictureUrl)
  } catch (err) {
    console.error(err)
    throw new createError.InternalServerError(err)
  }
  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction)
  }
}

export const handler = middy(uploadAuctionPicture)
  .use(httpErrorHandler())
  .use(validator({
    inputSchema: uploadAuctionPictureSchema,
    ajvOptions: {
      strict: false,
    }
  }))

