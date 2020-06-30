const Carplate   = require('../carplate');
const mongoose   = require('mongoose');
const url        = "mongodb://localhost/carplates-system";
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

let carplates = [
	new Carplate({
		name: "Steve",
		plate: "AAA159"
	}),
	new Carplate({
		name: "John",
		plate: "BBB357"
	}),
	new Carplate({
		name: "Tonny",
		plate: "ABC147"
	}),
	new Carplate({
		name: "Alan",
		plate: "AVV300"
	}),
	new Carplate({
		name: "Susan",
		plate: "FMG456"
	}),
	new Carplate({
		name: "Emilly",
		plate: "UYB379"
	}),
	new Carplate({
		name: "Cristen",
		plate: "ZXC668"
	})
];

let done = 0;

for(let i=0; i<carplates.length; i++)
{
	carplates[i].save(function(err, result) {
		done++;
		if(done === carplates.length)
		{
			stop();
		}
	});
}

function stop()
{
	mongoose.disconnect();
}