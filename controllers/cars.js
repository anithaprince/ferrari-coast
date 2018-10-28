// =======================================
//              DEPENDENCIES
// =======================================

const express = require('express');
const router = express.Router();

// =======================================
//              DATABASE
// =======================================
const Cars = require('../models/cars.js');
const User = require('../models/users.js');
const carSeeds = require ('../models/seed.js');
// =======================================
//              ROUTES
// =======================================

/************* Index Route***********************/
router.get('/', (req, res)=>{
    Cars.find({}, (err, foundCars)=>{
        res.json(foundCars);
    });
});
//curl http://localhost:3000/cars

/************* Create Route***********************/
router.post('/', (req, res)=>{
  Cars.create(req.body, (err, createdCar)=>{
    res.json(createdCar);
  })
})
// curl -X POST -H "Content-Type: application/json" -d '{"make":"harry potter","model":"test", "image":"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg","year" : 5000, "availability":true}' http://localhost:3000/cars

router.post('/seed', (req, res)=>{
  Cars.create(carSeeds, (err, data)=>{
    if (err) console.log(err.message)
     console.log('added cars');
  })
})

/************* Seed Route ********************/
router.post('/seed', (req, res)=>{
  Cars.create(carSeeds, (err, createdCar)=>{
    res.json(createdCar);
    res.redirect('/');
  })
})

/************* Delete Route ********************/
router.delete('/:id', (req, res)=>{
    Cars.findByIdAndRemove(req.params.id, (err, deletedCar)=>{
        res.json(deletedCar);
    });
});

// curl -X DELETE http://localhost:3000/cars/5bd4df0ea449412f58113b61
/************* Edit Route ********************/

router.put('/:id', (req, res)=>{
    Cars.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedCar)=>{
        res.json(updatedCar);
    });
});
// curl -X PUT -H "Content-Type: application/json" -d '{"make":"honda"}' http://localhost:3000/cars/5bd4deada449412f58113b5c

module.exports = router;
