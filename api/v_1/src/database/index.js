const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/noderest', {useMongoClient : true });
mongoose.connect('mongodb+srv://yuri:BZK4mBm1gpSJxvUT@cluster0.lplyi.mongodb.net/vxtel', {useMongoClient : true });
mongoose.Promise = global.Promise;

module.exports = mongoose;

