define([
    'jquery', 
    'underscore', 
    'backbone',
    'd3',
    'config', 
    'helpers',
    'templates',
    'views/MapView',
    'velocity',
], function(jQuery, _, Backbone, d3, config, helpers, templates, MapView, Velocity) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            var context = helpers.makeContext(this.model.toJSON());
            this.$el.append(this.template(context));
            this.mapView = new MapView({model: this.model});
            this.$el.prepend(this.mapView.el);
            this.drawDemoOverview();
            this.drawDemoDetails();
            return this;
        },
        template: templates["EntryView.html"],
        _getChartColors: function() {
            var party = this.model.get("party");
            return config.chartColors[party];
        },
        className: "iapp-entry-wrapper",
        _barDimensions: {
            width: 200,
            height: 180,
            barHeight: 20,
            leftPadding: 35,
            rightPadding: 35
        },
        drawDemoOverview: function() {
            var $el = this.$('.iapp-js-entry-demo-overview');
            var dimensions = this._barDimensions;
            var el = d3.select($el[0]);

            var colors = this._getChartColors();

            var svg = el.append('svg')
                .attr("width", dimensions.width)
                .attr("height", dimensions.barHeight);

            var x = d3.scale.linear()
                .domain([0, 100])
                .range([0, dimensions.width - (dimensions.leftPadding + dimensions.rightPadding)]);

            var modelData = this.model.toJSON();
            var data = [
                modelData.women_percent,
                modelData.men_percent
            ];

            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("width", x)
                .attr("height", dimensions.height)
                .attr("transform", function(d, i) {
                    var translateX = dimensions.leftPadding;
                    if (i > 0) {
                        translateX = (dimensions.leftPadding + x(data[i - 1]));
                    }

                    return "translate(" + translateX + ", 0)";
                })
                .attr("fill", function(d, i) {
                    return colors[i];
                });

             var ageLabel = svg.append("text")
                .attr("y", 10)
                .attr("dy", "0.5em")
                .attr("font-family", "Futura Today Light, Arial, sans-serif")
                .attr("fill", "#4A4A4A")
                .attr("font-size", "12px")
                .text("All");

            var percentLabel = svg.append("text")
                .attr("y", dimensions.barHeight /2)
                .attr("x", dimensions.width - 30)
                .attr("dy", "0.5em")
                .attr("font-family", "Futura Today Light, Arial, sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "#4A4A4A")
                .text(function(d) {
                    return "100%";
                });
        },
        drawDemoDetails: function() {
            
            var $el = this.$('.iapp-js-entry-demo-details'),
            dimensions = this._barDimensions,
            el = d3.select($el[0]),
            colors = this._getChartColors();
            
            var x = d3.scale.linear()
                .domain([0, 100])
                .range([0, dimensions.width - (dimensions.leftPadding + dimensions.rightPadding)]);

            var data = this.model.toJSON().demographics;

            var svg = el.append('svg')
                .attr("width", dimensions.width)
                .attr("height", dimensions.height);

            var ageGroup = svg.selectAll(".age-group")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "age-group")
                .attr("transform", function(d, i) {
                    var translateY = (dimensions.barHeight + 10) * i;
                    return "translate(0, " + translateY + ")";
                });

                
            ageGroup.append("rect")
                .attr("width", function(d) {
                    return x(d.w);
                })
                .attr("transform", function(d) {
                    return "translate(" + dimensions.leftPadding +", 0)";
                })
                .attr("height", dimensions.barHeight)
                .attr("fill", colors[0]);
            
            ageGroup.append("rect")
                .attr("width", function(d) {
                    return x(d.m);
                })
                .attr("transform", function(d) {
                    return "translate(" + (dimensions.leftPadding + x(d.w)) +", 0)";
                })
                .attr("height", dimensions.barHeight)
                .attr("fill", colors[1]);
            
            var ageLabel = ageGroup.append("text")
                .attr("y", dimensions.barHeight /2)
                .attr("dy", "0.5em")
                .attr("font-family", "Futura Today Light, Arial, sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "#4A4A4A")
                .text(function(d) {
                    return d.age;
                });

            var percentLabel = ageGroup.append("text")
                .attr("y", dimensions.barHeight /2)
                .attr("x", dimensions.width - 30)
                .attr("dy", "0.5em")
                .attr("font-family", "Futura Today Light, Arial, sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "#4A4A4A")
                .text(function(d) {
                    var percent = d.w + d.m;
                    percent = Math.round( percent * 10) / 10;
                    return percent + "%";
                });
        }
    });
});
