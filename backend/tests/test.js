const test = require("/Users/surge/Desktop/code/dicot/v2/backend/src/v1/middlewares/apiTokenVerifier.ts");
const express = require("express"), app = express();
app.post("/", test, (req, res, next) => {console.log(req); res.send(res)})
app.listen(6969);