var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:input", function (req, res) {
  const input = req.params.input;
  if (input.indexOf("-") != -1) {
    const date = new Date(req.params.input);
    req.unix = Math.floor(date.getTime() / 1000);
    res.json({ "unix": req.unix, "utc": date.toString() })
  }else if(/\d/.test(`${input}`)){
    const date = new Date(input*1000)
    res.json({ "unix": input, "utc": date.toString() })
    console.log("working")
  }else{
    res.json({ error : "Invalid Date" })
  }
  // console.log(input.indexOf("-") + "....")
});


var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
