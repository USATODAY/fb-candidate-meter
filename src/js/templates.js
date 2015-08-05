define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["EntryView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section class="iapp-entry-details ' +
((__t = ( party )) == null ? '' : __t) +
'">\n    ';
 if (slug=="all-candidates") { ;
__p += '\n        <div class="iapp-detail-summary slide">\n    ';
 } else {;
__p += '\n        <div class="iapp-detail-summary">\n    ';
 } ;
__p += '\n        <h2 class="iapp-entry-details-header">' +
((__t = ( name )) == null ? '' : __t) +
'</h2>\n        <h4 class="iapp-entry-details-subheader">Overall Facebook Activity</h4>\n        <h3 class="iapp-entry-details-large-number">';
 print(interactions.toLocaleString()) ;
__p += ' <span class="iapp-entry-details-large-number-unit">interactions</span></h3>\n        <div class="iapp-entry-details-trend">\n            ';
 if (total_interactions_diff) { ;
__p += '\n            <img class="iapp-details-trend-icon" src="';
 print(config.imageDir + trend);
__p += '.png" alt="' +
((__t = ( trend )) == null ? '' : __t) +
'"></span>\n            <span class="iapp-details-trend-detail">';
 trend == "down" ? print("Decreased") : print("Increased");
__p += ' by ';
 print(Math.abs(total_interactions_diff).toLocaleString()) ;
__p += '</span>\n            ';
 } ;
__p += '\n        </div>\n    </div>\n    <div class="iapp-entry-details-demographics">\n        <div class="iapp-entry-details-demographics-overall">\n            <div class="iapp-entry-details-demographics-overall-headers">\n                <span class="iapp-demo-headers-female">Female</span>\n                <span class="iapp-demo-headers-male">Male</span>\n            </div>\n            <div class="iapp-entry-details-demographics-overview-bar iapp-js-entry-demo-overview"></div>\n        </div>\n        <div class="iapp-entry-details-demographics-details iapp-js-entry-demo-details"></div>\n    </div>\n</section>\n';

}
return __p
};

this["templates"]["entriesView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="iapp-entries-date-wrap">\n    <div class="iapp-entries-date-inner-wrap">\n        ';
 if (showPrevious) {;
__p += '\n        <span class="iapp-entries-date-previous iapp-entries-date-selector"><img src="';
 print(config.imageDir + "left.png");
__p += '" alt="left"></span>\n        ';
};
__p += '\n        <span class="iapp-entries-date">Week of ' +
((__t = ( date )) == null ? '' : __t) +
'</span> \n        ';
 if (showNext) {;
__p += '\n        <span class="iapp-entries-date-next iapp-entries-date-selector"><img src="';
 print(config.imageDir + "right.png");
__p += '" alt="right"></span>\n        ';
};
__p += '\n    </div>\n</div>\n';

}
return __p
};

this["templates"]["header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-politician-index-intro">\n    <div class="iapp-politician-index-intro-inner-wrap">\n        <h2 class="iapp-index-intro-header">2016 CANDIDATES FACEBOOK ACTIVITY</h2>\n        <p class="iapp-index-intro-chatter">USA Today and Facebook have partnered to map conversation about the presidential candidates. The interactive below displays total Facebook activity (likes, shares, mentions) for each candidate each week, showing who is trending up and down. </p>\n    </div>\n</div>\n';

}
return __p
};

this["templates"]["politicianIndex.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-politician-index-wrap"></div>\n<div class="iapp-politician-index-sort-buttons">\n    <span class="iapp-politician-index-sort-label">Sort by: </span>\n    <span class="iapp-politician-index-sort-button iapp-sort-button-name selected">Name</span>\n    <span class="iapp-politician-index-sort-button iapp-sort-button-trend">Trending</span>\n    <span class="iapp-politician-index-sort-button iapp-sort-button-party">Party</span>\n</div>\n<div class="iapp-politician-index-show-button">Select a candidate</div>\n\n';

}
return __p
};

this["templates"]["politicianIndexItem.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="iapp-politician-item-portrait ' +
((__t = ( party )) == null ? '' : __t) +
'">\n    <div class="iapp-politician-item-portrait-inner">\n        ';
 if(party){ ;
__p += '\n            <img src="';
 print(config.imageDir + "/candidates/" + slug + ".jpg") ;
__p += '" alt="' +
((__t = ( name )) == null ? '' : __t) +
'">\n        ';
 } else {;
__p += '\n            <img src="';
 print(config.imageDir + "/candidates/" + slug + ".png") ;
__p += '" alt="' +
((__t = ( name )) == null ? '' : __t) +
'">\n        ';
 } ;
__p += '\n    </div>\n</div>\n';
 if(party){ ;
__p += '\n    <img class="iapp-politician-item-trend" src="';
 print(config.imageDir +  trend + "." + party.slice(0, 3) + ".png")  ;
__p += '" alt="">\n';
 } ;
__p += '\n<h3 class="iapp-politician-header">' +
((__t = ( name )) == null ? '' : __t) +
'</h3>\n';

}
return __p
};

this["templates"]["template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>' +
((__t = (test)) == null ? '' : __t) +
'</h3>\n';

}
return __p
};

  return this["templates"];

});