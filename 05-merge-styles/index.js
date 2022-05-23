const fs = require('fs');
const path = require('path');
const callback = (err) => {
  if (err) throw err;
};
fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), () => {
  fs.readdir(path.join(__dirname, 'styles'), (err, arr) => {
    if (err) throw err;
    arr.forEach(x => {
      if (x.split('.')[1] === 'css') {
        fs.readFile(path.join(__dirname, 'styles', x), (err, data) => {
          if (err) throw err;
          fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, callback);
        });
      }
    });
  });
});
