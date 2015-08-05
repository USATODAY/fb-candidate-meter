define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'models/EntryModel'
], function(jQuery, _, Backbone, config, EntryModel) {
    return Backbone.Collection.extend({
        model: EntryModel,
        initialize: function(attrs, opts) {
            //set the props onto the collection itself
            _.extend(this, opts.props);
        },
        comparator: function(entryA, entryB) {
            var dateA = entryA.get("dateObj");
            var dateB = entryB.get("dateObj");
            if (dateA > dateB) {
                return -1;
            } else {
                return 1;
            }
        }
    });
});
