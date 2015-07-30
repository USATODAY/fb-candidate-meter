define([
    "underscore",
    "config"
], function(_, config) {
    return {
        makeContext: function(obj) {
            return _.extend({}, obj, {config: config});
        },
        formatNumber: function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    };
});
