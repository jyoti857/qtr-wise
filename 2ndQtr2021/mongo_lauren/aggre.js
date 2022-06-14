

const easyConnectProcess = client => client.db("sample_airbnb").collection("listingAndReviews")
// create a cheapest suburbs

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

  const aggCursor = client.db("sample_airbnb").collection("listingsAndReviews").aggregate(pipeline)
  //  easyConnectProcess(client).aggregate(pipeline)
  await aggCursor.forEach(listing => {
    console.log(`${listing._id}: ${listing.avgPrice}`)
  })
}

module.exports=printCheapestSuburbs