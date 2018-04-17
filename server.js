var connect = require('connect');
var serveStatic = require('serve-static');

//local host run index.html
connect().use(serveStatic(__dirname + '/app/')).listen(3000, function(){
    console.log('Server running on 3000...');
});