const fs = require('fs')

fs.readFile('./details.json', 'utf-8', (err, raw_data) =>{
  const {data} = JSON.parse(raw_data)
  let count = 0
  // console.log(data[482].email)
  data.forEach((hcp, idx) => {
    // if(hcp.consents.length === 2){
    //   count++
    //   // console.log("hcp ---> ", idx, count, hcp.id)
    //   console.log(count)
    // }
    // console.log("hcp type code ---> ", hcp.hcptypeCode)
    // if(hcp.hcptypeCode === null){
    //   count++
    //   console.log("hcp type ---> ", hcp.hcptypeCode)
    //   console.log(count)
    // }
    
    // checking the user details by email 
    // if(hcp.email === "esther.mondo@bannerhealth.com"){
    //   console.log("user details --> ", hcp.email)
    //   console.log("id --> ", hcp.id)
    //   console.log("name --> ", hcp.firstName, " ", hcp.lastName)
    //   console.log("hcp type --> ", hcp.hcptypeCode)
    //   console.log("start date --> ", hcp.consents[0].startDate, "end data--> ", hcp.consents[0].endDate)
    //   console.log("created at --> ", hcp.consents[0].createdAt)
    //   console.log("start date --> ", hcp.consents[1].startDate, "end data--> ", hcp.consents[1].endDate)
    //   console.log("created at --> ", hcp.consents[1].createdAt)
    //   console.log("hcp type --> ", hcp.hcptypeCode)
    //   console.log("hcp state --> ", hcp.addresses[0].state)
    //   console.log("Corporate ---> ", hcp.consents[0].preferenceId)
    //   console.log("Corporate ---> ", hcp.consents[0].subscribed)
    //   console.log("Corporate ---> ", hcp.consents[1].preferenceId)
    //   console.log("Corporate ---> ", hcp.consents[1].subscribed)
    // }
    
    // checking consents by date range 
    // count++
    const pref1 = hcp.consents[0]?.createdAt.split("T")[0].split("-")
    const pref2 = hcp.consents[1]?.createdAt.split("T")[0].split("-")
    // console.log("email --->", hcp.email, count)
    // console.log(data[480].email)
    // console.log("pref1 --> ", pref1?.createdAt)
    //.createdAt.split("T")[0].split("-")

    // console.log(typeof pref1[1], pref1[2])
    // if(+pref1[1] === 04 && +pref1[2] >=20 && +pref1[2] <= 30 ){
    //   console.log(hcp.consents[0].updatedAt)
    //   console.log("date range email -->", hcp.email)
    // }

    if(hcp.hcptypeCode === 'NURSE'){
      count ++
      console.log("nurse count -->", hcp.email, "--> ", hcp.id)
    }
    // --------------
    const consentArr = hcp.consents
    consentArr.forEach((conse ) => {
      // console.log(conse.subscribed===true ? conse.subscribed: "apple")
      if(
        // conse.preferenceId === "8E4C9600-F096-EB11-85AA-000D3A1253CD" &&
        // conse.subscribed === true &&
          // conse.source ==="CHUB" &&
         hcp.hcptypeCode === 'NURSE' && false
      ){
      count++
      console.log("count --> ", count)
      console.log("email --> ", hcp.email)
      console.log("source --> ", conse.source)
      console.log("hcp type --> ", hcp.hcptypeCode)
      console.log("hcp type --> ", hcp.id)
    }
    })
  })
})
