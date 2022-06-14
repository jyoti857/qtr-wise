const { MongoClient } = require('mongodb')
const aggre = require('./aggre')
const {createReservation} = require('./acid')
const newListings = [{
  name: 'Lovely Lofl2',
  summary: "A charming loft in Paris",
  bedroom: 2,
  bathrooms: 3
  },
  {   
    name: 'Lovely Lof3',
    summary: "A charming loft in Paris",
    bedroom: 3,
    bathrooms: 4
  }
]
const main = async() => {

  const mogoUri = "mongodb://localhost:27017/memory"
  const atlasUri = 'mongodb+srv://jyoti1:jyoti123@cluster0.0tmqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  
  const atlasOwldUri = 'mongodb://jyoti1:jyoti123@cluster0-shard-00-00.0tmqu.mongodb.net:27017,cluster0-shard-00-01.0tmqu.mongodb.net:27017,cluster0-shard-00-02.0tmqu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
  
  const client  = new MongoClient(atlasOldUri, { useUnifiedTopology: true })


  try{
    await client.connect();
    // await listDatabase(client)
    // await createListing(client, newListing);
    // await createMultipleListings(client, newListings)
    // await findOneListingByName(client, "Lovely Lof3")
    // await findListingsWithMinimumBedRoomsBathroomsAndMostRecentReviews(client, 
    //   {
    //     minimumNumberOfBathrooms: 3, 
    //     minimumNumberOfBedrooms: 3
    //   }  
    // )
    // await upsertListingByName(client, 'Lovely Lof3w', {bedroom: 12, bathrooms: 22})
    // await updateAllListingsToHavePropertyType(client)
    // const s = await client.db("sample_airbnb").collection("listingsAndReviews").find().toArray()
    // console.log("s -->", s)
    // await aggre(client, "Australia", "Sydney", 5)


  //   await createMultipleUsers(client, [
  //     {
  //         email: "leslie@example.com",
  //         name: "Leslie Yepp"
  //     },
  //     {
  //         email: "april@example.com",
  //         name: "April Ludfence"
  //     },
  //     {
  //         email: "tom@example.com",
  //         name: "Tom Haverdodge"
  //     }
  // ]);
  // const createIndexResults = await client.db("sample_airbnb").collection("users").createIndex({"email": 1}, {unique: true})
  // console.log("index is creatd and created index ----> ", createIndexResults)
  

  // transaction 
  await createReservation(client, 
      "tom@example.com",
      "Infinte Views",
      [new Date("2019-12-31"), new Date("2020-01-01")],
      {pricePerNight: 180, specialRequests: "Late checkout", breakfastIncluded: true }
    )
 

  }catch(err){
    console.log("err ---> ", err)
  }finally{
    console.log("finally is called ")
    client.close()
  }
}

main().catch(console.err);

async function listDatabase(client){
  const dbList = await client.db().admin().listDatabases();
  dbList.databases.forEach(db => console.log(db.name))
  // console.log("db list --> ", dbList)
}

async function createListing(client, listing){
  const newListing = await client.db("sample_airbnb").collection("listingAndReviews")
    .insertOne(listing)
  
  console.log("New listing created with the following id: ", newListing.insertedId)
}

async function createMultipleListings(client, listings){
  const newListings = await client.db('sample_airbnb').collection("listingAndReviews")
    .insertMany(listings)
}
async function findOneListingByName(client, name){
  const result = await client.db("sample_airbnb").collection("listingAndReviews")
  .findOne({name})

  console.log("find by name documents ---> ", result.name)
}

async function findListingsWithMinimumBedRoomsBathroomsAndMostRecentReviews(client, 
  {
    minimumNumberOfBedrooms=0,
    minimumNumberOfBathrooms=0,
    maximumNumberOfResults=Number.MAX_SAFE_INTEGER
  } = 0 
  ){

      const cursor = await client.db("sample_airbnb").collection("listingAndReviews")
        .find({
          bedroom: {$gte: minimumNumberOfBedrooms},
          bathrooms: {$gte: minimumNumberOfBathrooms}
        })
      const results = await cursor.toArray(); 
      console.log("cursor from findListing...", results)

}

async function updateListingByName(client, nameOfTheListing, updateTheListing){
  const result = await client.db("sample_airbnb").collection("listingAndReviews")
    .updateOne({name: nameOfTheListing}, {$set: updateTheListing})
  // const result = await cursor.toArray()
  console.log("result after the updation ---> ", result)
}

async function upsertListingByName(client, nameOfTheListing, updateTheListing){
  const result = await client.db("sample_airbnb").collection("listingAndReviews")
  .updateOne({name: nameOfTheListing}, {$set: updateTheListing}, {upsert: true})

  const {matchedCount, modifiedCount, upsertedCount} = result
  console.log(matchedCount, " *was found.")
  if(upsertedCount > 0){
    console.log(result.upsertedCount, "row(s) inserted!")
  }else{
    console.log(modifiedCount, "row(s) updated")
  }
}

async function updateAllListingsToHavePropertyType(client){
  const result = await client.db("sample_airbnb").collection("listingAndReviews")
    .updateMany(
      {property_name: {$exists: false}}, 
      {$set: {property_name: "Unknown"}} 
    )

  console.log("result ---> ", result.matchedCount, result.updatedCount, result.matchedCount)
}

async function printCheapestSuburbs(client, country, market, maximumNumberToPrint){
  const pipeline = [
    {
      '$match': {
        'bedrooms': 1, 
        'address.country': country, 
        'address.market': market, 
        'address.suburb': {
          '$exists': 1, 
          '$ne': ''
        }, 
        'room_type': 'Entire home/apt'
      }
    }, {
      '$group': {
        '_id': '$address.suburb', 
        'avgPrice': {
          '$avg': '$price'
        }
      }
    }, {
      '$sort': {
        'avgPrice': 1
      }
    }, {
      '$limit': maximumNumberToPrint
    }
  ]
  console.log("**")
  const aggCursor = client.db("sample_airbnb").collection("listingsAndReviews").aggregate(pipeline)
  //  easyConnectProcess(client).aggregate(pipeline)
  
  // console.log("agg cursor -->", aggCursor)
  await aggCursor.forEach((listing) => {
    console.log(`${listing._id}: ${listing.avgPrice}`)
  })
}


async function createMultipleUsers(client, multipleUsers){
  const result = await client.db("sample_airbnb").collection('users').insertMany(multipleUsers)


}