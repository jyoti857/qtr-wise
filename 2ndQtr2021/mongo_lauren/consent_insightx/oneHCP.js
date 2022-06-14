const fs = require('fs')

fs.readFile('./oneHCP.json', 'utf-8', (err, raw_data) => {
  const {data: hcp} = JSON.parse(raw_data)
  
    console.log("user details --> ", hcp.email)
    console.log("id --> ", hcp.id)
    console.log("id --> ", hcp.email)
    console.log("hcp type --> ", hcp.hcptypeCode)
    // console.log("start date --> ", hcp.startDate, "end data--> ", hcp.endDate)
    // console.log("hcp state --> ", hcp.addresses[0].state)
    // console.log("Corporate prefid---> ", hcp.consents[1].preferenceId)
    // console.log("Corporate subscibed---> ", hcp.consents[1].subscribed)
    // console.log("Corporate source ---> ", hcp.consents[1].source)
    // console.log("HTS prefid---> ", hcp.consents[0].preferenceId)
    // console.log("HTS subscribed ---> ", hcp.consents[0].subscribed)
    console.log("HTS source---> ", hcp.consents[0].source)
})