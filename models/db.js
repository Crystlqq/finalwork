
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/student_score',{useNewUrlParser:true,useUnifiedTopology:true});

module.exports = mongoose