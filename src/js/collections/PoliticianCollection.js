define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'models/PoliticianModel'
], function(jQuery, _, Backbone, config, PoliticianModel) {
    return Backbone.Collection.extend({
        model: PoliticianModel
    });
});
