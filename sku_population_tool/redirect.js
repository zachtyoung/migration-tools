require('dotenv').config()
const axios = require("axios");
const categories = [543,798,801,836,799,898]
const storeHash = 'yy9d3il1gg'
const buffer = []
for(var i in categories){
    axios
.get(
  `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?categories:in=${categories[i]}&limit=250 `,
  {
    headers: {
      "X-Auth-Client": `${process.env.SC_S_CLIENT}`,
      "X-Auth-Token": `${process.env.SC_S_TOKEN}`,
    },
  }
)
.then(res => res.data.data.forEach(el => {
    let slug = el.custom_url.url.replace(/\//g, '');
        axios.put(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${el.id}`,{ sku: `rd-${slug}` },
            {
              headers: {
                "X-Auth-Client": `${process.env.SC_S_CLIENT}`,
                "X-Auth-Token": `${process.env.SC_S_TOKEN}`,
              },
            }
          )
}))
}
