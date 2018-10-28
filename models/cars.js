const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
  make:{type: String, required:true},
  model:{type: String, required:true},
  year:{type: Number, default: 0},
  color:{type: String},
  tags:[{type: String}],
  image:{type: String, default: 'https://driveshare.com/files/cars_images/800/1513303300_phpTs9IkF.jpg'},
  notes:{type: String},
  availability:{type: Boolean, default: false}
});

const Cars = mongoose.model('Car', carSchema);
module.exports = Cars;
