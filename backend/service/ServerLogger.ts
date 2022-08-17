//this component will be under kaushikee
const fs = require('fs');
const Location = "../logs";
const path = require('path');

const mainFunction = (fileName:any, data:any) => {
    if(!fs.existsSync(path.join(__dirname, `../logs/${fileName}`))){
        console.log(`server didnt contain file ~${fileName}, so server created one.`)
        fs.writeFileSync(path.join(__dirname, `../logs/${fileName}`), JSON.stringify({data:[]}))
    }
    else{
        const currentData = JSON.parse(fs.readFileSync(path.join(__dirname, `../logs/${fileName}`)));
        //process of modifying the log file
        
        return Object(currentData);
    }
    

};

module.exports = mainFunction;
export{}