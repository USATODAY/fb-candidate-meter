#fb-meter

Candidate FB Meter


Copyright 2015 USA TODAY. All rights reserved. No part of these materials may be reproduced, modified, stored in a retrieval system, or retransmitted, in any form or by any means, electronic, mechanical or otherwise, without prior written permission from USA TODAY.

##Development

The requirements for this project are Node.js, Bower and Grunt. 

To install node with Hombrew:
`brew install node`

Or head over to the [Node website](http://nodejs.org/) and install from there.
Once Node is installed, install Grunt with
`npm install -g grunt-cli`

and install Bower with 
`npm install -g bower`

Once those dependencies are set up, from this repository run `npm install`, then run `grunt`

## Config

This app has some a `config` javascript module that detects the environment the app is running in on USA TODAY's platform.

Once the `config` module is required, there are several properties and methods that can be used:
```
define([config], function(config) {
    //boolean value 
    config.isMobile;

    //boolean value
    config.isTablet

    //boolean value
    config.isEmbed

    /******
     * If isEmbed is true, moduleType will equal 1 of 4 string values:
     * - module-large-size-large
     * - module-large-size-small
     * - module-small-size-large
     * - module-small-size-small
     * If isEmbed is false, embedType will be null
     *****/
    config.getModuleType()
});
```
