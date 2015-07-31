define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
    'velocity',
    'views/EntryView'
], function(jQuery, _, Backbone, config, templates, Velocity, EntryView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change:entryCollection", this.render);
            this.model.getEntries();
            this.render();
        },
        className: "iapp-entries-wrap",
        render: function() {
            this.entryCollection = this.model.get("entryCollection");
            var _this = this;
            if (this.entryCollection === null) {
                this.$el.html("loading...");
            } else {
                //render entries
                this.$el.empty();
                this.currentEntry = this.entryCollection.models[this.currentEntryIndex];
                var entryView = new EntryView({model: this.currentEntry});
                this.$el.append(entryView.el);
            }
            return this;
        },
        entryCollection: null,
        currentEntry: null,
        currentEntryIndex: 0
    });
});
