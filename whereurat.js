var whereURAt = (function () {
    var bar,
        barId = 'whereURAt-bar',
        _config = {
            barColor: '#298AD9',
            barHeight: '2px',
            animate: true,
            animationSpeed: 0.1,
            zIndex: '999999'
        };

    function extend(target, extender) {
        for (var key in extender) {
            if (target.hasOwnProperty(key)) {
                target[key] = extender[key];
            }
        }
    }

    function add(config) {
        extend(_config, config);
        clearBar();
        addBar();
        addBarStyle();
        addWidthAdjustHandler();
        adjustWidth();
    }

    function addBar() {
        document.body.insertAdjacentHTML('afterbegin', '<div id="' + barId + '"></div>');
        bar = document.getElementById(barId);
    }

    function clearBar() {
        var bar = document.getElementById(barId);

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
        addEventListener(document, 'scroll', adjustWidth);
        addEventListener(document, 'resize', adjustWidth);
    }

    function addEventListener(element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler);
        } else {
            element.attachEvent('on' + eventName, function () {
                handler.call(element);
            });
        }
    }

    function adjustWidth() {
        var percentage = 100 / (document.body.clientHeight - window.innerHeight) * document.body.scrollTop;

        bar.style.width = percentage + '%';
    }

    return {
        add: add
    };
}());
