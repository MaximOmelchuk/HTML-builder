const fs = require('fs');
const path = require('path');
const callback = (err) => {
  if (err) throw err;
};

const copyDir = () => {
  fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true}, (err) => {
    if (err) throw err;
    fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, callback);
    fs.readdir(path.join(__dirname, 'files'), (err, arr) => {
      if (err) throw err;
      arr.forEach(x => {
        fs.copyFile(path.join(__dirname, 'files', x), path.join(__dirname, 'files-copy', x), callback);
      });
    });
  });
  
};
copyDir(); 