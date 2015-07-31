define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["EntryView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section class="iapp-entry-details ' +
((__t = ( party )) == null ? '' : __t) +
'">\n    <div class="iapp-detail-summary">\n        <h2 class="iapp-entry-details-header">' +
((__t = ( name )) == null ? '' : __t) +
'</h2>\n        <h4 class="iapp-entry-details-subheader">Overall Facebook Activity</h4>\n        <h3 class="iapp-entry-details-large-number">';
 print(interactions.toLocaleString()) ;
__p += '</h3>\n        <div class="iapp-entry-details-trend">\n            <img class="iapp-details-trend-icon" src="';
 print(config.imageDir + trend);
__p += '.png" alt="' +
((__t = ( trend )) == null ? '' : __t) +
'"></span>\n            <span class="iapp-details-trend-detail">';
 trend == "down" ? print("Decreased") : print("Increased");
__p += ' by ';
 print(Math.abs(total_interactions_diff).toLocaleString()) ;
__p += '</span>\n        </div>\n    </div>\n    <div class="iapp-entry-details-demographics">\n        <div class="iapp-entry-details-demographics-overall">\n            <div class="iapp-entry-details-demographics-overall-headers">\n                <span class="iapp-demo-headers-female">Female</span>\n                <span class="iapp-demo-headers-male">Male</span>\n            </div>\n            <div class="iapp-entry-details-demographics-overview-bar iapp-js-entry-demo-overview"></div>\n        </div>\n        <div class="iapp-entry-details-demographics-details iapp-js-entry-demo-details"></div>\n    </div>\n</section>\n';

}
return __p
};

this["templates"]["politicianIndex.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-politician-index-wrap"></div>\n<div class="iapp-politician-index-show-button">See all candidates</div>\n';

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
'">\n    <div class="iapp-politician-item-portrait-inner">\n        <img src="';
 print(config.imageDir + "/candidates/" + slug + ".jpg") ;
__p += '" alt="' +
((__t = ( name )) == null ? '' : __t) +
'">\n    </div>\n</div>\n<img class="iapp-politician-item-trend" src="';
 print(config.imageDir +  trend + "." + party.slice(0, 3) + ".png")  ;
__p += '" alt="">\n<h3 class="iapp-politician-header">' +
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