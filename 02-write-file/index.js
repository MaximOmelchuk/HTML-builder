const fs = require('fs');
const path = require('path');
const { stdin } = process;
const callback = (err) => {
  if (err) throw err;
};
console.log('Hello, RSSchool!\nWrite your text');
fs.writeFile(path.join(__dirname, 'write.txt'), '', callback);
stdin.on('data', (data) => {
  data = data.toString();
  if (data.includes('exit')) {
    console.log('GoodBye!');
    process.exit();
  }  
  fs.appendFile(path.join(__dirname, 'write.txt'), data, callback);
});
process.on('SIGINT', () => {
  console.log('GoodBye!');
  process.exit(); 
});