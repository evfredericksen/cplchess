fs = require('fs');
path = require('path');
jsmediatags = require('jsmediatags');
Track = require(__dirname + '/track.js');

MEDIA_ROOT = __dirname + '/../../../user/media';

function addTrack(path, stats) {
    let track = new Track(path, stats);
    files.push(track);
}

function walk(currentDirPath, callback) {
    fs.readdir(currentDirPath, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        let promisesResolved = 0;
        let p = new Promise((resolve, reject) => {
            let check = function () {
                if (promisesResolved < files.length) {}
            };
        });
        files.forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
                promisesResolved++;
            } else if (stat.isDirectory()) {
                walk(filePath, callback);
            }
        });
    });
}

function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

module.exports.readTracks = function (cb) {
    let files = getFiles(MEDIA_ROOT);
    let tracks = [];
    let readCount = 0;
    files.forEach(function (path) {
        jsmediatags.read(path, {
            onSuccess: function (tag) {
                readCount++;
                let track = new Track(path);
                track.loadTags(tag.tags);
                tracks.push(track);
                if (readCount === files.length) cb(tracks);
            },
            onError: function (error) {
                readCount++;
                console.log(':(', error.type, error.info);
                if (readCount === files.length) cb(tracks);
            }
        });
    });
};