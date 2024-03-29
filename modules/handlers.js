const fs = require('fs-extra');
const formidable = require('formidable');

exports.upload = (request, response) => {
    console.log('Rozpoczynam obsługę żądania upload.');
    const form = new formidable.IncomingForm();
    form.parse(request, (error, fields, files) => {
        fs.moveSync(files.upload.path, 'test.png');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Received image:<br><br>');
        response.write('<img src="/show">');
        response.end();
});
};

exports.welcome = (request, response) => {
    console.log('Rozpoczynam obsługę żądania welcome.');
    fs.readFile('templates/start.html', (err, html) => {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(html);
        response.end();
    });
    
};

exports.show = (request, response) => {
    fs.readFile('test.png', 'binary', (error, file) => {
        response.writeHead(200, {'Content-Type': 'image/png'});
        response.write(file, 'binary');
        response.end();
    });
};

exports.error = (request, response) => {
    console.log('Oczekuję na polecenie...');
    response.write('404 :(');
    response.end();
};