const fs = require('fs');
const path = require('path');
const callback = (err) => {
  if (err) throw err;
};
fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), () => {
  fs.readdir(path.join(__dirname, 'styles'), (err, arr) => {
    arr.forEach(x => {
      if (x.split('.')[1] === 'css') {
        fs.readFile(path.join(__dirname, 'styles', x), (err, data) => {
          fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, callback);
        });
      }
    });
  });
});
