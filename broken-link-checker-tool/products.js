const axios = require('axios')

 const products = async () => {
    const buffer = []
    let next = ""
    do {
      let response = await axios.get(`https://api.bigcommerce.com/stores/eem7ijc77k/v3/catalog/products?limit=250&availability=disabled&include_fields=availability_description,custom_url${next}`, {
        headers:{
          'X-Auth-Client':'d3d8a315pdevkzx95rd64refcq7d5ji',
          'X-Auth-Token':'5lpehaxhqjyoysod8gj8bsblbwlx78f'
        }})
        buffer.push(...response.data.data)
        next = response.data.meta.pagination.links.next
    } while (next);
    return buffer
  }


module.exports = products;
