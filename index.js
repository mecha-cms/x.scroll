(function (win, doc) {

    var ease = {},
        html = doc.documentElement,
        body = doc.body,
        requestAnimationFrame = win.requestAnimationFrame,
        el = doc.getElementsByClassName('js:scroll'),
        i, j = el.length;

    if (!j) return;

    // Based on <http://javascript.info/js-animation>
    function animate(timing, draw, duration, fn) {
        if (duration <= 0) {
            fn && fn();
            return;
        }
        var start = performance.now(),
            timeFraction, progress;
        requestAnimationFrame(function animate(time) {
            // `timeFraction` goes from 0 to 1
            timeFraction = (time - start) / duration;
            if (timeFraction > 1) {
                timeFraction = 1;
            }
            // Calculate the current animation state
            progress = timing(timeFraction)
            draw(progress); // Draw it!
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                fn && fn();
            }
        });
    }

    (function (E, M) {

        function makeOut(timing) {
            return function (timeFraction) {
                return 1 - timing(1 - timeFraction);
            };
        }

        function makeInOut(timing) {
            return function (timeFraction) {
                if (timeFraction < .5) {
                    return timing(2 * timeFraction) / 2;
                }
                return (2 - timing(2 * (1 - timeFraction))) / 2;
            };
        }

        function pow(timeFraction, x) {
            return M.pow(timeFraction, x);
        }

        // linear (default)
        E[""] = function (timeFraction) {
            return timeFraction;
        };

        E['in'] = function (timeFraction) {
            return -timeFraction * (timeFraction - 2);
        };

        E['in-quad'] = function (timeFraction) {
            return pow(timeFraction, 2);
        };

        E['in-cubic'] = function (timeFraction) {
            return pow(timeFraction, 3);
        };

        E['in-quart'] = function (timeFraction) {
            return pow(timeFraction, 4);
        };

        E['in-quint'] = function (timeFraction) {
            return pow(timeFraction, 5);
        };

        E['in-sine'] = function (timeFraction) {
            return -M.cos(timeFraction * (M.PI / 2)) + 1;
        };

        E['in-expo'] = function (timeFraction) {
            return timeFraction === 0 ? 0 : pow(2, 10 * (timeFraction - 1));
        };

        E['in-circ'] = function (timeFraction) {
            return -(M.sqrt(1 - (timeFraction * timeFraction)) - 1);
        };

        E['in-back'] = function (timeFraction) {
            var x = 1.5; // Constant
            return pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
        };

        E['in-bounce'] = function (timeFraction) {
            for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (timeFraction >= (7 - 4 * a) / 11) {
                    return -pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + pow(b, 2);
                }
            }
        };

        E['in-elastic'] = function (timeFraction) {
            var x = 1.5; // Constant
            return pow(2, 10 * (timeFraction - 1)) * M.cos(20 * M.PI * x / 3 * timeFraction);
        };

        var any = [
            "",
            '-quad',
            '-cubic',
            '-quart',
            '-quint',
            '-sine',
            '-expo',
            '-circ',
            '-back',
            '-bounce',
            '-elastic'
        ], i, j;

        for (i in any) {
            i = any[i];
            j = E['in' + i];
            E['out' + i] = makeOut(j);
            E['in-out' + i] = makeInOut(j);
        }

    })(ease, Math);

    function scrollTo(el, to, type, duration, fn) {
        var X = el.scrollLeft,
            Y = el.scrollTop;
        type = ease[typeof type === "string" ? type : 'out'] || ease['out'];
        el.scrollTop = to[1];
        animate(type, function (progress) {
            el.scrollLeft = (to[0] * progress) + X;
            el.scrollTop = (to[1] * progress) + Y;
        }, duration, fn);
    }

    function click(e) {
        var $ = this,
            ease = $.getAttribute('data-ease'),
            duration = +($.getAttribute('data-duration') || 3000),
            hash = ($.hash || "").replace('#', ""),
            change = $.getAttribute('data-hash'),
            section = hash && doc.getElementById(hash),
            bounds = (section || html).getBoundingClientRect(),
            args = [
                0,
                [bounds.left, bounds.top],
                ease,
                duration,
                function () {
                    if (hash && change !== 'false' && change !== '0') {
                        if (change && change !== 'true' && change !== '1') {
                            hash = change.replace('#', "");
                        }
                        win.location.hash = hash;
                    }
                }
            ];
        args[0] = body;
        scrollTo.apply({}, args);
        args[0] = html;
        scrollTo.apply({}, args);
        e.preventDefault();
    }

    for (i = 0; i < j; ++i) {
        el[i].addEventListener("click", click, false);
    }

})(window, document);