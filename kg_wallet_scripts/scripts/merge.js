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

const result = getAllFiles("./blockchains")
console.log(result)
