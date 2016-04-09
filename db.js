var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    var SearchSchema = mongoose.Schema({
        term: String,
        when: { type: Date, default: Date.now }
    },
    { collection: 'searches' }
    );
    
    module.exports.Search = mongoose.model('Search', SearchSchema);
   
});