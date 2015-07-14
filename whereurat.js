var whereURAtUtils = (function () {
    'use strict';

    function addEventListener(element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler);
        } else {
            element.attachEvent('on' + eventName, function () {
                handler.call(element);
            });
        }
    }

    function extend(target, extender) {
        for (var key in extender) {
            if (target.hasOwnProperty(key)) {
                target[key] = extender[key];
            }
        }
    }

    return {
        extend: extend,
        addEventListener: addEventListener
    };
}());

var whereURAt = (function (utilityService) {
    'use strict';

    var bar,
        _config = {
            barId: 'whereURAt-bar',
            barColor: '#298AD9',
            barHeight: '2px',
            animate: true,
            animationSpeed: 0.1,
            zIndex: '999999'
        };

    function add(config) {
        utilityService.extend(_config, config);
        clearBar();
        addBar();
        addBarStyle();
        addWidthAdjustHandler();
        adjustWidth();
    }

    function addBar() {
        document.body.insertAdjacentHTML('afterbegin', '<div id="' + _config.barId + '"></div>');
        bar = document.getElementById(_config.barId);
    }

    function clearBar() {
        var bar = document.getElementById(_config.barId);

        if (bar) {
            document.removeEventListener('scroll', adjustWidth);
            document.body.removeChild(bar);
        }
    }

    function addBarStyle() {
        var transition;

        bar.style.position = 'fixed';
        bar.style.top = '0';
        bar.style.width = '0';
        bar.style.height = _config.barHeight;
        bar.style.backgroundColor = _config.barColor;
        bar.style.zIndex = _config.zIndex;

        if (_config.animate) {
            transition = 'width ' + _config.animationSpeed + 's linear';

            bar.style['-webkit-transition'] = transition;
            bar.style['-moz-transition'] = transition;
            bar.style['-ms-transition'] = transition;
            bar.style['-o-transition'] = transition;
            bar.style['transition'] = transition;
        }
    }

    function addWidthAdjustHandler() {
        utilityService.addEventListener(document, 'scroll', adjustWidth);
        utilityService.addEventListener(document, 'resize', adjustWidth);
    }

    function adjustWidth() {
        var percentage = 100 / (document.body.clientHeight - window.innerHeight) * document.body.scrollTop;

        bar.style.width = percentage + '%';
    }

    return {
        add: add
    };
}(whereURAtUtils));
