require('dotenv').config()
const axios = require("axios");
// OPTIONS SET HERE
const store = 'GB_S' //Options are GB_S, GB_P, SC_S, SC_P for servocity and gobila staging and production respectively
const storeHash = 'bnr41x692p' // Store hash
const categoryName='Redirect Products' // Name of redirect category, name is dependent on store
// OPTIONS SET HERE


const client = store + '_CLIENT'
const token = store + '_TOKEN'
let buffer =[]
const crawl = async (object, target) =>{
  for (var i in object) {
    if (object[i] !== null && typeof(object[i])=="object") {
      if(object[i].name == target){
        buffer.push(String(object[i].id))
     return object[i].children
    }
      crawl(object[i].children, target)
    }
  }
}
const digestChildren = (object)=>{
  for (var i in object) {
    if (object[i] !== null && typeof(object[i])=="object") {
      buffer.push(String(object[i].id))
      digestChildren(object[i].children)
    }
   
  }

}

axios.get(
  `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/tree`,
  {
    headers: {
      "X-Auth-Client": process.env[client],
      "X-Auth-Token": process.env[token],
    },
  }
)
.then(res => {
  crawl(res.data.data, categoryName)
  .then(res => {
    digestChildren(res)
    for(var i in buffer){
      axios
  .get(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?categories:in=${categories[i]}&limit=250 `,
    {
      headers: {
        "X-Auth-Client": process.env[client],
        "X-Auth-Token": process.env[token],
      },
    }
  )
  .then(res => res.data.data.forEach(el => {
      let slug = el.custom_url.url.replace(/\//g, '');
          axios.put(
              `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${el.id}`,{ sku: `rd-${slug}` },
              {
                headers: {
                  "X-Auth-Client": process.env[client],
                  "X-Auth-Token": process.env[token],
                },
              }
            )
  }))
  }
  
  })
  
})



