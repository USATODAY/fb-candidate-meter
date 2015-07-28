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
            this.render();
        },
        el: '.iapp-js-app',
        render: function() {
            // var politicianIndexView = new PoliticianIndexView({collection: this.collection});
            // this.$el.append(politicianIndexView.render().el);
            var testPolitician = this.collection.models[0];
            var testEntriesView = new EntriesView({model: testPolitician});
            this.$el.append(testEntriesView.el);
        }
    });
});
