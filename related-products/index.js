require('dotenv').config()
const axios = require("axios");
const product_sku_csv = ['pi_test_1', 'pi_test_2', 'pi_test_3', 'pi_test_4' ,'pi_test_5']
let productID 
let related_product_ids


const getProducts = async (sku) =>{
    let temp = []
for (let i=0; i < sku.length; i++) {


let res = await axios
.get(
  `https://api.bigcommerce.com/stores/bnr41x692p/v3/catalog/products?sku=${sku[i]}`,
  {
    headers: {
      "X-Auth-Client": `${process.env.GB_S_CLIENT}`,
      "X-Auth-Token": `${process.env.GB_S_TOKEN}`,
    },
  }
)
temp.push({"pid":res.data.data[0].id, "sku":res.data.data[0].sku, "id":res.data.data[0].related_products})
}
return temp
}









const getRelatedSKUs = async (obj) =>{
    for (let i=0; i < obj.length; i++) {
        for (let j=0; j < obj[i].id.length; j++) {
    let res = await axios
    .get(
      `https://api.bigcommerce.com/stores/bnr41x692p/v3/catalog/products?id=${obj[i].id[j]}`,
      {
        headers: {
          "X-Auth-Client": `${process.env.GB_S_CLIENT}`,
          "X-Auth-Token": `${process.env.GB_S_TOKEN}`,
        },
      }
    )
    // console.log(res.data.data[0].sku, res.data.data[0].availability, res.data.data[0].is_visible)
    if(res.data.data[0].availability == 'disabled' || res.data.data[0].availability.toLowerCase() == 'discontinued' || res.data.data[0].is_visible != true){
        console.log(res.data.data[0].sku + ' is not elligile for migration')
        obj[i].id[j] = null
    }else{
        obj[i].id[j] = res.data.data[0].sku
    }


    }
    }

    return obj
}









const getProductIDs = async (list) =>{
    for (let i=0; i < list.length; i++) {
        for (let j=0; j < list[i].id.length; j++) {
    let res = await axios
    .get(
      `https://api.bigcommerce.com/stores/yy9d3il1gg/v3/catalog/products?sku=${list[i].id[j]}`,
      {
        headers: {
          "X-Auth-Client": `${process.env.SC_S_CLIENT}`,
          "X-Auth-Token": `${process.env.SC_S_TOKEN}`,
        },
      }
    )
    if(res.data.data[0]){
    list[i].id[j] = res.data.data[0].id
    } else{
      
        list[i].id[j]=null
    }
    }
    }
    return list
}






const getScId = async (list) => {
    for (let i=0; i < list.length; i++) {
        let res = await axios
        .get(
          `https://api.bigcommerce.com/stores/yy9d3il1gg/v3/catalog/products?sku=${list[i].sku}`,
          {
            headers: {
              "X-Auth-Client": `${process.env.SC_S_CLIENT}`,
              "X-Auth-Token": `${process.env.SC_S_TOKEN}`,
            },
          }
        )
        if(res.data.data[0]){
        list[i].pid = res.data.data[0].id
        } else
        list[i] = null
    }
    return list
}

const filterProducts = async (list) =>{
    for (let i=0; i < list.length; i++) {
        if(list[i]){
        let temp = await list[i].id.filter( x => !!x)
        list[i].id = temp
        }
    }
    return list
}

const updateProducts = async (list) =>{
    for (let i=0; i < list.length; i++) {
        if(list[i]){
            for (let j=0; j < list[i].id.length; j++) {
                let res = await axios
                .put(
                  `https://api.bigcommerce.com/stores/yy9d3il1gg/v3/catalog/products`,
                  [{
                      "id":list[i].pid,
                      "related_products": [...list[i].id]
                  }],
                  {
                    headers: {
                      "X-Auth-Client": `${process.env.SC_S_CLIENT}`,
                      "X-Auth-Token": `${process.env.SC_S_TOKEN}`,
                    },
                  }
                )
            }
        }
    }

}










getProducts(product_sku_csv)
.then(async response =>{
   return await getRelatedSKUs(response)
})


.then(async response =>{
return await getProductIDs(response)
})
.then(async response =>{
    return await getScId(response)
})
.then(async response =>{
    // console.log(response)
    return await filterProducts(response)
})
.then(async response =>{
    console.log(response)
    await updateProducts(response)
})
.catch(err =>{
    console.log(err)
})
 

//hidden or discountinued 
