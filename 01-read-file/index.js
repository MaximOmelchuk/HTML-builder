const fs = require('fs');
const text = fs.createReadStream('text.txt');
text.on('data', (chunk) => {
  console.log(chunk.toString());
});