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
            var politicianIndexView = new PoliticianIndexView({collection: this.collection});
        }
    });
});
