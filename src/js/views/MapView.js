define(
    [
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'templates',
    'config',
    'dataManager',
    'helpers'
    ],
    function(jQuery, _, Backbone, d3, templates, config, DataManager, helpers){
    
    return Backbone.View.extend({
        initialize: function() {
            this.dataManager = new DataManager(config.dataDir + "states.json");
            this.dataUrl = this.dataManager.getDataURL();
            this.render();
        },
        className: "iapp-entry-map",
        dataUrl: null,
        render: function() {
            this.drawMap();
        },
        drawMap: function() {
            var statesData = this.model.get("states");
            console.log(this.el);
            var $el = this.$el;

            var width = 580,
                height = 480;

            var chartColors = config.chartColors[this.model.get("party")];

            var projection = d3.geo.albersUsa()
                .scale(800)
                .translate([width / 2, height / 2]);

            var path = d3.geo.path()
                .projection(projection);

            var svg = this.svg = d3.select($el[0]).append("svg")
                .attr("width", width)
                .attr("height", height);

            d3.json(this.dataUrl, function(error, data) {
                var states = svg.append("g")
                    .attr("class", "states");

                
                states.selectAll("path")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("fill", function(d, i) {
                        var fill = "#F3F3F3";
                        var stateName = helpers.slugify(d.properties.name);
                        var stateData = _.findWhere(statesData, {"state": stateName});
                        // console.log(stateData);
                        return fill;
                    })
                    .attr("stroke-width", "2px")
                    .attr("stroke", "white");
            });
        }
    });

});
