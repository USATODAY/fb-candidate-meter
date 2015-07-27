define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
    'views/PoliticianIndexView'
], function(jQuery, _, Backbone, config, templates, PoliticianIndexView) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        el: '.iapp-js-app',
        render: function() {
            // var politicianIndexView = new PoliticianIndexView({collection: this.collection});
            // this.$el.append(politicianIndexView.render().el);
            console.log(this.collection);
            // var entriesView = new EntriesView({});
        }
    });
});
