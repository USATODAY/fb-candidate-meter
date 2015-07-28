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
                var sortedPoliticians = _.sortBy(data.politicians, function(politician) {
                    return - politician.latest_interactions_trend;
                });
                var politicianCollection = new PoliticianCollection(sortedPoliticians);
                new AppView({collection: politicianCollection});
            });
        }
    };

});
