var pythonShell = require('python-shell');

pythonShell.run('scripts/simple_hello.py',function(err){
    if(err) throw err;
    console.log('finished');
});