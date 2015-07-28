define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
    'velocity',
], function(jQuery, _, Backbone, config, templates, Velocity) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change:entryCollection", this.render);
            this.model.getEntries();
            this.render();
        },
        render: function() {
            var entryCollection = this.model.get("entryCollection");
            var _this = this;
            if (entryCollection === null) {
                _this.$el.html("loading...");
            } else {
                //render entries
                _this.$el.empty();
                var latestEntry = entryCollection.models[entryCollection.length - 1];


            }
            return this;
        }
    });
});
