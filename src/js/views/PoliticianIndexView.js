define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
    'velocity',
    'views/PoliticianItemView'
], function(jQuery, _, Backbone, config, templates, Velocity, PoliticianItemView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "menu:close", this.unExpand);
        },
        template: templates["politicianIndex.html"],
        className: "iapp-politician-index",
        render: function() {
            this.$el.html(this.template());
            this.collection.each(this.renderSubView.bind(this));
            return this;
        },
        renderSubView: function(model) {
            var politicianItemView = new PoliticianItemView({model: model});
            this.$('.iapp-politician-index-wrap').append(politicianItemView.render().el);
            
        },
        events: {
            "click .iapp-politician-index-show-button": "toggleExpand"
        },
        toggleExpand: function() {
            if (this._expanded) {
                this.unExpand();
            } else {
                this.expand();
            }
        },
        expand: function() {
            //animate to show all
            var newHeight = 500;
            this.$('.iapp-politician-index-wrap').velocity({"max-height": newHeight}, {duration: 800, easing: "swing"});
            this._expanded = true;
        },
        unExpand: function() {
            this.$('.iapp-politician-index-wrap').velocity({"max-height": 150}, {duration: 800, easing: "swing"});
            this._expanded = false;
        },
        _expanded: false

    });
});
