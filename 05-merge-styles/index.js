const fs = require('fs');
const callback = (err) => {
  if (err) throw err;
};
fs.unlink('./project-dist/bundle.css', (err) => {
  if (err && err.code !== 'ENOENT') {
    throw err;
  }
});
fs.readdir('./styles', (err, arr) => {
  arr.forEach(x => {
    if (x.split('.')[1] === 'css') {
      fs.readFile(`./styles/${x}`, (err, data) => {
        fs.appendFile('./project-dist/bundle.css', data, callback);
      });
            
    }
  });
});