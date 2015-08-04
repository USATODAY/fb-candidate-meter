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
        className: function() {
            //set element class, include party
            return "iapp-politician-index-item " + this.model.get("party");
        },
        attributes: function() {
            // set element attributes, include info for isotope sorting
            return {
                "data-trend": this.model.get("latest_interactions_trend"),
                "data-interactions": this.model.get("latest_interactions"),
                "data-lastname": this.model.get("name").split(" ")[1].toLowerCase(),
                "data-party": this.model.get("party")
            };
        },
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
