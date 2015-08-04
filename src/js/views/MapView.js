define(
    [
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'textures',
    'mapCache',
    'templates',
    'config',
    'dataManager',
    'helpers'
    ],
    function(jQuery, _, Backbone, d3, textures, mapCache, templates, config, DataManager, helpers){
    
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
                height = 400,
                padding = 50;

            var chartColors = config.chartColors[this.model.get("party")];
            var keySize = 16;

            var lightGreyColor = "#F3F3F3";

            var projection = d3.geo.albersUsa()
                .scale(750)
                .translate([width / 2, (height / 2) - 30]);

            var path = d3.geo.path()
                .projection(projection);

            var t = textures.lines()
                .thicker()
                .size(10)
                .stroke("white")
                .background(chartColors[0]);

            var t2 = textures.lines()
                .thicker()
                .size(10)
                .stroke("white")
                .background(chartColors[1]);



            var svg = this.svg = d3.select($el[0]).append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "iapp-entry-map-svg");
            
            svg.call(t);
            svg.call(t2);

            mapCache.getMapData(this.dataUrl, function(error, data) {
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
                        if (diff > 0 && diff < 1) {
                            fill = chartColors[0];
                        } 
                        else if (diff >= 1){
                            fill = chartColors[1];
                        } else if (diff < 0 && diff > -1) {
                            fill = t.url();
                        } else if (diff <= -1) {
                            console.log(d);
                            fill = t2.url();
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
                            .html("<h3 class='iapp-tooltip-state'>" + d.properties.name + "</h3><div class='iapp-tooltip-interactions'>Users interacting: " + interactionsPretty + "%</div>")
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
                    .attr("fill", t2.url())
                    .attr("width", keySize)
                    .attr("height", keySize);

                keyGroup1.append("text")
                    .attr("transform", "translate(" + (keySize + 5) + ", 0 )")
                    .attr("dy", keySize)
                    .attr("font-family", "Futura Today Light, Arial, sans-serif")
                    .attr("font-size", "12px")
                    .text("1%+ decrease");

                var keyGroup2 = key.append("g")
                    .attr("transform", "translate(100, 0)");
                
                keyGroup2.append("rect")
                    .attr("fill", t.url())
                    .attr("width", keySize)
                    .attr("height", keySize);

                keyGroup2.append("text")
                    .attr("transform", "translate(" + (keySize + 5) + ", 0 )")
                    .attr("dy", keySize)
                    .attr("font-family", "Futura Today Light, Arial, sans-serif")
                    .attr("font-size", "12px")
                    .text("0% - 1% decrease");

                var keyGroup3 = key.append("g")
                    .attr("transform", "translate(215, 0)");
                
                keyGroup3.append("rect")
                    .attr("fill", lightGreyColor)
                    .attr("width", keySize)
                    .attr("height", keySize);

                keyGroup3.append("text")
                    .attr("transform", "translate(" + (keySize + 5) + ", 0 )")
                    .attr("dy", keySize)
                    .attr("font-family", "Futura Today Light, Arial, sans-serif")
                    .attr("font-size", "12px")
                    .text("no change");

                var keyGroup4 = key.append("g")
                    .attr("transform", "translate(300, 0)");
                
                keyGroup4.append("rect")
                    .attr("fill", chartColors[0])
                    .attr("width", keySize)
                    .attr("height", keySize);

                keyGroup4.append("text")
                    .attr("transform", "translate(" + (keySize + 5) + ", 0 )")
                    .attr("dy", keySize)
                    .attr("font-family", "Futura Today Light, Arial, sans-serif")
                    .attr("font-size", "12px")
                    .text("0% - 1% decrease");

                var keyGroup5 = key.append("g")
                    .attr("transform", "translate(415, 0)");
                
                keyGroup5.append("rect")
                    .attr("fill", chartColors[1])
                    .attr("width", keySize)
                    .attr("height", keySize);

                keyGroup5.append("text")
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
