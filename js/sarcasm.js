/*!
 * sarcasm.js
 * http://4rg0n.github.io/sarcasm.js
 * MIT licensed
 *
 * Copyright (C) 2014 Dominic Rönicke
 */

/**
 * SarcasmJs
 *
 * @return {object}
 */
var SarcasmJs = (function()
{

    'use strict';

    /**
     * Setting up default config
     *
     * @property config
     * @type {object}
     */
    var config = {

        //name of the html tag
        selector: 'sarcasm',

        //name of the CSS class(es) to set
        cssClass: 'animate sarcasm',

        //Falls back to JavaScript animation if CSS3 is not correctly supported... stupid IE!
        doFallback: false,

        //Configuration for the JavaScript animation
        fallbackConfig: {
            animationDelay: 2000, //2 seconds
            animationDuration: 2000, //2 seconds
            animationLoop: true
        },

        //template
        template: '<span class="{0}">"</span>{1}<span class="{2}">"</span>'
    },

    /**
     * Flags if sarcasm.js is successfully loaded
     *
     * @property loaded
     * @type {boolean}
     */
    loaded = false;


    /**
     * Initializes sarcasm.js
     *
     * @method initialize
     * @param {object} options
     */
    function initialize(options)
    {
        //merge config with options
        extend(config, options);

        //check whether browser supports transformations
        if (supports('transform')) {
            doWithCss();
            loaded = true;
        } else if (config.doFallback) {

            console.warn('It seems your browser does not support CSS3 animations.');

            //TODO

            //doWithJs();
            loaded = true;
        }
    }

    /**
     * Animates quotes with CSS3 transformation
     */
    function doWithCss()
    {
        var tags =  getSarcasmTags();

        for (var i = 0; i < tags.length; i++){

            tags[i].innerHTML = sprintf(
                config.template,
                config.cssClass,
                tags[i].innerHTML,
                config.cssClass
            );
        }
    }


    /**
     * Animates quotes with Js functions
     *
     * @todo finish animation with native javascript (worth writing own?)
     *
     * @comment Oooh, I hate doing this with Javascript...
     */
    function doWithJs()
    {
        var tags =  getSarcasmTags(),
            tag,
            text,
            quoteLeft,
            quoteRight,
            textSpan;

        for (var i = 0; i < tags.length; i++){
            tag = tags[i];
            text = tag.innerHTML;

            tag.innerHTML = '';

            quoteLeft = buildQuote();
            quoteRight = buildQuote();
            textSpan = document.createElement('span');
            textSpan.innerHTML = text;

            tag.appendChild(quoteLeft);
            tag.appendChild(textSpan);
            tag.appendChild(quoteRight);

            bounce(quoteLeft);
            bounce(quoteRight);
        }
    }


    function bounce(element)
    {
        move(element, 'bottom', 4, 200);
    }

    /**
     * Moves an element in this direction.
     *
     * top
     * bottom
     * left
     * right
     *
     * @param element
     * @param {string} direction
     * @param {int} distance (in pixels)
     * @param {int} duration (in milliseconds)
     */
    function move(element, direction, distance, duration)
    {
        var delay = duration / distance,
            id,
            move = 0;

        function doMove()
        {
            if (move >= distance) {
                clearInterval(id)
            }

            move++;

            element.style[direction] = move + 'px';
        }

        id = setInterval(doMove, delay);
    }


    /**
     * Gets all the sarcasm tags.
     * Selector is condfigured in config.selector
     *
     * @returns {NodeList}
     */
    function getSarcasmTags()
    {
        return document.getElementsByTagName(config.selector);
    }


    /**
     * Builds the span element with quote
     *
     * @returns {HTMLElement}
     */
    function buildQuote()
    {
        var span = document.createElement('span');

        span.innerHTML = '"';
        span.style.position = 'relative';

        return span;
    }


    /**
     * Extends objectA with objectB
     *
     * @method extend
     * @param {pbject} objectA
     * @param {pbject} objectB
     */
    function extend(objectA, objectB)
    {
        for (var i in objectB) {
            objectA[i] = objectB[i];
        }
    }


    /**
     * Returns whether sarcasm.js is loaded
     *
     * @returns {boolean}
     */
    function isLoaded()
    {
        return loaded;
    }


    /**
     * Replaces tokens with the given arguments
     *
     * @param {string} template
     * @returns {string}
     */
    function sprintf(template)
    {
        var args = Array.prototype.slice.call(arguments, 1);

        return template.replace(/{(\d+)}/g, function(match, number)
        {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
            ;
        });
    }


    /**
     *
     * @param {string} cssProperty
     * @returns {boolean}
     */
    function supports(cssProperty)
    {
        var body = document.body || document.documentElement,
            style = body.style;

        //No CSS support
        if (typeof style == 'undefined') {
            return false;
        }

        //Tests default property
        if(typeof style[cssProperty] == 'string') {
            return true;
        }

        //Tests vendor property
        var vendor = ['Moz', 'Webkit', 'Khtml', 'O', 'ms', 'Icab'],

            //Format property name
            cssProperty = cssProperty.charAt(0).toUpperCase() + cssProperty.substr(1);

        for(var i = 0; i < vendor.length; i++) {
            if(typeof style[vendor[i] + cssProperty] == 'string') {
                return true;
            }
        }
    }

    /**
     * API
     */
    return {
        initialize: initialize,
        isLoaded: isLoaded
    }

})();