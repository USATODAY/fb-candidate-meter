define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'helpers',
    'templates',
], function(jQuery, _, Backbone, config, helpers, templates) {
    return Backbone.View.extend({
        initialize: function() {
        },
        template: templates["politicianIndexItem.html"],
        className: "iapp-politician-index-item",
        render: function() {
            var context = helpers.makeContext(this.model.toJSON());
            this.$el.html(this.template(context));
            return this;
        },
        events: {
            "click": "onClick"
        },
        onClick: function() {
            Backbone.trigger("politician:set", this.model);
            Backbone.trigger("menu:close", this.model);
        }
    });
});
