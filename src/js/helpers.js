define([
    "underscore",
    "config",
    "moment"
], function(_, config, moment) {
    return {
        makeContext: function(obj) {
            return _.extend({}, obj, {config: config});
        },
        formatNumber: function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        slugify: function(s) {
            return s.toString().toLowerCase()
                .replace(/\s+/g, '_')           // Replace spaces with -
                .replace(/[^\w\_]+/g, '')       // Remove all non-word chars
                .replace(/\_\_+/g, '_')         // Replace multiple - with single -
                .replace(/^_+/, '')             // Trim - from start of text
                .replace(/_+$/, '');            // Trim - from end of text
        },
        formatDate: function(dateObj) {
            d = moment(dateObj);
            return d.format("MMMM Do, YYYY");
        }
    };
});
