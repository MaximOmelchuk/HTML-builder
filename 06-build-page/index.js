const fs = require('fs');
const callback = (err) => {
    if (err) throw err;
}
let copyArr = [];
fs.mkdir('./project-dist', {recursive: true}, callback);
fs.readFile('./template.html', (err, data) => {
    let arr = data.toString().split('\n');
    const insertFunc = (title, x, i) => {
        fs.readFile(`./components/${title}.html`, (err, data) => {
            let prefix = x.replace(/{{.*/, '').slice(0, -1);
            console.log(data.toString().split('\n').map(x => prefix + x))
            data = data.toString().split('\n').map(x => prefix + x).join('');
            copyArr[i] = data;
            if (title === 'footer') {
                fs.appendFile(`./project-dist/index.html`, copyArr.join('\n'), callback);
            };
        });
    };

    arr.forEach((x, i) => {
        if (x.includes('articles')) {
            insertFunc('articles', x, i);
        } else if (x.includes('footer')) {
            insertFunc('footer', x, i);
        } else if (x.includes('header')) {
            insertFunc('header', x, i);
        } else copyArr[i] = x;
    });
})
