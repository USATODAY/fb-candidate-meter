define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'helpers',
    'templates',
], function(jQuery, _, Backbone, config, helpers, templates) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "info:show", this.show);
            this.render();
        },
        template: templates["infoView.html"],
        className: "iapp-info-panel iapp-hide",
        render: function() {
            var copy = {};
            var context = helpers.makeContext(copy);
            this.$el.html(this.template(context));
            return this;
        },
        events: {
            "click .iapp-info-close": "hide"
        },
        onClick: function() {

        },
        show: function() {
            this.$el.removeClass("iapp-hide");
        },
        hide: function() {
            this.$el.addClass("iapp-hide");
        }
    });
});
