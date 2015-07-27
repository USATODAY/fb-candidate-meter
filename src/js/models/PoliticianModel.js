define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'dataManager',
    'collections/EntryCollection'
], function(jQuery, _, Backbone, config, DataManager, EntryCollection) {
    return Backbone.Model.extend({
        defaults: {
            /***
             * lists all expected properties
             ***/
            "id": null,
            "trend": null,
            "name": null,
            "slug": null,
            "image": null,

            /***
             * holds collection of entries
             ***/
            "entryCollection": null
        },
        initialize: function(attrs, options) {
            var slug = attrs.slug;
            var image = config.imageDir + slug + ".png";
            this.set({
                "image": image
            });
        },
        getEntries: function() {
            /***
             * fetches data and creates collection of entries
             ***/
            var _this = this;
            var entriesDataFile = this._getDetailDataFile();
            var dataManager = new DataManager(entriesDataFile);
            dataManager.getData(function(data) {
                var props = _.omit(data, 'weekly_entries');
                var entryCollection = new EntryCollection(data.weekly_entries, {props: props});
                _this.entryCollection = entryCollection;
            });
        },
        _getDetailDataFile: function() {
            var id = this.get("id");
            return config.dataDir + id + ".json";
        }
    });
});
