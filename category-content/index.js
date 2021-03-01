require('dotenv').config()
const axios = require("axios");

let sourceStoreHash = 'bnr41x692p'
let sourceStoreName = 'servocity_staging'
let destinationStore='yy9d3il1gg'


const getCategoryContent = async () =>{
    const buffer = []
    let next = ""
    do {
      let response = await axios.get(`https://api.bigcommerce.com/stores/${sourceStoreHash}/v3/catalog/categories?limit=250${next}`, {
        headers:{
          'X-Auth-Client':process.env.GOBILDA_STAGING_CLIENT,
          'X-Auth-Token':process.env.GOBILDA_STAGING_TOKEN
        }})
        buffer.push(...response.data.data)
        next = response.data.meta.pagination.links.next
    } while (next);
    return buffer
  }



getCategoryContent()
.then(res => {
    console.log(res)
    
})