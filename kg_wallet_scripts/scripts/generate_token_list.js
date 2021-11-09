const fs = require("fs")
const path = require("path")

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      if (file === 'info.json') {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      }
    }
  })

  return arrayOfFiles
}

const result = getAllFiles("./../../blockchains")
console.log(result)

let token_list = {}
result.forEach(function(f) {

  let tokenOutput = {}
  let tokenInfo = JSON.parse(fs.readFileSync(f));

  let pathName = f.toString();
  let regexp = /blockchains[\/](.*)[\/]assets[\/](.*)[\/]info.json/g;
  let matches = pathName.matchAll(regexp);

  for (const match of matches) {
    let protocol = match[1];
    let contract = match[2];

    if (token_list.hasOwnProperty(tokenInfo.symbol)) {
      if (token_list[tokenInfo.symbol].name === tokenInfo.name) {
        token_list[tokenInfo.symbol].supported_protocols.push(protocol)
      } else {
        token_list[tokenInfo.symbol+tokenInfo.symbol] = {}
        token_list[tokenInfo.symbol+tokenInfo.symbol].name = tokenInfo.name
        token_list[tokenInfo.symbol+tokenInfo.symbol].symbol = tokenInfo.symbol
        token_list[tokenInfo.symbol+tokenInfo.symbol].logo_url = `https://assets.trustwalletapp.com/blockchains/${match[1]}/assets/${match[2]}/logo.png`
        token_list[tokenInfo.symbol+tokenInfo.symbol].supported_protocols = []
        token_list[tokenInfo.symbol+tokenInfo.symbol].supported_protocols.push(protocol)
        token_list[tokenInfo.symbol+tokenInfo.symbol].contract = contract
      }
    } else {
      token_list[tokenInfo.symbol] = {}
      token_list[tokenInfo.symbol].name = tokenInfo.name
      token_list[tokenInfo.symbol].symbol = tokenInfo.symbol
      token_list[tokenInfo.symbol].logo_url = `https://assets.trustwalletapp.com/blockchains/${match[1]}/assets/${match[2]}/logo.png`
      token_list[tokenInfo.symbol].supported_protocols = []
      token_list[tokenInfo.symbol].supported_protocols.push(protocol)
      token_list[tokenInfo.symbol].contract = contract
    }
  }
})
let data = JSON.stringify(token_list);
fs.writeFileSync('./generated.json', data);

// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);
// console.log(student);
// 
// 
// 
// let student = { 
  // name: 'Mike',
  // age: 23, 
  // gender: 'Male',
  // department: 'English',
  // car: 'Honda' 
// };
// 