define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
    'views/PoliticianItemView'
], function(jQuery, _, Backbone, config, templates, PoliticianItemView) {
    return Backbone.View.extend({
        initialize: function() {
        },
        template: templates["politicianIndex.html"],
        className: "iapp-politician-index",
        render: function() {
            this.$el.html(this.template());
            this.collection.each(this.renderSubView.bind(this));
            return this;
        },
        renderSubView: function(model) {
            var politicianItemView = new PoliticianItemView({model: model});
            this.$('.iapp-politician-index-wrap').append(politicianItemView.render().el);
            
        }

    });
});
