# sarcasm.js

[http://4rg0n.github.io/sarcasm.js/](http://4rg0n.github.io/sarcasm.js/)

## WTF?!

Sarcasm.js was developed for tagging sarcasm in the web.
It wraps the text in double quotes and animates them with CSS3 for a bouncing effect.
When CSS3 transform is not available it falls back to JavaScript animation (coming soon).

## Demo

[http://4rg0n.github.io/sarcasm.js/#demo](http://4rg0n.github.io/sarcasm.js/#demo)

## Installation

Include in your &lt;head&gt;&lt;/head&gt; tag:

    <link rel="stylesheet" type="text/css" href="css/sarcasm.css">


Include in the end of your &lt;body&gt;&lt;/body&gt; tag:

    <script src="js/sarcasm.min.js"></script>
    <script src="config/sarcasm.js"></script>


## Usage

    What a <sarcasm>usefull</sarcasm> JavaScript function...

## Configuration

    SarcasmJs.initialize({
        //name of the html tag
        selector: 'sarcasm',

        //name of the CSS class(es) to set
        cssClass: 'animate sarcasm',

        //Falls back to JavaScript animation if CSS3 is not correctly supported... stupid IE! (unfinished do not use)
        doFallback: false,

        //Configuration for the JavaScript animation (unfinished do not use)
        fallbackConfig: {
            animationDelay: 2000, //2 seconds
            animationDuration: 2000, //2 seconds
            animationLoop: true
        }
    });

## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 Dominic Rönicke
