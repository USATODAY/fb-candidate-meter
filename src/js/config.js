define(["jquery"], function(jQuery) {
    /******
     * Set up basic project info
     *****/

    //set project data URL here
    var dataURL = "";
    var dataDir = "http://www.gannett-cdn.com/experiments/usatoday/2015/07/fb-meter/data/";
    //set project image path here
    var imageDir = "http://www.gannett-cdn.com/experiments/usatoday/2015/07/fb-meter/img/";

    //set project default share language here
    var defaultShareLanguage = "";
    var defaultShareImage = imageDir + "fb-post.jpg";

    /******
     * Detect app environment.
     * Returns boolean values for isMobile, isTablet, and isEmbed.
     * If isEmbed is true, embedType will equal 1 of 4 string values:
     * - module-large-size-large
     * - module-large-size-small
     * - module-small-size-large
     * - module-small-size-small
     * If isEmbed is false, embedType will be null
     *****/

    function _getIsEmbed() {
        return window != window.parent;
    }

    function _getStaticInfo() {
        return JSON.parse(jQuery(".staticinfo").html());
    }

    function _getIsMobile() {
        var isMobile;
        if (_getStaticInfo().platform == "desktop") {
            isMobile = false;
        } else {
            isMobile = true;
        }
        return isMobile;
    }

    function _getFbAppId() {
        return _getStaticInfo().facebook.app_id;
    }

    function _getIsTablet() {
        var isTablet = false;
        if (_getIsMobile() === false) {
            if (Modernizr && Modernizr.touch && window.innerWidth < 1100) {
                isTablet = true;
            }
        }
        return isTablet;
    }
    
    function _getModuleType() {
        var moduleType = null;
        if (_getIsEmbed()) {
            if (window.innerWidth > 1080) {
                moduleType = "module-large-size-large";
            } else if (window.innerWidth > 960) {
                moduleType = "module-large-size-small";
            } else if (window.innerWidth > 720) {
                moduleType = "module-small-size-large";
            } else {
                moduleType = "module-small-size-small";
            }
        }

        return moduleType;
    }



    return {
        imageDir: imageDir,
        dataURL: dataURL,
        dataDir: dataDir,
        staticInfo: _getStaticInfo(),
        fb_app_id: _getFbAppId(),
        isMobile: _getIsMobile(),
        isTablet: _getIsTablet(),
        defaultShareLanguage: defaultShareLanguage,
        defaultShareImage: defaultShareImage,
        isEmbed: _getIsEmbed(),
        getModuleType: _getModuleType
    };
});
