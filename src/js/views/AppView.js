define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
    'views/PoliticianIndexView',
    'views/EntriesView',
], function(jQuery, _, Backbone, config, templates, PoliticianIndexView, EntriesView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "politician:set", this.setPolitician);
            this.render();
        },
        el: '.iapp-js-app',
        render: function() {
            var politicianIndexView = new PoliticianIndexView({collection: this.collection});
            this.$el.append(politicianIndexView.render().el);
            var testPolitician = this.collection.models[4];
            this.setPolitician(testPolitician);
        },
        setPolitician: function(politicianModel) {
            /******
             * @TODO add ability to update entries view without wiping out/re-rendering
             *****/

            if (this.entriesView !== undefined) {
                this.entriesView.remove();
            }
            this.entriesView = new EntriesView({model: politicianModel});
            this.$el.append(this.entriesView.el);
        }
    });
});
