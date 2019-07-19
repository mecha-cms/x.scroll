(function(win, doc) {

    var ease = {},
        html = doc.documentElement,
        body = doc.body,
        el = doc.getElementsByClassName('js:scroll'),
        i, j = el.length;

    if (!j) return;

    // Based on <http://javascript.info/js-animation>
    function animate(timing, draw, duration, fn) {
        var start = performance.now(),
            timeFraction, progress;
        win.requestAnimationFrame(function animate(time) {
            // `timeFraction` goes from 0 to 1
            timeFraction = (time - start) / duration;
            if (timeFraction > 1) {
                timeFraction = 1;
            }
            // Calculate the current animation state
            progress = timing(timeFraction)
            draw(progress); // Draw it!
            if (timeFraction < 1) {
                win.requestAnimationFrame(animate);
            } else {
                fn && fn();
            }
        });
    }

    (function(E, M, undef) {

        function makeOut(timing) {
            return function(timeFraction) {
                return 1 - timing(1 - timeFraction);
            };
        }

        function makeInOut(timing) {
            return function(timeFraction) {
                if (timeFraction < .5) {
                    return timing(2 * timeFraction) / 2;
                }
                return (2 - timing(2 * (1 - timeFraction))) / 2;
            };
        }

        function pow(x, timeFraction) {
            return M.pow(timeFraction, x);
        }

        function linear(timeFraction) {
            return timeFraction;
        }

        function inSwing(timeFraction) {
            return -timeFraction * (timeFraction - 2);
        }

        function inQuad(timeFraction) {
            return pow(2, timeFraction);
        }

        function inCubic(timeFraction) {
            return pow(3, timeFraction);
        }

        function inQuart(timeFraction) {
            return pow(4, timeFraction);
        }

        function inQuint(timeFraction) {
            return pow(5, timeFraction);
        }

        function inSine(timeFraction) {
            return -M.cos(timeFraction * (M.PI / 2)) + 1;
        }

        function inExpo(timeFraction) {
            return timeFraction === 0 ? 0 : M.pow(2, 10 * (timeFraction - 1));
        }

        function inCirc(timeFraction) {
            return -(M.sqrt(1 - (timeFraction * timeFraction)) - 1);
        }

        function inBack(timeFraction) {
            var x = 1.5; // Constant
            return M.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
        }

        function inBounce(timeFraction) {
            for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (timeFraction >= (7 - 4 * a) / 11) {
                    return -M.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + M.pow(b, 2)
                }
            }
        }

        function inElastic(timeFraction) {
            var x = 1.5; // Constant
            return M.pow(2, 10 * (timeFraction - 1)) * M.cos(20 * M.PI * x / 3 * timeFraction);
        }

        E[""] = linear; // linear (default)

        E['in'] = inSwing;
        E['in-quad'] = inQuad;
        E['in-cubic'] = inCubic;
        E['in-quart'] = inQuart;
        E['in-quint'] = inQuint;
        E['in-sine'] = inSine;
        E['in-expo'] = inExpo;
        E['in-circ'] = inCirc;
        E['in-back'] = inBack;
        E['in-bounce'] = inBounce;
        E['in-elastic'] = inElastic;

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
        animate(type, function(progress) {
            el.scrollLeft = (to[0] * progress) + X;
            el.scrollTop = (to[1] * progress) + Y;
        }, duration, fn);
    }

    function click(e) {
        var $ = this,
            ease = $.getAttribute('data-ease'),
            duration = +($.getAttribute('data-duration') || 3000),
            hash = ($.hash || "").replace('#', ""),
            change = $.getAttribute('data-hash') || hash,
            section = hash && doc.getElementById(hash),
            bounds = (section || html).getBoundingClientRect(),
            args = [
                0,
                [bounds.left, bounds.top],
                ease,
                duration,
                function() {
                    hash && change !== '0' && change !== 'false' && (win.location.hash = change);
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