(function(win, doc) {

    var easings = {},
        el = doc.getElementsByClassName('js:scroll'),
        i, j = el.length;

    if (!j) return;

    // Based on the jQuery easing equations by Robert Penner

    // t: current time
    // b: start value
    // c: change in value
    // d: duration
    (function(E, undef) {
        var PI = Math.PI;
        // Default, linear
        E[""] = function(t, b, c, d) {
            return c * (t / d) + b;
        };

        // TODO
        E['in'] = function(t, b, c, d) {};
        E['out'] = function(t, b, c, d) {};
        E['in-out'] = function(t, b, c, d) {};

        E['in-quad'] = function(t, b, c, d) {
            return c * (t /= d) * t + b;
        };
        E['out-quad'] = function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };
        E['in-out-quad'] = function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        };
        E['in-cubic'] = function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        };
        E['out-cubic'] = function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        };
        E['in-out-cubic'] = function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        };
        E['in-quart'] = function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        };
        E['out-quart'] = function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        };
        E['in-out-quart'] = function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        };
        E['in-quint'] = function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };
        E['out-quint'] = function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        };
        E['in-out-quint'] = function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        };
        E['in-sine'] = function(t, b, c, d) {
            return -c * Math.cos(t / d * (PI / 2)) + c + b;
        };
        E['out-sine'] = function(t, b, c, d) {
            return c * math.sin(t / d * (PI / 2)) + b;
        };
        E['in-out-sine'] = function(t, b, c, d) {
            return -c / 2 * (Math.cos(PI * t / d) - 1) + b;
        };
        E['in-expo'] = function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        };
        E['out-expo'] = function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        };
        E['in-out-expo'] = function(t, b, c, d) {
            if (t == 0) {
                return b;
            } else if (t == d) {
                return b + c;
            } else if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
        E['in-circ'] = function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        };
        E['out-circ'] = function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        };
        E['in-out-circ'] = function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        };
        E['in-elastic'] = function(t, b, c, d) {
            var s = 1.70158, p = 0, a = c;
            if (t == 0) {
                return b;
            } else if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * PI) / p)) + b;
        };
        E['out-elastic'] = function(t, b, c, d) {
            var s = 1.70158, p = 0, a = c;
            if (t == 0) {
                return b;
            } else if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * PI) / p) + c + b;
        };
        E['in-out-elastic'] = function(t, b, c, d) {
            var s = 1.70158, p = 0, a = c;
            if (t == 0) {
                return b;
            } else if ((t /= d / 2) == 2) {
                return b + c;
            }
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * PI) * Math.asin(c / a);
            }
            if (t < 1) {
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * PI) / p)) + b;
            }
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * PI) / p) * .5 + c + b;
        };
        E['in-back'] = function(t, b, c, d, s) {
            if (s == undef) {
                s = 1.70158;
            }
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        };
        E['out-back'] = function(t, b, c, d, s) {
            if (s == undef) {
                s = 1.70158;
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        };
        E['in-out-back'] = function(t, b, c, d, s) {
            if (s == undef) {
                s = 1.70158;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            }
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        };
        E['in-bounce'] = function(t, b, c, d) {
            return c - E['out-bounce'](d - t, 0, c, d) + b;
        };
        E['out-bounce'] = function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        };
        E['in-out-bounce'] = function(t, b, c, d) {
            if (t < d / 2) {
                return E['in-bounce'](t * 2, 0, c, d) * .5 + b;
            }
            return E['out-bounce'](t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        };
    })(easings);

    function scrollTo(el, to, fps, easing, fn) {
        var X = el.scrollLeft,
            Y = el.scrollTop,
            current = 0,
            step = 1000 / 60;
        easing = easings[typeof easing === "string" ? easing : 'out-quad'] || easings['out-quad'];
        function animate() {
            current += step;
            el.scrollLeft = easing(current, X, to[0] - X, fps);
            el.scrollTop = easing(current, Y, to[1] - Y, fps);
            if (current < fps) {
                if (win.requestAnimationFrame) {
                    win.requestAnimationFrame(animate);
                } else {
                    win.setTimeout(animate, step);
                }
            } else {
                fn && fn.call(el);
            }
        };
        animate();
    }

    function click(e) {
        var $ = this,
            ease = $.getAttribute('data-ease'),
            container = $.getAttribute('data-container'),
            hash = ($.hash || "").replace('#', ""),
            section = hash && doc.getElementById(hash),
            arg = [
                container && doc.querySelector(container) || doc.body,
                [
                    section ? section.offsetLeft : 0,
                    section ? section.offsetTop : 0
                ],
                600, ease, function() {
                    hash && $.getAttribute('data-hash-change') !== 'false' && (win.location.hash = hash);
                }
            ];
        scrollTo.apply({}, arg);
        if (!container) {
            arg[0] = doc.documentElement;
            scrollTo.apply({}, arg);
        }
        e.preventDefault();
    }

    for (i = 0; i < j; ++i) {
        el[i].addEventListener("click", click, false);
    }

})(window, document);