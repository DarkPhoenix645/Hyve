!(function (e) {
    var o = e(window),
        n = e("body");
    breakpoints({ xlarge: ["1281px", "1680px"], large: ["981px", "1280px"], medium: ["737px", "980px"], small: ["481px", "736px"], xsmall: ["361px", "480px"], xxsmall: [null, "360px"] }),
        o.on("load", function () {
            window.setTimeout(function () {
                n.removeClass("is-preload");
            }, 100);
        }),
        browser.mobile && n.addClass("is-touch"),
        e("form")
            .find("textarea")
            .each(function () {
                var o = e(this),
                    n = e('<div class="textarea-wrapper"></div>');
                o.find('input[type="submit"]');
                o
                    .wrap(n)
                    .attr("rows", 1)
                    .css("overflow", "hidden")
                    .css("resize", "none")
                    .on("keydown", function (o) {
                        13 == o.keyCode && o.ctrlKey && (o.preventDefault(), o.stopPropagation(), e(this).blur());
                    })
                    .on("blur focus", function () {
                        o.val(e.trim(o.val()));
                    })
                    .on("input blur focus --init", function () {
                        n.css("height", o.height()), o.css("height", "auto").css("height", o.prop("scrollHeight") + "px");
                    })
                    .on("keyup", function (e) {
                        9 == e.keyCode && o.select();
                    })
                    .triggerHandler("--init"),
                    ("ie" == browser.name || browser.mobile) && o.css("max-height", "10em").css("overflow-y", "auto");
            });
    var i = e("#menu");
    i.wrapInner('<div class="inner"></div>'),
        (i._locked = !1),
        (i._lock = function () {
            return (
                !i._locked &&
                ((i._locked = !0),
                window.setTimeout(function () {
                    i._locked = !1;
                }, 350),
                !0)
            );
        }),
        (i._show = function () {
            i._lock() && n.addClass("is-menu-visible");
        }),
        (i._hide = function () {
            i._lock() && n.removeClass("is-menu-visible");
        }),
        (i._toggle = function () {
            i._lock() && n.toggleClass("is-menu-visible");
        }),
        i
            .appendTo(n)
            .on("click", function (e) {
                e.stopPropagation();
            })
            .on("click", "a", function (o) {
                var n = e(this).attr("href");
                o.preventDefault(),
                    o.stopPropagation(),
                    i._hide(),
                    "#menu" != n &&
                        window.setTimeout(function () {
                            window.location.href = n;
                        }, 350);
            })
            .append('<a class="close" href="#menu">Close</a>'),
        n
            .on("click", 'a[href="#menu"]', function (e) {
                e.stopPropagation(), e.preventDefault(), i._toggle();
            })
            .on("click", function (e) {
                i._hide();
            })
            .on("keydown", function (e) {
                27 == e.keyCode && i._hide();
            });
})(jQuery);
