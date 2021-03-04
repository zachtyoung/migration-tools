require('dotenv').config()
const csv=require('csvtojson');
const csvFilePath='./products.csv'
const axios = require("axios");


const store = 'SC_S'
const storeHash = 'yy9d3il1gg'


const client = store + '_CLIENT'
const token = store + '_TOKEN'
csv().fromFile(csvFilePath)
.then(jsonObj=>{
    jsonObj.forEach(async el =>{

        axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?sku=${el.sku}&include=custom_fields`, {
            headers:{
                "X-Auth-Client": process.env[client],
                "X-Auth-Token": process.env[token],
            }})
        .then(res =>{
            hasBuildSystem = false
            if(res.data.data.length > 0){
            for(var i in res.data.data[0].custom_fields){
                if(res.data.data[0].custom_fields[i].name == 'build_system'){
                    hasBuildSystem = true
                        axios.put(
                            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${res.data.data[0].id}/custom-fields/${res.data.data[0].custom_fields[i].id}`,{
                                "value":el.build_system
                            },
                            {
                            headers: {
                                "X-Auth-Client": process.env[client],
                                "X-Auth-Token": process.env[token],
                            },
                            }
                        )
                }
            }
            if(!hasBuildSystem){
                axios.post(
                    `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${res.data.data[0].id}/custom-fields`,{
                    "name":'build_system',    
                    "value":el.build_system
                    },
                    {
                    headers: {
                        "X-Auth-Client": process.env[client],
                        "X-Auth-Token": process.env[token],
                    },
                    }
                )
            }
        }
        })
  



    })

})