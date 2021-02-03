require('dotenv').config()
const axios = require("axios");

const getCategoryContent = async () =>{
    const buffer = []
    let next = ""
    do {
      let response = await axios.get(`https://api.bigcommerce.com/stores/bnr41x692p/v3/catalog/categories?limit=250${next}`, {
        headers:{
          'X-Auth-Client':process.env.GB_S_CLIENT,
          'X-Auth-Token':process.env.GB_S_TOKEN
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