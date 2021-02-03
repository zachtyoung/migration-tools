// const csv = require('csv-parser');
const fs = require('fs');

// fs.createReadStream('./products-test.csv')
//   .pipe(csv({ separator: ',' }))
//   .on('data', (row) => {
//       let temp = "Test import folder/" + row["Category Path"]
//     console.log(temp);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });\

const csvFilePath='./products-test.csv'
const csv=require('csvtojson')
const { Parser } = require('json2csv');
const json2csvParser = new Parser();
var writeStream = fs.createWriteStream("output.csv");
const bnf = async ()=>{



csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
 
// Async / await usage
let data = await csv().fromFile(csvFilePath)
 data.forEach(el => {
    el["Category Path"] = "import/" + el["Category Path"]
})
const jtc = json2csvParser.parse(data);
// console.log(jtc)
writeStream.write(jtc);
}

bnf()