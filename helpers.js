var asyncLoop = function (iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
};

var json2csv = function (json) {
    var header = Object.keys(json[0]);
    var csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName] || '')));
    csv.unshift(header);
    csv = csv.join('\r\n');
    return csv;
};


module.exports = {asyncLoop, json2csv};
