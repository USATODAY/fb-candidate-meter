define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'models/EntryModel'
], function(jQuery, _, Backbone, config, EntryModel) {
    return Backbone.Collection.extend({
        model: EntryModel,
        initialize: function() {
            //set the props onto the collection itself
            _.extend(this, arguments[1].props);
        }
    });
});
