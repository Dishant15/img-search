var express = require('express');
var router = express.Router();

var get_data = require("../get_data");
var search = require("../db");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* redirect to image search view with default param if query not given */
router.get('/api/search/', function(req, res) {
   res.redirect("/api/search/lolcats");
});

/* get images in json form from api and show paginated results to the user
    use offset parameter in the url to paginate */
router.get('/api/search/:query', function(req, res) {
    // Get query string from the url
    var query = req.params.query;
    // store query data with time stamp for future use
    var new_search = new search.Search({term:query});

    get_data(encodeURIComponent(query.trim()), function(result,headers){
        var op_len = 5;  // pass 5 data vals and paginate rest
        var temp = result.data;
        // paginate all this data as per offset param
        var offset = parseInt(req.query.offset,10);
        if(!offset)offset=0;
        if(offset+op_len > temp.length){
            res.end(JSON.stringify({
                error:"Invalide data"
            }));
        } else {
            temp = temp.splice(offset,offset+op_len);
            // all good save data to the database
            new_search.save(function(err,data){
                if(err)throw err;
            });
            res.end(JSON.stringify(temp));
        }
    });
});

router.get('/api/latest/search/', function(req, res) {
    // get all saved data from database and show all search conducted by user
    search.Search.find({}, {_id:0, __v:0}).sort('-when').exec(function(err,data){
        if(err)throw err;
        res.end(JSON.stringify(data));
    });
});

module.exports = router;
