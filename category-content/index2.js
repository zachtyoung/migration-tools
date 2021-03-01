require('dotenv').config()
const csv=require('csvtojson');
const csvFilePath='./categories.csv'
const axios = require("axios");


let sourceStoreHash = 'yy9d3il1gg'
let destinationStoreHash='bnr41x692p'
let categoryNameAndId = []


const getCategoryContent = async (storeHash, storeName) =>{
    storeName = storeName.toUpperCase()
    const buffer = []
    let next = ""
    do {
      let response = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories?limit=250${next}`, {
        headers:{
          'X-Auth-Client':process.env[storeName + '_CLIENT'],
          'X-Auth-Token':process.env[storeName + '_TOKEN']
        }})
        buffer.push(...response.data.data)
        next = response.data.meta.pagination.links.next
    } while (next);
    return buffer
  }

const getCustomTemplateAssociations = async (storeHash, storeName) =>{
    storeName = storeName.toUpperCase()
      let response = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/storefront/custom-template-associations?limit=250`, {
        headers:{
          'X-Auth-Client':process.env[storeName + '_CLIENT'],
          'X-Auth-Token':process.env[storeName + '_TOKEN']
        }})
        return response.data.data
}
let sourceStoreTemplates = getCustomTemplateAssociations(sourceStoreHash, 'SERVOCITY_STAGING')
let destinationStoreTemplates = getCustomTemplateAssociations(destinationStoreHash, 'GOBILDA_STAGING')

getCategoryContent(sourceStoreHash, 'SERVOCITY_STAGING')
.then(res => {
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        for (var i in jsonObj) {
            for(var j in res){
                if(res[j].name == jsonObj[i].Name){
                   categoryNameAndId.push({"name":res[j].name, "id":res[j].id, "description":res[j].description})
                }
            }
        }
    })
    .then(() =>{
        getCategoryContent(destinationStoreHash, 'GOBILDA_STAGING')
        .then(res =>{

        })

    })
    
})
