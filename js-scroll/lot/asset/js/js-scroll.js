(function(win, doc) {

    var selector = doc.getElementsByClassName('js:scroll'), i, j = selector.length;

    function easeOutQuad(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    } // default is `easeOutQuad`

    if (!j) return;

    function scrollTo(el, to, speed, easing, callback) {
        var X = el.scrollLeft,
            Y = el.scrollTop,
            current = 0,
            step = 1000 / 60;
        easing = Math[easing && easing.replace(/-([a-z])/g, function($, a) {
                return a.toUpperCase(); // convert `slug-case` to `camelCase`
            }) || ""] || easeOutQuad;
        function animate() {
            current += step;
            el.scrollLeft = easing(current, X, to[0] - X, speed);
            el.scrollTop = easing(current, Y, to[1] - Y, speed);
            if (current < speed) {
                if (win.requestAnimationFrame) {
                    win.requestAnimationFrame(animate);
                } else {
                    win.setTimeout(animate, step);
                }
            } else {
                callback && callback(el);
            }
        };
        animate();
    }

    function click(e) {
        var $ = this,
            hash = ($.hash || "").replace('#', ""),
            section = hash && doc.getElementById(hash),
            arg = [
                doc.body,
                [
                    section && section.offsetLeft || 0,
                    section && section.offsetTop || 0
                ],
                +($.getAttribute('data-speed') || 400),
                $.getAttribute('data-easing') || "",
                function() {
                    hash && $.getAttribute('data-hash-change') !== 'false' && (win.location.hash = hash);
                }
            ];
        scrollTo.apply({}, arg);
        arg[0] = doc.documentElement;
        scrollTo.apply({}, arg);
        e.preventDefault();
    }

    for (i = 0; i < j; ++i) {
        selector[i].addEventListener('click', click, false);
    }

})(window, document);