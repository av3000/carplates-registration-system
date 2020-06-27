const express    = require('express');
const app        = express();
const cors       = require('cors');
const bodyParser = require('body-parser');
const PORT       = 8081;

const errorHandler = require("./handlers/error");

const carplatesRoutes = require("./routes/carplates");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/carplates", carplatesRoutes);

app.use(function(req, res, next) {
    let err = new Error("Not Found. . .");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`server running on port ${PORT}`);
});