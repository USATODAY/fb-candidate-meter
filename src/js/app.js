define(
    [
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'config',
    'dataManager',
    'collections/PoliticianCollection',
    'views/AppView'
    ],
    function(jQuery, _, Backbone, templates, config, DataManager, PoliticianCollection, AppView){
    
    return {
        init: function() {
            var overviewData = new DataManager(config.dataDir + "data.json");
            overviewData.getData(function(data) {
                var politicianCollection = new PoliticianCollection(data.politicians);
                new AppView({collection: politicianCollection});
            });
        }
    };

});
