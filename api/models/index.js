const mongoose = require('mongoose');
const url      = "mongodb://localhost/carplates-system";
mongoose.set("debug", true,);
mongoose.Promise = Promise;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    keepAlive: true
  };
   
mongoose.connect(process.env.MONGODB_URI || url, options)
.catch(error => console.error(error));

module.exports.Carplate = require('./carplate');