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
            jQuery(window).on("resize", function() {
                Backbone.trigger("window:resize");
            });
            overviewData.getData(function(data) {
                var sortedPoliticians = _.sortBy(data.politicians, function(politician) {
                    return politician.name.split(" ")[1];
                });
                var politicianCollection = new PoliticianCollection(sortedPoliticians);
                new AppView({collection: politicianCollection});
                console.log(config.getModuleType());
            });
        }
    };

});
