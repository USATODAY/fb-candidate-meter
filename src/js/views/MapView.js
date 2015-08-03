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
            var _this = this;
            var statesData = this.model.get("states");
            var $el = this.$el;

            var width = 580,
                height = 480,
                padding = 50;

            var chartColors = config.chartColors[this.model.get("party")];
            var keySize = 16;

            var lightGreyColor = "#F3F3F3";

            var projection = d3.geo.albersUsa()
                .scale(800)
                .translate([width / 2, height / 2]);

            var path = d3.geo.path()
                .projection(projection);



            var svg = this.svg = d3.select($el[0]).append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "iapp-entry-map-svg");

            d3.json(this.dataUrl, function(error, data) {
                var states = svg.append("g")
                    .attr("class", "states");

                
                states.selectAll("path")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("fill", function(d, i) {
                        var fill = lightGreyColor;
                        var stateName = helpers.slugify(d.properties.name);
                        var stateData = _.findWhere(statesData, {"state": stateName});
                        var diff = _this._roundNumber(stateData.diff);
                        if (diff > 0) {
                            fill = chartColors[0];
                        } 
                        if (diff > 1){
                            fill = chartColors[1];
                        }

                        return fill;
                    })
                    .attr("stroke-width", function(d) {
                        if (d.id == "15" || d.id == "02") {
                            return "0px";
                        } else {
                            return "2px";
                        }
                    })
                    .attr("stroke", "white")
                    .on("mouseover", function(d) {
                        var stateName = helpers.slugify(d.properties.name);
                        var stateData = _.findWhere(statesData, {"state": stateName});
                        var interactionsPretty = _this._roundNumber(stateData.diff);
                        if (interactionsPretty >= 0) {
                            interactionsPretty = "+" + interactionsPretty;
                        } 
                        d3.select("#iapp-map-tooltip")
                            .style("left", (d3.event.pageX - 100) + "px")
                            .style("top", (d3.event.pageY - 60) + "px")
                            .html("<h3 class='iapp-tooltip-state'>" + d.properties.name + "</h3><div class='iapp-tooltip-interactions'>Total Interactions: " + interactionsPretty + "%</div>")
                            .classed("iapp-hidden", false);
                    })
                    .on("mouseout", function(d) {
                        d3.select('#iapp-map-tooltip')
                            .classed("iapp-hidden", true);
                    });

                var key = svg.append("g")
                    .attr("class", "map-key")
                    .attr("transform", "translate(" + 1 + ", " + (height - 20) + ")");

                var keyGroup1 = key.append("g")
                    .attr("transform", "translate(0, 0)");
                
                keyGroup1.append("rect")
                    .attr("fill", lightGreyColor)
                    .attr("width", keySize)
                    .attr("height", keySize);

                keyGroup1.append("text")
                    .attr("transform", "translate(" + (keySize + 5) + ", 0 )")
                    .attr("dy", keySize)
                    .attr("font-family", "Futura Today Light, Arial, sans-serif")
                    .attr("font-size", "12px")
                    .text("no increase");

                var keyGroup2 = key.append("g")
                    .attr("transform", "translate(170, 0)");
                
                keyGroup2.append("rect")
                    .attr("fill", chartColors[0])
                    .attr("width", keySize)
                    .attr("height", keySize);

                keyGroup2.append("text")
                    .attr("transform", "translate(" + (keySize + 5) + ", 0 )")
                    .attr("dy", keySize)
                    .attr("font-family", "Futura Today Light, Arial, sans-serif")
                    .attr("font-size", "12px")
                    .text("0% - 1% increase");

                var keyGroup3 = key.append("g")
                    .attr("transform", "translate(340, 0)");
                
                keyGroup3.append("rect")
                    .attr("fill", chartColors[1])
                    .attr("width", keySize)
                    .attr("height", keySize);

                keyGroup3.append("text")
                    .attr("transform", "translate(" + (keySize + 5) + ", 0 )")
                    .attr("dy", keySize)
                    .attr("font-family", "Futura Today Light, Arial, sans-serif")
                    .attr("font-size", "12px")
                    .text("1%+ increase");
            });


        },
        _roundNumber: function(num) {
            return Math.round(num * 10) / 10;
        }
    });

});
