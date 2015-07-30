define([
    'jquery', 
    'underscore', 
    'backbone',
    'd3',
    'config', 
    'helpers',
    'templates',
    'velocity',
], function(jQuery, _, Backbone, d3, config, helpers, templates, Velocity) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            var context = helpers.makeContext(this.model.toJSON());
            this.$el.append(this.template(context));
            this.drawDemoOverview();
            this.drawDemoDetails();
            return this;
        },
        template: templates["EntryView.html"],
        _getChartColors: function() {
            var party = this.model.get("party");
            return config.chartColors[party];
        },
        drawDemoOverview: function() {
            var $el = this.$('.iapp-js-entry-demo-overview');

            var width = 250;
            var height = 20;
            var el = d3.select($el[0]),
            leftPadding = 50;

            var colors = this._getChartColors();

            var svg = el.append('svg')
                .attr("width", width)
                .attr("height", height);

            var x = d3.scale.linear()
                .domain([0, 100])
                .range([0, width]);

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
                .attr("height", height)
                .attr("transform", function(d, i) {
                    var translateX = leftPadding;
                    if (i > 0) {
                        translateX = (leftPadding + x(data[i - 1]));
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
                .text("All");
        },
        drawDemoDetails: function() {
            
            var $el = this.$('.iapp-js-entry-demo-details'),
            width = 250,
            height = 250,
            barHeight = 20,
            leftPadding = 50,
            el = d3.select($el[0]),
            colors = this._getChartColors();
            
            var x = d3.scale.linear()
                .domain([0, 100])
                .range([0, width]);

            var data = this.model.toJSON().demographics;

            var svg = el.append('svg')
                .attr("width", width)
                .attr("height", height);

            var ageGroup = svg.selectAll(".age-group")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "age-group")
                .attr("transform", function(d, i) {
                    var translateY = (barHeight + 10) * i;
                    return "translate(0, " + translateY + ")";
                });

                
            ageGroup.append("rect")
                .attr("width", function(d) {
                    return x(d.w);
                })
                .attr("transform", function(d) {
                    return "translate(" + leftPadding +", 0)";
                })
                .attr("height", barHeight)
                .attr("fill", colors[0]);
            
            ageGroup.append("rect")
                .attr("width", function(d) {
                    return x(d.m);
                })
                .attr("transform", function(d) {
                    return "translate(" + (leftPadding + x(d.w)) +", 0)";
                })
                .attr("height", barHeight)
                .attr("fill", colors[1]);
            
            var ageLabel = ageGroup.append("text")
                .attr("y", barHeight /2)
                .attr("dy", "0.5em")
                .attr("font-family", "Futura Today Light, Arial, sans-serif")
                .attr("fill", "#4A4A4A")
                .text(function(d) {
                    return d.age;
                });
        }
    });
});
