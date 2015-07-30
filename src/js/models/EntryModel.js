define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'dataManager',
], function(jQuery, _, Backbone, config, DataManager, PoliticianModel, EntryCollection) {
    return Backbone.Model.extend({
        defaults: {
            /***
             * lists all expected properties
             ***/
            //object
            bottom_demos: null,
            //string
            date: null,
            //date object we will create at initialize
            dateObj: null,
            //integer
            interactions: null,
            //float
            men_percent: null,
            //float
            men_percent_diff: null,
            //array
            states: null,
            //object
            top_demos: null,
            //integer
            unique_people: null,
            //float
            women_percent: null,
            //float
            women_percent_diff: null,

            //string inherits from collection
            name: null,
            
            //string inherits from collection
            slug: null

        },
        initialize: function(attrs, options) {
            var dateObj = this._getDate(attrs.date);
            this.set({
                'dateObj': dateObj,
                'name': options.props.name,
                'slug': options.props.slug,
                'party': options.props.party
            });
        },
        _getDate: function(dateString) {
            var dateArray = dateString.split("-");
            var year = dateArray[0];
            var month = dateArray[1];
            var date = dateArray[2];
            var dateObj = new Date(year, month, date);
            return dateObj;
        }
    });
});

