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
            this.listenTo(Backbone, "window:resize", this.resize);
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
            var height = this._getHeight();
            this.$('.iapp-politician-index-wrap').velocity({"max-height": height.openHeight}, {duration: 400, easing: "swing"});
            this._expanded = true;
        },
        unExpand: function() {
            var height = this._getHeight();
            this.$('.iapp-politician-index-wrap').velocity({"max-height": height.closedHeight}, {duration: 400, easing: "swing"});
            this._expanded = false;
        },
        resize: function() {
            var height = this._getHeight();
            if (this._expanded) {
                height = height.openHeight;
            } else {
                height = height.closedHeight;
            }
            this.$(".iapp-politician-index-wrap").css({"max-height": height});
        },
        _expanded: false,
        _getHeight: function() {
            var closedHeight, openHeight;
            console.log(config.getModuleType());
            if (config.getModuleType() == "module-small-size-small") {
                closedHeight = 100;
                openHeight = 500;
            } else {
                closedHeight = 208;
                openHeight = 380;
            }
            return {
                openHeight: openHeight,
                closedHeight: closedHeight
            };
        }

    });
});
