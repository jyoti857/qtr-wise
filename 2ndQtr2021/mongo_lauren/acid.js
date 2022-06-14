function createReservationDocument(nameOfListing, reservationDates, reservationDetails){
  // create the reservation 
  let reservation = {
    name: nameOfListing,
    dates: reservationDates
  }

  for(let i in reservationDetails){
    reservation[i] = reservationDetails[i]
  }

  return reservation;
}

async function createReservation(client, userEmail, nameOfListing, reservationDates, reservationDetails){
  const userCollection = client.db("sample_airbnb").collection("users")
  const listingsAndReviewsCollection = client.db("sample_airbnb").collection("listingsAndReviews")
  

  // add the reservation document that will be added to the users collections document for this user 
  const reservation = createReservationDocument(nameOfListing, reservationDates, reservationDetails)


  // step: 1, Start a Client session
  const session = client.startSession()
  // step: 2, Optional, define options for the transaction
  const transactionOptions = {
    readPreference: "primary",
    readConcern: {level: 'local'},
    writeConcern: {w: 'majority'}
  };

  try{
    const transactionResults = await session.withTransaction(async() => {
      // must pass the session to each of the operations
      const usersUpdateResults = await userCollection.updateOne(
        {email: userEmail}, 
        {$addToSet: {reservations: reservation}},
        {session}
      )
      console.log(`${usersUpdateResults.matchedCount} document(s) found in the users collection with the email address ${userEmail}.`);
      console.log(`${usersUpdateResults.modifiedCount} document(s) was/were updated to include the reservation.`);
      
      const isListingReservedResults = await listingsAndReviewsCollection.findOne(

        {name: nameOfListing, datesReserved: {$in: reservationDates}},
        {session}
      );
      if(isListingReservedResults){
        await session.abortTransaction();
        console.error("This listing is already reserved for at least one of the given dates. The reservation could not be created.");
        console.error("Any operations that already occurred as part of this transaction will be rolled back.")
        return;
      }
      //  Add the reservation dates to the datesReserved array for the appropriate document in the listingsAndRewiews collection
      const listingsAndReviewsUpdateResults = await listingsAndReviewsCollection.updateOne(
        {name: nameOfListing},
        {$addToSet: {datesReserved: {$each: reservationDates}}},
        {session}
      )
      console.log(`${listingsAndReviewsUpdateResults.matchedCount} document(s) found in the listingsAndReviews collection with the name ${nameOfListing}.`);
      console.log(`${listingsAndReviewsUpdateResults.modifiedCount} document(s) was/were updated to include the reservation dates.`);
    }, transactionOptions);
    if(transactionResults){
      console.log("The reservation was successfully created")
    }else{
      console.log("The transaction was intentionally aborted")
    }
  }catch(err){
    console.error("The transaction was intentionally aborted.");
  }finally{
    await session.endSession();
  }

}

module.exports = {createReservation}