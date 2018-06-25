var util = require('util');

exports.imageForm = function(req, res) {
    res.render('upload', {
        title: 'Upload Images'
    });
};

exports.uploadImage = function(req, res, next){
        console.log('file info: ',req.files.file);

        //split the url into an array and then get the last chunk and render it out in the send req.
        var pathArray = req.files.file.path.split( '/' );

        res.send(util.format(' Task Complete \n uploaded %s (%d Kb) to %s as %s'
            , req.files.file.name
            , req.files.file.size / 1024 | 0
            , req.files.file.path
            , req.body.title
            , req.files.file
            , '<img src="img/' + pathArray[(pathArray.length - 1)] + '">'
        ));


};