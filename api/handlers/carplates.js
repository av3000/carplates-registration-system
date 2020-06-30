const db = require("../models");
const { validateRequestName, validateRequestPlate } = require("../helpers/carplates");

exports.storeCarplate = async function(req, res, next) {
    try {
        let error = {};
        let validatedBody = {
            name: "",
            plate: ""
        };
        
        if( !req.body.plate || !req.body.name){
            error.message = "All fields are required.";
            error.status = 400;
            return next(error);
        }
  
        validatedBody = validateRequestPlate(validatedBody, req.body.plate, next);
        validatedBody =  validateRequestName(validatedBody, req.body.name, next);

        let duplicateCarplate = await db.Carplate.findOne({ "plate": validatedBody.plate });

        if(duplicateCarplate){
            error.message = "Plate numbers are taken.";
            error.status = 400;
            return next(error);
        }

        let carplate = await db.Carplate.create(validatedBody);
        let { id, plate, name, createdAt } = carplate;

        return res.status(200).json({
            id, plate, name, createdAt
        });
    } catch (error) {
        if(error.code === 11000) {
            error.message = "Sorry, creation has failed.";
        }

        return next(error);
    }
};

exports.getCarplate = async function(req, res, next) {
    try {
        let carplate = await db.Carplate.find({ "_id": req.params.carplate_id });
        
        return res.status(200).json(carplate);
    } catch(error) {
        return next(error);
    }
};

exports.deleteCarplate = async function(req, res, next) {
    try {
        let foundCarplate = await db.Carplate.findById({ "_id": req.params.carplate_id });
        await foundCarplate.remove();

        return res.status(200).json(foundCarplate);
    } catch (error) {
        return next(error);
    }
};

exports.getAllCarplates = async function(req, res, next) {
    try {
        const items_per_page = req.query.items_per_page    ? parseInt(req.query.items_per_page) : 5;
        const page       = req.query.page     ? parseInt(req.query.page)  : 1;
        const sortby     = req.query.sortby   ? req.query.sortby          : "name";
        const orderby    = req.query.orderby  ? req.query.orderby         : "desc";
        const filter     = req.query.filter   ? req.query.filter          : "";
        const filteroption = req.query.filteroption ? req.query.filteroption : "name";

        const sortQuery = {
            [sortby]: orderby
        };
        const filterQuery = {
            [filteroption]: new RegExp(filter, 'i')
        };

        db.Carplate.countDocuments(filterQuery)
            .then(carplateCount => {
                db.Carplate.find(filterQuery)
                .skip((page - 1)  * items_per_page)
                .limit(items_per_page)
                .sort(sortQuery)
                .then(carplates => {
                    return res.status(200).json({
                        carplates,
                        page: page,
                        total: carplateCount,
                        items_per_page: items_per_page
                    });
                })
            })
            .catch(error => {
                return next(error);
            })
    } catch (error) {
        return next(error);
    }
};

exports.updateCarplate = async function(req, res, next) {
    try {
        let validatedBody = {};
        
        if(req.body.plate) {
            validatedBody = validateRequestPlate(validatedBody, req.body.plate, next);
        }

        if(req.body.name){
            validatedBody = validateRequestName(validatedBody, req.body.name, next);
        }

        let oldCarplate =  await db.Carplate.findById({ "_id": req.params.carplate_id });

        await db.Carplate.findByIdAndUpdate(req.params.carplate_id, {
            plate: validatedBody.plate || oldCarplate.plate,
            name: validatedBody.name || oldCarplate.name
        });

        let updatedCarplate =  await db.Carplate.findById({ "_id": req.params.carplate_id });

        return res.status(200).json( updatedCarplate );
    } catch(error) {
        return next(error);
    }
};