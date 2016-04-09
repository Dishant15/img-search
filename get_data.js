var getDataFromImgur = function(query, callback){
    
    var http = require ('https');
    var options = {
      hostname: 'api.imgur.com',
      path: '/3/gallery/search/time/0?q_all=' + query,
      method: 'GET',
      headers: {
      "Authorization":"Client-ID adb33377c29592b",
      }
    };
    
    var req = http.request(options, (res) => {
    
    var header = res.headers;
    var result = "";
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        // console.log(`BODY: ${chunk}`);
        result = result + chunk;
      });
      res.on('end', function(){
          callback(JSON.parse(result),header);
      });
    });
    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    
    req.end();
};

module.exports = getDataFromImgur;