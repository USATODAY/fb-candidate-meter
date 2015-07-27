define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
], function(jQuery, _, Backbone, config, templates) {
    return Backbone.View.extend({
        initialize: function() {
        },
        template: templates["politicianIndexItem.html"],
        className: "iapp-politician-index-item-wrap",
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
