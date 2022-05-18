const fs = require('fs');
const path = require('path');
const callback = (err) => {
  if (err) throw err;
};
// REPLACE TAGS
fs.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true}, () => {
  fs.readdir(path.join(__dirname, 'components'), (err, components) => {
    fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
        template = data.toString();
        fs.rm(path.join(__dirname, 'project-dist', 'index.html'), {force: true, recursive: true}, callback);
        componentsNames = components.map(item => item.split('.')[0]);
        componentsNames.forEach((x,i) => {
            fs.readFile(path.join(__dirname, 'components', components[i]), (err, component) => {
                // let re = new RegExp(`{{${x}}}.*`);
                // let prefix = x.replace(re, '').slice(0, -1);
                // data = data.toString().split('\n').map(x => prefix + x).join('');
                template = template.replace(`{{${x}}}`, component);
                if (i === components.length-1) {
                    fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), template, callback);
                }
            });
        })
    })
  })
  // MERGE STYLES
  fs.rm(path.join(__dirname, 'project-dist', 'style.css'), () => {
    fs.readdir(path.join(__dirname, 'styles'), (err, arr) => {
      arr.forEach(x => {
        if (x.split('.')[1] === 'css') {
          fs.readFile(path.join(__dirname, 'styles', x), (err, data) => {
            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, callback);
          });
        }
      });
    });
  });

  // COPY DIRECTORY

  fs.rm(path.join(__dirname, 'project-dist' ,'assets'), {recursive: true, force: true}, () => {
    fs.mkdir(path.join(__dirname, 'project-dist' ,'assets'), {recursive: true}, callback);
    const copyDir = (filePath) => {
      fs.stat(filePath, (err, stats) => {
        let destPath = filePath.replace('assets', 'project-dist\\assets');
        if (!stats.isDirectory()) {
          fs.copyFile(filePath, destPath, callback);
        } else {
          fs.readdir(filePath, (err, arr) => {
            fs.mkdir(destPath, callback);
            arr.forEach(x => {
              copyDir(path.join(filePath, x));
            });
          });
        }
      });
    }; 
    fs.readdir(path.join(__dirname, 'assets'), (err, arr) => {
      arr.forEach(x => {
        copyDir(path.join(__dirname, 'assets', x));
      });
    });
  }); 
});

// let copyArr = [];
//   fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, callback);
//   fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
//     let arr = data.toString().split('\n');
//     fs.rm(path.join(__dirname, 'project-dist', 'index.html'), {force: true, recursive: true}, callback);
//     const insertFunc = (title, x, i) => {
//       fs.readFile(path.join(__dirname, 'components', `${title}.html`), (err, data) => {
//         let prefix = x.replace(/{{.*/, '').slice(0, -1);
//         data = data.toString().split('\n').map(x => prefix + x).join('');
//         copyArr[i] = data;
//         if (title === 'footer') {
//           fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), copyArr.join('\n'), callback);
//         }
//       });
//     };

//     arr.forEach((x, i) => {
//       if (x.includes('articles')) {
//         insertFunc('articles', x, i);
//       } else if (x.includes('footer')) {
//         insertFunc('footer', x, i);
//       } else if (x.includes('header')) {
//         insertFunc('header', x, i);
//       } else copyArr[i] = x;
//     });
//   });  