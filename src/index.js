var express = require('express')
var _a = require('express'),
    Request = _a.Request,
    Response = _a.Response
var app = express()
var port = 3000
app.get('/', function (_req, res) {
    res.send('Hello World!')
})
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log('Server is listening on port '.concat(port))
})
