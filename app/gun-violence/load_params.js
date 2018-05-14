var PythonShell = require('python-shell');

//use this function to run a python script from our scripts folder
function runPyScript(fileName, list){

    var options = {
        mode: 'text',
        scriptPath: 'scripts/',
        args: list
    };
 
    PythonShell.run(fileName, options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });
}

runPyScript('simple_hello.py', []);

