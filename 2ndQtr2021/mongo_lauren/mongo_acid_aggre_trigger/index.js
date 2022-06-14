const {MongoClient} = require('mongodb');
const {listDatabase, getCollection, createReservation} = require('./utils/aggre')
const main = async()=>{
  const mongoUri = "mongodb://127.0.0.1:27017/";

  const client = new MongoClient(mongoUri, {useUnifiedTopology: true});
  console.log("Sdsd")
  try{
    console.log("connect")
    await client.connect()
    const listingsAndReviewsCollection = await listDatabase(client, 'sample_airbnb', 'listingsAndReviews') //, {name: {$eq: "Infinite Views"}});
    // const listingAndReview = await listingsAndReviewsCollection.map(d => d)
    // console.log("listingsAndReviews ---> ", Object.keys(listingAndReview[0]))
    // users 
    const usersCollection = await listDatabase(client, 'sample_airbnb', 'users') //, {email: {$eq: 'leslie@example.com'}});
    // const users = await usersCollection.find(d => d)
    // console.log("users ---> ", users)

    // create users 
    // const insertUsers =  await getCollection(client, 'sample_airbnb', 'users').insertMany([
    //   {
    //     email: "leslie@example.com",
    //     name: "Leslie Yepp"
    // },
    // {
    //     email: "april@example.com",
    //     name: "April Ludfence"
    // },
    // {
    //     email: "tom@example.com",
    //     name: "Tom Haverdodge"
    // }
    // ])
    // console.log("insert users --->", insertUsers);


   await createReservation(client, usersCollection, listingsAndReviewsCollection,  "leslie@example.com",  "Infinite Views",
   [new Date("2019-12-31"), new Date("2020-01-01")],
   { pricePerNight: 180, specialRequests: "Late checkout", breakfastIncluded: true });


  }catch(e){
    console.error(e)
  }finally{
    client.close();
  }
}
main().catch(console.err)