define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["politicianIndex.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h2>Politician Index</h2>\n<div class="iapp-politician-index-wrap"></div>\n';

}
return __p
};

this["templates"]["politicianIndexItem.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-politician-item">\n    <h3 class="iapp-politician-header">' +
((__t = ( name )) == null ? '' : __t) +
'</h3>\n</div>\n';

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