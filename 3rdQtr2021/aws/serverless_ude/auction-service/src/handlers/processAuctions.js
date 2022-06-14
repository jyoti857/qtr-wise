import { closeAuction } from "../lib/closeAuction";
import { getEndAuctions } from "../lib/getEndAuctions";
import createError from 'http-errors'
async function processAuctions(event, context) {
  try {
    console.log("processing auction");
    const auctionsToClose = await getEndAuctions()
    console.log("auction to close ", auctionsToClose);
    const closePromises = auctionsToClose.map(auction => closeAuction(auction)) // return the array of promises 
    await Promise.all(closePromises)
    return { closed: closePromises.length }
  } catch (err) {
    console.error(err)
    throw new createError.InternalServerError(err)
  }
}

export const handler = processAuctions;