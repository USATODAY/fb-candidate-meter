define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates'
], function(jQuery, _, Backbone, config, templates) {
    return Backbone.View.extend({
        initialize: function() {
            console.log(this.collection.toJSON());
        },
        template: templates["politicianIndex.html"],
        render: function() {
        
        }
    });
});
