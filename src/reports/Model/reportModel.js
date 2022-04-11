const mongoose = require('mongoose');
const reportSchema = require('../Schema/reportSchema');




const Report = mongoose.model('report' , reportSchema);

module.exports = Report;