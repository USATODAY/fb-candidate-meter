define([
    'd3'
], function(d3) {
    return {
        mapData: null,
        getMapData: function(url, cb) {
            var _this = this;
            if (this.mapData === null) {
                d3.json(url, function(error, data) {
                    _this.mapData = data;
                    cb(false, data);
                });
            } else {
                cb(false, this.mapData);
            }
        }
    };
});
