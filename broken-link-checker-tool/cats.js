const axios = require('axios')

 const cats = async () => {
    const buffer = []
    let next = ""
    do {
      let response = await axios.get(`https://api.bigcommerce.com/stores/eem7ijc77k/v3/catalog/categories?limit=250${next}`, {
        headers:{
          'X-Auth-Client':'d3d8a315pdevkzx95rd64refcq7d5ji',
          'X-Auth-Token':'5lpehaxhqjyoysod8gj8bsblbwlx78f'
        }})
        buffer.push(...response.data.data)
        next = response.data.meta.pagination.links.next
    } while (next);
    return buffer
  }

  cats().then(res => {
      let buffer_names =[]
    for (let i=0; i < res.length; i++) {
        if(res[i].description.includes('redirect_url')){
            buffer_names.push({'id':res[i].id,"parent_id":res[i].parent_id,'name':res[i].name, 'description':res[i].description})
        }
    }
    return buffer_names
    
  })
  .then(async res =>{
    for (let i=0; i < res.length; i++) {
      let response = await axios.get(`https://api.bigcommerce.com/stores/eem7ijc77k/v3/catalog/categories/${res[i].parent_id}`, {
        headers:{
          'X-Auth-Client':'d3d8a315pdevkzx95rd64refcq7d5ji',
          'X-Auth-Token':'5lpehaxhqjyoysod8gj8bsblbwlx78f'
        }})
        res[i].parent_url = response.data.data.custom_url.url
  }
  console.log(res)
  })