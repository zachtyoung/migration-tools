require('dotenv').config()
const axios = require("axios");
const storeHash = 'yy9d3il1gg'
const buffer = []
const getAllProducts = async () => {
    const buffer = []
    let next = ""
    do {
      let response = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?limit=250&include=custom_fields${next}`, {
        headers:{
            "X-Auth-Client": `${process.env.SC_S_CLIENT}`,
            "X-Auth-Token": `${process.env.SC_S_TOKEN}`,
        }})
        buffer.push(...response.data.data)
        next = response.data.meta.pagination.links.next
    } while (next);
    return buffer
  }
  getAllProducts()
  .then(res =>{
      for(var i in res){
          res[i].custom_fields.forEach(el =>{
              if(el.name == 'child_product' && !res[i].sku){
                  console.log(res[i].name)
              }
          })
      }
  })