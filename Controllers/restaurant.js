const Restaurant = require('../Models/restaurant');

exports.getRestaurantByLocation = (req, res) => {
    const locationId = req.params.locationId;
    Restaurant.find({ location_id: Number(locationId) })
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Successfully", restaurants: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.filterRestaurants = (req, res) => {
    const requestBody = req.body;
    const mealtype = requestBody.mealtype;
    const location = requestBody.location;
    const cuisine = requestBody.cuisine;
    const hcost = requestBody.hcost;
    const lcost = requestBody.lcost;
    const sort = requestBody.sort ? requestBody.sort : 1;
    const page = requestBody.page ? requestBody.page : 1;

    let payload = {};

    const countPerPage = 2;

    let startIndex;
    let endIndex;

    startIndex = (page * countPerPage) - countPerPage;
    endIndex = (page * countPerPage) - 1;

    if (mealtype) {
        payload = { mealtype_id: mealtype }
    }
    if (mealtype && location) {
        payload = { mealtype_id: mealtype, location_id: location }
    }
    if (mealtype && cuisine) {
        payload = { mealtype_id: mealtype, cusine: cuisine }
    }
    if (mealtype && location && cusine) {
        payload = { mealtype_id: mealtype, location_id: location, cusine: cuisine }
    }
    if (mealtype && lcost && hcost) {
        payload = {
            mealtype_id: mealtype,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype && location && lcost && hcost) {
        payload = {
            mealtype_id: mealtype,
            location_id: location,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype && cuisine && lcost && hcost) {
        payload = {
            mealtype_id: mealtype,
            cusine: cuisine,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype && location && cusine && lcost && hcost) {
        payload = {
            mealtype_id: mealtype,
            location_id: location,
            cusine: cuisine,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }

    Restaurant.find(payload).sort({ min_price: sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            const pageCount = Math.ceil(response.length / countPerPage);
            res.status(200).json({ message: "Restaurant Filtered Successfully", restaurants: filteredResponse, pageCount: pageCount })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getRestaurantDetailsById = (req, res) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId)
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Successfully", restaurants: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}



