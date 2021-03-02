require('dotenv').config()
const csv=require('csvtojson');
const csvFilePath='./categories.csv'
const axios = require("axios");


let sourceStoreHash = 'bnr41x692p'
let sourceStore = 'GOBILDA_STAGING'
let destinationStoreHash='yy9d3il1gg'
let destinationStore='SERVOCITY_STAGING'
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
const updateCustomTemplateAssociations = async(storeHash, storeName, categoriesArray)=>{

  for(var i in categoriesArray){
    axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/storefront/custom-template-associations`,[{
      "channel_id": 1,
      "entity_type": "category",
      "entity_id": categoriesArray[i].destination_id,
      "file_name": categoriesArray[i].template
  }], {
      headers:{
        'X-Auth-Client':process.env[storeName + '_CLIENT'],
        'X-Auth-Token':process.env[storeName + '_TOKEN']
      }})
      .then(res => console.log(res))
  }
}
const updateCategories = async (storeHash, storeName, categoriesArray) =>{
  for(var i in categoriesArray){
    axios.put(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${categoriesArray[i].destination_id}`,{
      "description":categoriesArray[i].description
    }, {
      headers:{
        'X-Auth-Client':process.env[storeName + '_CLIENT'],
        'X-Auth-Token':process.env[storeName + '_TOKEN']
      }})
      // .then(res => console.log(res))
  }
}


getCategoryContent(sourceStoreHash, sourceStore)
.then(res => {
    csv().fromFile(csvFilePath)
    .then((jsonObj)=>{
        for (var i in jsonObj) {
            for(var j in res){
                if(res[j].name == jsonObj[i].Name){
                   categoryNameAndId.push({"name":res[j].name, "source_id":res[j].id, "description":res[j].description, "template":""})
                }
            }
        }
    })

    
    .then(async () =>{
      let sourceStoreTemplates =  await getCustomTemplateAssociations(sourceStoreHash, sourceStore)
      for (var i in categoryNameAndId) {
        for (var j in sourceStoreTemplates) {
          if(categoryNameAndId[i].source_id == sourceStoreTemplates[j].entity_id){
            categoryNameAndId[i].template = sourceStoreTemplates[j].file_name
          }
    
        }
      }

    })
    .then(() =>{
      getCategoryContent(destinationStoreHash, destinationStore)
      .then(res =>{
        for (var i in categoryNameAndId) {
          for(var j in res){
              if(res[j].name == categoryNameAndId[i].name){
                 categoryNameAndId[i].destination_id = res[j].id
              }
          }
      }
      })
      .then(() =>{
        updateCategories(destinationStoreHash, destinationStore, categoryNameAndId)
        updateCustomTemplateAssociations(destinationStoreHash, destinationStore, categoryNameAndId)
      })
     
    })
    
})
