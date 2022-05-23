const fs = require('fs');
const path = require('path');
const callback = (err) => {
  if (err) throw err;
};
// REPLACE TAGS
fs.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true}, () => {
  fs.readdir(path.join(__dirname, 'components'), (err, components) => {
    if (err) throw err;
    fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
      if (err) throw err;
      let template = data.toString();
      fs.rm(path.join(__dirname, 'project-dist', 'index.html'), {force: true, recursive: true}, callback);
      let componentsNames = components.map(item => item.split('.')[0]);
      let count = 0;
      componentsNames.forEach((x,i) => {
        fs.readFile(path.join(__dirname, 'components', components[i]), (err, component) => {
          if (err) throw err;
          count++;
          let re = new RegExp(`\\n.*(?=\\{\\{${x}\\}\\})`);
          let prefix = template.match(re) ? template.match(re)[0] : '';
          prefix = prefix.slice(1);
          component = component.toString().split('\n').map((x, i) => i === 0 ? x : prefix + x).join('');
          template = template.replace(`{{${x}}}`, component);
          if (count === components.length) {
            fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), template, callback);
          }
        });
      });
    });
  });
  // MERGE STYLES
  fs.rm(path.join(__dirname, 'project-dist', 'style.css'), () => {
    fs.readdir(path.join(__dirname, 'styles'), (err, arr) => {
      if (err) throw err;
      arr.forEach(x => {
        if (x.split('.')[1] === 'css') {
          fs.readFile(path.join(__dirname, 'styles', x), (err, data) => {
            if (err) throw err;
            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, callback);
          });
        }
      });
    });
  });

  // COPY DIRECTORY

  fs.rm(path.join(__dirname, 'project-dist' ,'assets'), {recursive: true, force: true}, () => {
    fs.mkdir(path.join(__dirname, 'project-dist' ,'assets'), {recursive: true}, (err) => {
      if (err) throw err;
      const copyDir = (filePath) => {
        fs.stat(filePath, (err, stats) => {
          if (err) throw err;
          let destPath = filePath.replace('assets', 'project-dist\\assets');
          if (!stats.isDirectory()) {
            fs.copyFile(filePath, destPath, callback);
          } else {
            fs.readdir(filePath, (err, arr) => {
              if (err) throw err;
              fs.mkdir(destPath, (err) => {
                if (err) throw err;
                arr.forEach(x => {
                  copyDir(path.join(filePath, x));
                });
              });
            });
          }
        });
      }; 
      fs.readdir(path.join(__dirname, 'assets'), (err, arr) => {
        if (err) throw err;
        arr.forEach(x => {
          copyDir(path.join(__dirname, 'assets', x));
        });
      });
    }); 
  });
});
