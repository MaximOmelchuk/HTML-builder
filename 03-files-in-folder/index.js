const fs = require('fs');
fs.readdir('./secret-folder', {withFileTypes: true}, (err, arr) => {
  arr.forEach(x => {
    if (!x.isDirectory()) {
      fs.stat(`./secret-folder/${x.name}`, (err, stat) => {
        const output = x.name.split('.');
        output.push((stat.size / 1000) + 'kb');
        console.log(`${output.join(' - ')}`);
      });
    }
  });
});