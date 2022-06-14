

async function listDatabase(client, db_name, collection_name, ...args ){
  const dbList = await client.db(db_name).collection(collection_name);
  console.log("type of s ", typeof dbList)
  // return dbList.find(args[0]).toArray();
  return dbList //.find().toArray();
}

function getCollection(client, dbName, collectionName){
  return  client.db(dbName).collection(collectionName).find().toArray();
}

// create reservation document
function createReservationDocument(nameOfListing, reservationDates, reservationDetails){
  // create reservation
  const reservation = {
    name: nameOfListing,
    dates: reservationDates
  };

  // add additional details properties from reservationDetails to the reservation
  for(let detail in reservationDetails){
    reservation[detail] = reservationDetails[detail];
  }
  return reservation;
}

// create reservation using transaction 
async function createReservation(client, userCollection, listingsAndReviewsCollection,  userEmail, nameOfListing, reservationDates, reservationDetails){
  // const userCollection = getCollection(client, userColle);
  // const listingsAndReviewsCollection = getCollection(client, listingColle);
  const reservation = createReservationDocument(nameOfListing, reservationDates, reservationDetails);

  // start a session 
  const session = client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: {level: 'local'},
    writeConcern: {w: 'majority'}
  };
  console.log("stage 1 ")
  try{
    console.log("stage inside try 1 ")
    const transactionResults = await session.withTransaction(async () => {
      const userUpdateResults = await userCollection.updateOne(
        {email: userEmail}, 
        {$addToSet: {reservations: reservation}},
        {session}  
        );
        console.log("stage inside try 2 ")
        
      console.log(`${userUpdateResults.matchedCount} document(s) found in the user collection`);
      console.log(`${userUpdateResults.modifiedCount} document(s) updated!`);

      // check the listing results
      const isListingReservedResults = await listingsAndReviewsCollection.findOne(
        {name: nameOfListing, datesReserved: {$in: reservationDates}},
        {session}
      );
      if(isListingReservedResults){
        await session.abortTransaction();
        console.error("this listing is already reserved at least one of the given dates. The reservation could not be created!");
        console.err("Any operations that already occured as part of this transaction will be roll back!");
        return;
      }

      const listingAndReviewsUpdateResults = await listingsAndReviewsCollection.updateOne(
        {name: nameOfListing},
        {$addToSet: {datesReserved: {$each: reservationDates}}},
        {session}
      )
      console.log(`${listingsAndReviewsUpdateResults.matchedCount} document(s) found in the listingsAndReviews collection with the name ${nameOfListing}.`);
      console.log(`${listingsAndReviewsUpdateResults.modifiedCount} document(s) was/were updated to include the reservation dates.`);
    }, transactionOptions);

    if(transactionResults){
      console.log("The reservation was successfully created!!")
    }else{
      console.log("The transaction was intentionally aborted!!");
    }
  }catch(err){
    console.log("transaction fails here!!", err)
  }
}



module.exports = {listDatabase, getCollection, createReservation}