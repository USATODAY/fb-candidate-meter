define([
    'jquery', 
    'underscore', 
    'backbone',
    'imagesloaded',
    'config', 
    'templates',
    'velocity',
    'views/PoliticianItemView'
], function(jQuery, _, Backbone, imagesLoaded, config, templates, Velocity, PoliticianItemView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "menu:close", this.unExpand);
            this.listenTo(Backbone, "window:resize", this.resize);
        },
        template: templates["politicianIndex.html"],
        className: "iapp-politician-index",
        render: function() {
            var _this = this;

            this.$el.html(this.template());
            this.collection.each(this.renderSubView.bind(this));
            this.$isotopeEl = this.$(".iapp-politician-index-wrap");
            this.$isotopeEl.isotope({
                itemSelector: ".iapp-politician-index-item",
                transitionDuration: 500,
                layoutMode: 'fitRows',
                getSortData: {
                    party: '[data-party]',
                    trend: '[data-trend]',
                    interactions: '[data-interactions]',
                    name: '[data-lastname]'
                }
            });
            this.$isotopeEl.imagesLoaded().progress( function() {
              _this.$isotopeEl.isotope('layout');
            });
            this.resize();
            return this;
        },
        renderSubView: function(model) {
            var politicianItemView = new PoliticianItemView({model: model});
            this.$('.iapp-politician-index-wrap').append(politicianItemView.render().el);
            
        },
        events: {
            "click .iapp-politician-index-show-button": "toggleExpand",
            "click .iapp-sort-button-trend": "sortByTrend",
            "click .iapp-sort-button-name": "sortByName",
            "click .iapp-sort-button-party": "sortByParty"
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
            this.$el.addClass('expanded');
            this._expanded = true;
        },
        unExpand: function() {
            var height = this._getHeight();
            this.$('.iapp-politician-index-wrap').velocity({"max-height": height.closedHeight}, {duration: 400, easing: "swing"});
            this.$el.removeClass('expanded');
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
        },
        sortByName: function() {
            this.$(".selected").removeClass("selected");
            this.$(".iapp-sort-button-name").addClass("selected");
            console.log("name");
            this.$isotopeEl.isotope({sortBy: "name", sortAscending: false});
        },
        sortByParty: function() {
            this.$(".selected").removeClass("selected");
            this.$(".iapp-sort-button-party").addClass("selected");
            this.$isotopeEl.isotope({sortBy: "party"});
        },
        sortByTrend: function() {
            this.$(".selected").removeClass("selected");
            this.$(".iapp-sort-button-trend").addClass("selected");
            this.$isotopeEl.isotope({sortBy: "trend", sortAscending: false});
        },
        sortByInteractions: function() {
            this.$(".selected").removeClass("selected");
            this.$(".iapp-sort-button-interactions").addClass("selected");
            this.$isotopeEl.isotope({sortBy: "trend", sortAscending: false});
            this.$isotopeEl.isotope({sortBy: "interactions", sortAscending: false});
        }

    });
});
