const fs = require('fs')

// fs.readFile('./dateRange.json', 'utf-8', (err, raw_data) =>{
//   const {data} = JSON.parse(raw_data)
//   let count = 0
//   data.forEach(cons => {
//     console.log("email -->", cons.hcp.email)
//     // console.log("name -->", hcp.firstName, " ", hcp.lastName)
//   });
// })


fs.readFile('./details.json', 'utf-8', (err, raw_data) =>{
  const {data} = JSON.parse(raw_data)
  let count = 0
  // console.log(data[482].email)
  data.forEach((hcp, idx) => {
    //"2021-05-06T03:52:44.686Z"
    const consents = hcp.consents
    consents.forEach((cons) => {
      const range_date = cons.startDate.toString().split("T")[0].toString().split("-")[2]
      const range_month = cons.startDate.toString().split("T")[0].toString().split("-")[1]
      if(range_date>=12 && range_date<=22 && range_month==04){
        console.log("email--> ", hcp.email)
        // console.log("start date --> ", cons.startDate)
      }
    })
  })
})