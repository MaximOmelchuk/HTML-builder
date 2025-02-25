const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, arr) => {
  if (err) throw err;
  arr.forEach(x => {
    if (!x.isDirectory()) {
      fs.stat(path.join(__dirname, 'secret-folder', x.name), (err, stat) => {
        if (err) throw err;
        const output = x.name.split('.');
        output.push((stat.size / 1000) + 'kb');
        console.log(`${output.join(' - ')}`);
      });
    }
  });
});