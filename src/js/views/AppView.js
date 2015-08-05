define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
    'views/PoliticianIndexView',
    'views/EntriesView',
    'views/InfoView'
], function(jQuery, _, Backbone, config, templates, PoliticianIndexView, EntriesView, InfoView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "politician:set", this.setPolitician);
            this.render();
        },
        el: '.iapp-js-app',
        render: function() {
            this.$el.append("<div id='iapp-map-tooltip' class='iapp-hidden iapp-map-tooltip'><div>");
            this.$el.append("<img class='iapp-info-button' src='"+ config.imageDir +"info-icon.png' alt='info'>");
            this.$el.append(this.headerTemplate());
            var infoView = new InfoView();
            this.$el.append(infoView.el);
            var politicianIndexView = new PoliticianIndexView({collection: this.collection});
            this.$el.append(politicianIndexView.render().el);
            var testPolitician = this.collection.findWhere({id: 0});
            this.setPolitician(testPolitician);
        },
        events: {
            "click .iapp-info-button": "onInfoClick"
        },
        headerTemplate: templates["header.html"],
        setPolitician: function(politicianModel) {
            /******
             * @TODO add ability to update entries view without wiping out/re-rendering
             *****/

            if (this.entriesView !== undefined) {
                this.entriesView.remove();
            }
            this.entriesView = new EntriesView({model: politicianModel});
            this.$el.append(this.entriesView.el);
        },
        onInfoClick: function(e) {
            Backbone.trigger("info:show");
        }
    });
});
