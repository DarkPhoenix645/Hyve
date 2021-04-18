!(function (t) {
    var e = {};
    function r(n) {
        if (e[n]) return e[n].exports;
        var i = (e[n] = { i: n, l: !1, exports: {} });
        return t[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
    }
    (r.m = t),
        (r.c = e),
        (r.d = function (t, e, n) {
            r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
        }),
        (r.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (r.t = function (t, e) {
            if ((1 & e && (t = r(t)), 8 & e)) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var n = Object.create(null);
            if ((r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                for (var i in t)
                    r.d(
                        n,
                        i,
                        function (e) {
                            return t[e];
                        }.bind(null, i)
                    );
            return n;
        }),
        (r.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                            return t.default;
                        }
                    : function () {
                            return t;
                        };
            return r.d(e, "a", e), e;
        }),
        (r.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (r.p = ""),
        r((r.s = 2));
})([
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = { dataAttr: "data-ccursor", noPadding: "noPadding", noParallax: "noParallax", lift: "lift" });
    },
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(5);
        Object.defineProperty(e, "addCursor", {
            enumerable: !0,
            get: function () {
                return n.default;
            },
        });
        var i = r(6);
        Object.defineProperty(e, "setStyles", {
            enumerable: !0,
            get: function () {
                return i.default;
            },
        });
        var s = r(7);
        Object.defineProperty(e, "getMoveIndex", {
            enumerable: !0,
            get: function () {
                return s.default;
            },
        });
        var a = r(8);
        Object.defineProperty(e, "isElHasProperty", {
            enumerable: !0,
            get: function () {
                return a.default;
            },
        });
        var o = r(9);
        Object.defineProperty(e, "getStyleProp", {
            enumerable: !0,
            get: function () {
                return o.default;
            },
        });
    },
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }), r(3), r(4).default();
    },
    function (t, e, r) {},
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(1),
            i = r(10),
            s = r(0);
        e.default = function (t) {
            void 0 === t && (t = {}), (t = { radius: t.radius || 20, transitionSpeed: t.transitionSpeed || 0.2, parallaxIndex: t.parallaxIndex || 50, hoverPadding: t.hoverPadding || 5 }), n.setStyles();
            var e = n.addCursor(t);
            window.onload = function () {
                var r = document.querySelectorAll("[" + s.default.dataAttr + "]");
                i.default(e, t, r);
            };
        };
    },
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.default = function (t) {
                if (t) {
                    var e = document.createElement("div");
                    return e.setAttribute("style", "transform: translate(-200px, -200px); height: " + t.radius + "px; width: " + t.radius + "px;"), e.setAttribute("class", "c-cursor"), document.body.prepend(e), e;
                }
            });
    },
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.default = function () {
                var t = document.createElement("style");
                (t.type = "text/css"),
                    (t.innerText =
                        `\n:root {\n  --main-cursor-clr: rgb(255, 255, 255, 0.2);\n  --main-cursor-hover-clr: rgb(255, 255, 255, 0.4);\n  --ghost-shadow: 0 7px 15px rgba(255, 255, 255, 0.14); }\n\nbody {\n  margin: 0;\n  padding: 0; }\n\n.c-cursor {\n  position: fixed;\n  z-index: 9999;\n  pointer-events: none;\n  border-radius: 200px;\n  background-color: var(--main-cursor-clr);\n  transition: background-color 0.2s ease-in-out;\n}\n\n.c-cursor_active {\n  background-color: var(--main-cursor-hover-clr);\n}\n\n.c-cursor-lift_active {\n  background-color: rgba(0,0,0,0);\n}\n`),
                    document.head.appendChild(t);
            });
    },
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.default = function (t, e, r, n) {
                return (t - e - r / 2) / n;
            });
    },
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(0);
        e.default = function (t, e) {
            return !!t.getAttribute(n.default.dataAttr).includes(e);
        };
    },
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.default = function (t) {
                return getComputedStyle(document.documentElement).getPropertyValue(t);
            });
    },
    function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(11),
            i = r(1),
            s = r(0);
        e.default = function (t, e, r) {
            var a = { cursor: e.parallaxIndex, target: 1.5 * e.parallaxIndex },
                o = !1,
                u = null,
                l = function (r) {
                    (o = !1),
                        t.classList.remove("c-cursor_active"),
                        t.classList.remove("c-cursor-lift_active"),
                        n.TweenLite.to(t, e.transitionSpeed, { x: r.clientX - e.radius / 2, y: r.clientY - e.radius / 2, width: e.radius, height: e.radius, borderRadius: "100px", scale: 1, backgroundImage: "none", filter: "blur(0px)" }),
                        n.TweenLite.to(u, e.transitionSpeed, { x: 0, y: 0, scale: 1, boxShadow: "" });
                };
            document.addEventListener("mousewheel", function (t) {
                l(t);
            }),
                document.addEventListener("mousemove", function (r) {
                    !(function (r) {
                        if (o) {
                            var l = Number(window.getComputedStyle(u).borderRadius.slice(0, -2));
                            i.isElHasProperty(u, s.default.lift)
                                ? (n.TweenLite.to(u, e.transitionSpeed, {
                                        x: i.getMoveIndex(r.clientX, u.getBoundingClientRect().left, u.clientWidth, a.target),
                                        y: i.getMoveIndex(r.clientY, u.getBoundingClientRect().top, u.clientHeight, a.target),
                                        scale: 1.1,
                                        boxShadow: "",
                                    }),
                                    n.TweenLite.to(t, e.transitionSpeed, {
                                        filter: "blur(8px)",
                                        x: u.getBoundingClientRect().left + (r.clientX - u.getBoundingClientRect().left - u.clientWidth / 2) / a.cursor,
                                        y: u.getBoundingClientRect().top + (r.clientY - u.getBoundingClientRect().top - u.clientHeight / 2) / a.cursor,
                                        backgroundImage: "radial-gradient(circle at " + (r.clientX - u.getBoundingClientRect().left) + "px " + (r.clientY - u.getBoundingClientRect().top) + "px, rgba(255,255,255,0.4), rgba(255,255,255,0))",
                                    }))
                                : (n.TweenLite.to(t, e.transitionSpeed, {
                                        x:
                                            u.getBoundingClientRect().left -
                                            (i.isElHasProperty(u, s.default.noPadding) ? null : e.hoverPadding) +
                                            (i.isElHasProperty(u, s.default.noParallax) ? 0 : (r.clientX - u.getBoundingClientRect().left - u.clientWidth / 2) / a.cursor),
                                        y:
                                            u.getBoundingClientRect().top -
                                            (i.isElHasProperty(u, s.default.noPadding) ? null : e.hoverPadding) +
                                            (i.isElHasProperty(u, s.default.noParallax) ? 0 : (r.clientY - u.getBoundingClientRect().top - u.clientHeight / 2) / a.cursor),
                                        borderRadius: l * (i.isElHasProperty(u, s.default.noPadding) ? 1 : 1.5),
                                        width: u.clientWidth + (i.isElHasProperty(u, s.default.noPadding) ? null : 2 * e.hoverPadding),
                                        height: u.clientHeight + (i.isElHasProperty(u, s.default.noPadding) ? null : 2 * e.hoverPadding),
                                    }),
                                    i.isElHasProperty(u, s.default.noParallax) ||
                                        n.TweenLite.to(u, e.transitionSpeed, {
                                            x: -i.getMoveIndex(r.clientX, u.getBoundingClientRect().left, u.clientWidth, a.target),
                                            y: -i.getMoveIndex(r.clientY, u.getBoundingClientRect().top, u.clientHeight, a.target),
                                        }));
                        } else n.TweenLite.to(t, e.transitionSpeed, { x: r.clientX - e.radius / 2, y: r.clientY - e.radius / 2 });
                    })(r);
                }),
                r.forEach(function (r) {
                    r.addEventListener("mouseenter", function (r) {
                        !(function (r) {
                            (o = !0), (u = r.target);
                            var a = Number(window.getComputedStyle(u).borderRadius.slice(0, -2));
                            i.isElHasProperty(u, s.default.lift)
                                ? (t.classList.add("c-cursor-lift_active"), n.TweenLite.to(t, e.transitionSpeed, { borderRadius: a, width: u.clientWidth, height: u.clientHeight, scale: 1.1 }))
                                : t.classList.add("c-cursor_active");
                        })(r);
                    });
                }),
                r.forEach(function (t) {
                    t.addEventListener("mouseleave", function (t) {
                        l(t);
                    });
                });
        };
    },
    function (t, e, r) {
        function n(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }
        function i(t, e) {
            (t.prototype = Object.create(e.prototype)), (t.prototype.constructor = t), (t.__proto__ = e);
        }
        r.r(e),
            r.d(e, "gsap", function () {
                return Ln;
            }),
            r.d(e, "default", function () {
                return Ln;
            }),
            r.d(e, "CSSPlugin", function () {
                return Fn;
            }),
            r.d(e, "TweenMax", function () {
                return In;
            }),
            r.d(e, "TweenLite", function () {
                return Ne;
            }),
            r.d(e, "TimelineMax", function () {
                return ze;
            }),
            r.d(e, "TimelineLite", function () {
                return ze;
            }),
            r.d(e, "Power0", function () {
                return _r;
            }),
            r.d(e, "Power1", function () {
                return gr;
            }),
            r.d(e, "Power2", function () {
                return mr;
            }),
            r.d(e, "Power3", function () {
                return vr;
            }),
            r.d(e, "Power4", function () {
                return yr;
            }),
            r.d(e, "Linear", function () {
                return br;
            }),
            r.d(e, "Quad", function () {
                return xr;
            }),
            r.d(e, "Cubic", function () {
                return wr;
            }),
            r.d(e, "Quart", function () {
                return Tr;
            }),
            r.d(e, "Quint", function () {
                return Pr;
            }),
            r.d(e, "Strong", function () {
                return Mr;
            }),
            r.d(e, "Elastic", function () {
                return Or;
            }),
            r.d(e, "Back", function () {
                return Cr;
            }),
            r.d(e, "SteppedEase", function () {
                return kr;
            }),
            r.d(e, "Bounce", function () {
                return Sr;
            }),
            r.d(e, "Sine", function () {
                return Ar;
            }),
            r.d(e, "Expo", function () {
                return Dr;
            }),
            r.d(e, "Circ", function () {
                return Rr;
            });
        var s,
            a,
            o,
            u,
            l,
            h,
            f,
            c,
            d,
            p,
            _,
            g,
            m,
            v,
            y,
            b,
            x,
            w,
            T,
            P,
            M,
            O,
            C,
            k,
            S,
            A = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } },
            D = { duration: 0.5, overwrite: !1, delay: 0 },
            R = 2 * Math.PI,
            E = R / 4,
            z = 0,
            B = Math.sqrt,
            F = Math.cos,
            L = Math.sin,
            I = function (t) {
                return "string" == typeof t;
            },
            j = function (t) {
                return "function" == typeof t;
            },
            Y = function (t) {
                return "number" == typeof t;
            },
            X = function (t) {
                return void 0 === t;
            },
            N = function (t) {
                return "object" == typeof t;
            },
            U = function (t) {
                return !1 !== t;
            },
            H = function () {
                return "undefined" != typeof window;
            },
            q = function (t) {
                return j(t) || I(t);
            },
            V = Array.isArray,
            W = /(?:-?\.?\d|\.)+/gi,
            Q = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
            G = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
            Z = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
            $ = /\(([^()]+)\)/i,
            J = /[+-]=-?[\.\d]+/,
            K = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
            tt = {},
            et = {},
            rt = function (t) {
                return (et = kt(t, tt)) && ar;
            },
            nt = function (t, e) {
                return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
            },
            it = function (t, e) {
                return !e && console.warn(t);
            },
            st = function (t, e) {
                return (t && (tt[t] = e) && et && (et[t] = e)) || tt;
            },
            at = function () {
                return 0;
            },
            ot = {},
            ut = [],
            lt = {},
            ht = {},
            ft = {},
            ct = 30,
            dt = [],
            pt = "",
            _t = function (t) {
                var e,
                    r,
                    n = t[0];
                if ((N(n) || j(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
                    for (r = dt.length; r-- && !dt[r].targetTest(n); );
                    e = dt[r];
                }
                for (r = t.length; r--; ) (t[r] && (t[r]._gsap || (t[r]._gsap = new Re(t[r], e)))) || t.splice(r, 1);
                return t;
            },
            gt = function (t) {
                return t._gsap || _t(Kt(t))[0]._gsap;
            },
            mt = function (t, e) {
                var r = t[e];
                return j(r) ? t[e]() : (X(r) && t.getAttribute(e)) || r;
            },
            vt = function (t, e) {
                return (t = t.split(",")).forEach(e) || t;
            },
            yt = function (t) {
                return Math.round(1e5 * t) / 1e5 || 0;
            },
            bt = function (t, e) {
                for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; );
                return n < r;
            },
            xt = function (t, e, r) {
                var n,
                    i = Y(t[1]),
                    s = (i ? 2 : 1) + (e < 2 ? 0 : 1),
                    a = t[s];
                if ((i && (a.duration = t[1]), (a.parent = r), e)) {
                    for (n = a; r && !("immediateRender" in n); ) (n = r.vars.defaults || {}), (r = U(r.vars.inherit) && r.parent);
                    (a.immediateRender = U(n.immediateRender)), e < 2 ? (a.runBackwards = 1) : (a.startAt = t[s - 1]);
                }
                return a;
            },
            wt = function () {
                var t,
                    e,
                    r = ut.length,
                    n = ut.slice(0);
                for (lt = {}, ut.length = 0, t = 0; t < r; t++) (e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
            },
            Tt = function (t, e, r, n) {
                ut.length && wt(), t.render(e, r, n), ut.length && wt();
            },
            Pt = function (t) {
                var e = parseFloat(t);
                return (e || 0 === e) && (t + "").match(K).length < 2 ? e : t;
            },
            Mt = function (t) {
                return t;
            },
            Ot = function (t, e) {
                for (var r in e) r in t || (t[r] = e[r]);
                return t;
            },
            Ct = function (t, e) {
                for (var r in e) r in t || "duration" === r || "ease" === r || (t[r] = e[r]);
            },
            kt = function (t, e) {
                for (var r in e) t[r] = e[r];
                return t;
            },
            St = function t(e, r) {
                for (var n in r) e[n] = N(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n];
                return e;
            },
            At = function (t, e) {
                var r,
                    n = {};
                for (r in t) r in e || (n[r] = t[r]);
                return n;
            },
            Dt = function (t) {
                var e = t.parent || s,
                    r = t.keyframes ? Ct : Ot;
                if (U(t.inherit)) for (; e; ) r(t, e.vars.defaults), (e = e.parent || e._dp);
                return t;
            },
            Rt = function (t, e, r, n) {
                void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
                var i = e._prev,
                    s = e._next;
                i ? (i._next = s) : t[r] === e && (t[r] = s), s ? (s._prev = i) : t[n] === e && (t[n] = i), (e._next = e._prev = e.parent = null);
            },
            Et = function (t, e) {
                t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t), (t._act = 0);
            },
            zt = function (t) {
                for (var e = t; e; ) (e._dirty = 1), (e = e.parent);
                return t;
            },
            Bt = function (t) {
                return t._repeat ? Ft(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
            },
            Ft = function (t, e) {
                return (t /= e) && ~~t === t ? ~~t - 1 : ~~t;
            },
            Lt = function (t, e) {
                return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
            },
            It = function (t) {
                return (t._end = yt(t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0)));
            },
            jt = function (t, e) {
                var r = t._dp;
                return r && r.smoothChildTiming && t._ts && ((t._start = yt(t._dp._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts))), It(t), r._dirty || zt(r)), t;
            },
            Yt = function (t, e) {
                var r;
                if (((e._time || (e._initted && !e._dur)) && ((r = Lt(t.rawTime(), e)), (!e._dur || Gt(0, e.totalDuration(), r) - e._tTime > 1e-8) && e.render(r, !0)), zt(t)._dp && t._initted && t._time >= t._dur && t._ts)) {
                    if (t._dur < t.duration()) for (r = t; r._dp; ) r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
                    t._zTime = -1e-8;
                }
            },
            Xt = function (t, e, r, n) {
                return (
                    e.parent && Et(e),
                    (e._start = yt(r + e._delay)),
                    (e._end = yt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0))),
                    (function (t, e, r, n, i) {
                        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
                        var s,
                            a = t[n];
                        if (i) for (s = e[i]; a && a[i] > s; ) a = a._prev;
                        a ? ((e._next = a._next), (a._next = e)) : ((e._next = t[r]), (t[r] = e)), e._next ? (e._next._prev = e) : (t[n] = e), (e._prev = a), (e.parent = e._dp = t);
                    })(t, e, "_first", "_last", t._sort ? "_start" : 0),
                    (t._recent = e),
                    n || Yt(t, e),
                    t
                );
            },
            Nt = function (t, e) {
                return (tt.ScrollTrigger || nt("scrollTrigger", e)) && tt.ScrollTrigger.create(e, t);
            },
            Ut = function (t, e, r, n) {
                return Ie(t, e), t._initted ? (!r && t._pt && ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) && h !== ye.frame ? (ut.push(t), (t._lazy = [e, n]), 1) : void 0) : 1;
            },
            Ht = function (t, e, r) {
                var n = t._repeat,
                    i = yt(e) || 0;
                return (t._dur = i), (t._tDur = n ? (n < 0 ? 1e10 : yt(i * (n + 1) + t._rDelay * n)) : i), t._time > i && ((t._time = i), (t._tTime = Math.min(t._tTime, t._tDur))), !r && zt(t.parent), t.parent && It(t), t;
            },
            qt = function (t) {
                return t instanceof ze ? zt(t) : Ht(t, t._dur);
            },
            Vt = { _start: 0, endTime: at },
            Wt = function t(e, r) {
                var n,
                    i,
                    s = e.labels,
                    a = e._recent || Vt,
                    o = e.duration() >= 1e8 ? a.endTime(!1) : e._dur;
                return I(r) && (isNaN(r) || r in s)
                    ? "<" === (n = r.charAt(0)) || ">" === n
                        ? ("<" === n ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(r.substr(1)) || 0)
                        : (n = r.indexOf("=")) < 0
                        ? (r in s || (s[r] = o), s[r])
                        : ((i = +(r.charAt(n - 1) + r.substr(n + 1))), n > 1 ? t(e, r.substr(0, n - 1)) + i : o + i)
                    : null == r
                    ? o
                    : +r;
            },
            Qt = function (t, e) {
                return t || 0 === t ? e(t) : e;
            },
            Gt = function (t, e, r) {
                return r < t ? t : r > e ? e : r;
            },
            Zt = function (t) {
                return (t + "").substr((parseFloat(t) + "").length);
            },
            $t = [].slice,
            Jt = function (t, e) {
                return t && N(t) && "length" in t && ((!e && !t.length) || (t.length - 1 in t && N(t[0]))) && !t.nodeType && t !== a;
            },
            Kt = function (t, e) {
                return !I(t) || e || (!o && be())
                    ? V(t)
                        ? (function (t, e, r) {
                                return (
                                    void 0 === r && (r = []),
                                    t.forEach(function (t) {
                                        var n;
                                        return (I(t) && !e) || Jt(t, 1) ? (n = r).push.apply(n, Kt(t)) : r.push(t);
                                    }) || r
                                );
                            })(t, e)
                        : Jt(t)
                        ? $t.call(t, 0)
                        : t
                        ? [t]
                        : []
                    : $t.call(u.querySelectorAll(t), 0);
            },
            te = function (t) {
                return t.sort(function () {
                    return 0.5 - Math.random();
                });
            },
            ee = function (t) {
                if (j(t)) return t;
                var e = N(t) ? t : { each: t },
                    r = Ce(e.ease),
                    n = e.from || 0,
                    i = parseFloat(e.base) || 0,
                    s = {},
                    a = n > 0 && n < 1,
                    o = isNaN(n) || a,
                    u = e.axis,
                    l = n,
                    h = n;
                return (
                    I(n) ? (l = h = { center: 0.5, edges: 0.5, end: 1 }[n] || 0) : !a && o && ((l = n[0]), (h = n[1])),
                    function (t, a, f) {
                        var c,
                            d,
                            p,
                            _,
                            g,
                            m,
                            v,
                            y,
                            b,
                            x = (f || e).length,
                            w = s[x];
                        if (!w) {
                            if (!(b = "auto" === e.grid ? 0 : (e.grid || [1, 1e8])[1])) {
                                for (v = -1e8; v < (v = f[b++].getBoundingClientRect().left) && b < x; );
                                b--;
                            }
                            for (w = s[x] = [], c = o ? Math.min(b, x) * l - 0.5 : n % b, d = o ? (x * h) / b - 0.5 : (n / b) | 0, v = 0, y = 1e8, m = 0; m < x; m++)
                                (p = (m % b) - c), (_ = d - ((m / b) | 0)), (w[m] = g = u ? Math.abs("y" === u ? _ : p) : B(p * p + _ * _)), g > v && (v = g), g < y && (y = g);
                            "random" === n && te(w),
                                (w.max = v - y),
                                (w.min = y),
                                (w.v = x = (parseFloat(e.amount) || parseFloat(e.each) * (b > x ? x - 1 : u ? ("y" === u ? x / b : b) : Math.max(b, x / b)) || 0) * ("edges" === n ? -1 : 1)),
                                (w.b = x < 0 ? i - x : i),
                                (w.u = Zt(e.amount || e.each) || 0),
                                (r = r && x < 0 ? Me(r) : r);
                        }
                        return (x = (w[t] - w.min) / w.max || 0), yt(w.b + (r ? r(x) : x) * w.v) + w.u;
                    }
                );
            },
            re = function (t) {
                var e = t < 1 ? Math.pow(10, (t + "").length - 2) : 1;
                return function (r) {
                    return Math.floor(Math.round(parseFloat(r) / t) * t * e) / e + (Y(r) ? 0 : Zt(r));
                };
            },
            ne = function (t, e) {
                var r,
                    n,
                    i = V(t);
                return (
                    !i && N(t) && ((r = i = t.radius || 1e8), t.values ? ((t = Kt(t.values)), (n = !Y(t[0])) && (r *= r)) : (t = re(t.increment))),
                    Qt(
                        e,
                        i
                            ? j(t)
                                ? function (e) {
                                        return (n = t(e)), Math.abs(n - e) <= r ? n : e;
                                    }
                                : function (e) {
                                        for (var i, s, a = parseFloat(n ? e.x : e), o = parseFloat(n ? e.y : 0), u = 1e8, l = 0, h = t.length; h--; )
                                            (i = n ? (i = t[h].x - a) * i + (s = t[h].y - o) * s : Math.abs(t[h] - a)) < u && ((u = i), (l = h));
                                        return (l = !r || u <= r ? t[l] : e), n || l === e || Y(e) ? l : l + Zt(e);
                                    }
                            : re(t)
                    )
                );
            },
            ie = function (t, e, r, n) {
                return Qt(V(t) ? !e : !0 === r ? !!(r = 0) : !n, function () {
                    return V(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t + Math.random() * (e - t)) / r) * r * n) / n;
                });
            },
            se = function (t, e, r) {
                return Qt(r, function (r) {
                    return t[~~e(r)];
                });
            },
            ae = function (t) {
                for (var e, r, n, i, s = 0, a = ""; ~(e = t.indexOf("random(", s)); )
                    (n = t.indexOf(")", e)), (i = "[" === t.charAt(e + 7)), (r = t.substr(e + 7, n - e - 7).match(i ? K : W)), (a += t.substr(s, e - s) + ie(i ? r : +r[0], +r[1], +r[2] || 1e-5)), (s = n + 1);
                return a + t.substr(s, t.length - s);
            },
            oe = function (t, e, r, n, i) {
                var s = e - t,
                    a = n - r;
                return Qt(i, function (e) {
                    return r + (((e - t) / s) * a || 0);
                });
            },
            ue = function (t, e, r) {
                var n,
                    i,
                    s,
                    a = t.labels,
                    o = 1e8;
                for (n in a) (i = a[n] - e) < 0 == !!r && i && o > (i = Math.abs(i)) && ((s = n), (o = i));
                return s;
            },
            le = function (t, e, r) {
                var n,
                    i,
                    s = t.vars,
                    a = s[e];
                if (a) return (n = s[e + "Params"]), (i = s.callbackScope || t), r && ut.length && wt(), n ? a.apply(i, n) : a.call(i);
            },
            he = function (t) {
                return Et(t), t.progress() < 1 && le(t, "onInterrupt"), t;
            },
            fe = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0],
            },
            ce = function (t, e, r) {
                return (255 * (6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) + 0.5) | 0;
            },
            de = function (t, e, r) {
                var n,
                    i,
                    s,
                    a,
                    o,
                    u,
                    l,
                    h,
                    f,
                    c,
                    d = t ? (Y(t) ? [t >> 16, (t >> 8) & 255, 255 & t] : 0) : fe.black;
                if (!d) {
                    if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), fe[t])) d = fe[t];
                    else if ("#" === t.charAt(0)) 4 === t.length && ((n = t.charAt(1)), (i = t.charAt(2)), (s = t.charAt(3)), (t = "#" + n + n + i + i + s + s)), (d = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & 255, 255 & t]);
                    else if ("hsl" === t.substr(0, 3))
                        if (((d = c = t.match(W)), e)) {
                            if (~t.indexOf("=")) return (d = t.match(Q)), r && d.length < 4 && (d[3] = 1), d;
                        } else
                            (a = (+d[0] % 360) / 360),
                                (o = +d[1] / 100),
                                (n = 2 * (u = +d[2] / 100) - (i = u <= 0.5 ? u * (o + 1) : u + o - u * o)),
                                d.length > 3 && (d[3] *= 1),
                                (d[0] = ce(a + 1 / 3, n, i)),
                                (d[1] = ce(a, n, i)),
                                (d[2] = ce(a - 1 / 3, n, i));
                    else d = t.match(W) || fe.transparent;
                    d = d.map(Number);
                }
                return (
                    e &&
                        !c &&
                        ((n = d[0] / 255),
                        (i = d[1] / 255),
                        (s = d[2] / 255),
                        (u = ((l = Math.max(n, i, s)) + (h = Math.min(n, i, s))) / 2),
                        l === h ? (a = o = 0) : ((f = l - h), (o = u > 0.5 ? f / (2 - l - h) : f / (l + h)), (a = l === n ? (i - s) / f + (i < s ? 6 : 0) : l === i ? (s - n) / f + 2 : (n - i) / f + 4), (a *= 60)),
                        (d[0] = ~~(a + 0.5)),
                        (d[1] = ~~(100 * o + 0.5)),
                        (d[2] = ~~(100 * u + 0.5))),
                    r && d.length < 4 && (d[3] = 1),
                    d
                );
            },
            pe = function (t) {
                var e = [],
                    r = [],
                    n = -1;
                return (
                    t.split(ge).forEach(function (t) {
                        var i = t.match(G) || [];
                        e.push.apply(e, i), r.push((n += i.length + 1));
                    }),
                    (e.c = r),
                    e
                );
            },
            _e = function (t, e, r) {
                var n,
                    i,
                    s,
                    a,
                    o = "",
                    u = (t + o).match(ge),
                    l = e ? "hsla(" : "rgba(",
                    h = 0;
                if (!u) return t;
                if (
                    ((u = u.map(function (t) {
                        return (t = de(t, e, 1)) && l + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")";
                    })),
                    r && ((s = pe(t)), (n = r.c).join(o) !== s.c.join(o)))
                )
                    for (a = (i = t.replace(ge, "1").split(G)).length - 1; h < a; h++) o += i[h] + (~n.indexOf(h) ? u.shift() || l + "0,0,0,0)" : (s.length ? s : u.length ? u : r).shift());
                if (!i) for (a = (i = t.split(ge)).length - 1; h < a; h++) o += i[h] + u[h];
                return o + i[a];
            },
            ge = (function () {
                var t,
                    e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (t in fe) e += "|" + t + "\\b";
                return new RegExp(e + ")", "gi");
            })(),
            me = /hsl[a]?\(/,
            ve = function (t) {
                var e,
                    r = t.join(" ");
                if (((ge.lastIndex = 0), ge.test(r))) return (e = me.test(r)), (t[1] = _e(t[1], e)), (t[0] = _e(t[0], e, pe(t[1]))), !0;
            },
            ye =
                ((m = Date.now),
                (v = 500),
                (y = 33),
                (b = m()),
                (x = b),
                (T = w = 1 / 240),
                (M = function t(e) {
                    var r,
                        n,
                        i = m() - x,
                        s = !0 === e;
                    i > v && (b += i - y),
                        (x += i),
                        (g.time = (x - b) / 1e3),
                        ((r = g.time - T) > 0 || s) && (g.frame++, (T += r + (r >= w ? 0.004 : w - r)), (n = 1)),
                        s || (d = p(t)),
                        n &&
                            P.forEach(function (t) {
                                return t(g.time, i, g.frame, e);
                            });
                }),
                (g = {
                    time: 0,
                    frame: 0,
                    tick: function () {
                        M(!0);
                    },
                    wake: function () {
                        l &&
                            (!o &&
                                H() &&
                                ((a = o = window), (u = a.document || {}), (tt.gsap = ar), (a.gsapVersions || (a.gsapVersions = [])).push(ar.version), rt(et || a.GreenSockGlobals || (!a.gsap && a) || {}), (_ = a.requestAnimationFrame)),
                            d && g.sleep(),
                            (p =
                                _ ||
                                function (t) {
                                    return setTimeout(t, (1e3 * (T - g.time) + 1) | 0);
                                }),
                            (c = 1),
                            M(2));
                    },
                    sleep: function () {
                        (_ ? a.cancelAnimationFrame : clearTimeout)(d), (c = 0), (p = at);
                    },
                    lagSmoothing: function (t, e) {
                        (v = t || 1e8), (y = Math.min(e, v, 0));
                    },
                    fps: function (t) {
                        (w = 1 / (t || 240)), (T = g.time + w);
                    },
                    add: function (t) {
                        P.indexOf(t) < 0 && P.push(t), be();
                    },
                    remove: function (t) {
                        var e;
                        ~(e = P.indexOf(t)) && P.splice(e, 1);
                    },
                    _listeners: (P = []),
                })),
            be = function () {
                return !c && ye.wake();
            },
            xe = {},
            we = /^[\d.\-M][\d.\-,\s]/,
            Te = /["']/g,
            Pe = function (t) {
                for (var e, r, n, i = {}, s = t.substr(1, t.length - 3).split(":"), a = s[0], o = 1, u = s.length; o < u; o++)
                    (r = s[o]), (e = o !== u - 1 ? r.lastIndexOf(",") : r.length), (n = r.substr(0, e)), (i[a] = isNaN(n) ? n.replace(Te, "").trim() : +n), (a = r.substr(e + 1).trim());
                return i;
            },
            Me = function (t) {
                return function (e) {
                    return 1 - t(1 - e);
                };
            },
            Oe = function t(e, r) {
                for (var n, i = e._first; i; )
                    i instanceof ze ? t(i, r) : !i.vars.yoyoEase || (i._yoyo && i._repeat) || i._yoyo === r || (i.timeline ? t(i.timeline, r) : ((n = i._ease), (i._ease = i._yEase), (i._yEase = n), (i._yoyo = r))), (i = i._next);
            },
            Ce = function (t, e) {
                return (
                    (t &&
                        (j(t)
                            ? t
                            : xe[t] ||
                                (function (t) {
                                    var e = (t + "").split("("),
                                        r = xe[e[0]];
                                    return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [Pe(e[1])] : $.exec(t)[1].split(",").map(Pt)) : xe._CE && we.test(t) ? xe._CE("", t) : r;
                                })(t))) ||
                    e
                );
            },
            ke = function (t, e, r, n) {
                void 0 === r &&
                    (r = function (t) {
                        return 1 - e(1 - t);
                    }),
                    void 0 === n &&
                        (n = function (t) {
                            return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
                        });
                var i,
                    s = { easeIn: e, easeOut: r, easeInOut: n };
                return (
                    vt(t, function (t) {
                        for (var e in ((xe[t] = tt[t] = s), (xe[(i = t.toLowerCase())] = r), s)) xe[i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = xe[t + "." + e] = s[e];
                    }),
                    s
                );
            },
            Se = function (t) {
                return function (e) {
                    return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
                };
            },
            Ae = function t(e, r, n) {
                var i = r >= 1 ? r : 1,
                    s = (n || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
                    a = (s / R) * (Math.asin(1 / i) || 0),
                    o = function (t) {
                        return 1 === t ? 1 : i * Math.pow(2, -10 * t) * L((t - a) * s) + 1;
                    },
                    u =
                        "out" === e
                            ? o
                            : "in" === e
                            ? function (t) {
                                    return 1 - o(1 - t);
                                }
                            : Se(o);
                return (
                    (s = R / s),
                    (u.config = function (r, n) {
                        return t(e, r, n);
                    }),
                    u
                );
            },
            De = function t(e, r) {
                void 0 === r && (r = 1.70158);
                var n = function (t) {
                        return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
                    },
                    i =
                        "out" === e
                            ? n
                            : "in" === e
                            ? function (t) {
                                    return 1 - n(1 - t);
                                }
                            : Se(n);
                return (
                    (i.config = function (r) {
                        return t(e, r);
                    }),
                    i
                );
            };
        vt("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
            var r = e < 5 ? e + 1 : e;
            ke(
                t + ",Power" + (r - 1),
                e
                    ? function (t) {
                            return Math.pow(t, r);
                        }
                    : function (t) {
                            return t;
                        },
                function (t) {
                    return 1 - Math.pow(1 - t, r);
                },
                function (t) {
                    return t < 0.5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2;
                }
            );
        }),
            (xe.Linear.easeNone = xe.none = xe.Linear.easeIn),
            ke("Elastic", Ae("in"), Ae("out"), Ae()),
            (O = 7.5625),
            (k = 1 / (C = 2.75)),
            ke(
                "Bounce",
                function (t) {
                    return 1 - S(1 - t);
                },
                (S = function (t) {
                    return t < k ? O * t * t : t < 0.7272727272727273 ? O * Math.pow(t - 1.5 / C, 2) + 0.75 : t < 0.9090909090909092 ? O * (t -= 2.25 / C) * t + 0.9375 : O * Math.pow(t - 2.625 / C, 2) + 0.984375;
                })
            ),
            ke("Expo", function (t) {
                return t ? Math.pow(2, 10 * (t - 1)) : 0;
            }),
            ke("Circ", function (t) {
                return -(B(1 - t * t) - 1);
            }),
            ke("Sine", function (t) {
                return 1 === t ? 1 : 1 - F(t * E);
            }),
            ke("Back", De("in"), De("out"), De()),
            (xe.SteppedEase = xe.steps = tt.SteppedEase = {
                config: function (t, e) {
                    void 0 === t && (t = 1);
                    var r = 1 / t,
                        n = t + (e ? 0 : 1),
                        i = e ? 1 : 0;
                    return function (t) {
                        return (((n * Gt(0, 1 - 1e-8, t)) | 0) + i) * r;
                    };
                },
            }),
            (D.ease = xe["quad.out"]),
            vt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (t) {
                return (pt += t + "," + t + "Params,");
            });
        var Re = function (t, e) {
                (this.id = z++), (t._gsap = this), (this.target = t), (this.harness = e), (this.get = e ? e.get : mt), (this.set = e ? e.getSetter : We);
            },
            Ee = (function () {
                function t(t, e) {
                    var r = t.parent || s;
                    (this.vars = t),
                        (this._delay = +t.delay || 0),
                        (this._repeat = t.repeat || 0) && ((this._rDelay = t.repeatDelay || 0), (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
                        (this._ts = 1),
                        Ht(this, +t.duration, 1),
                        (this.data = t.data),
                        c || ye.wake(),
                        r && Xt(r, this, e || 0 === e ? e : r._time, 1),
                        t.reversed && this.reverse(),
                        t.paused && this.paused(!0);
                }
                var e = t.prototype;
                return (
                    (e.delay = function (t) {
                        return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), (this._delay = t), this) : this._delay;
                    }),
                    (e.duration = function (t) {
                        return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur;
                    }),
                    (e.totalDuration = function (t) {
                        if (!arguments.length) return this._tDur;
                        this._dirty = 0;
                        var e = this._time / this._dur || 0;
                        return Ht(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1)), this._tTime ? jt(this, e * t + Bt(this)) : this;
                    }),
                    (e.totalTime = function (t, e) {
                        if ((be(), !arguments.length)) return this._tTime;
                        var r = this._dp;
                        if (r && r.smoothChildTiming && this._ts) {
                            for (jt(this, t); r.parent; ) r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), (r = r.parent);
                            !this.parent && this._dp.autoRemoveChildren && ((this._ts > 0 && t < this._tDur) || (this._ts < 0 && t > 0) || (!this._tDur && !t)) && Xt(this._dp, this, this._start - this._delay);
                        }
                        return (this._tTime !== t || (!this._dur && !e) || (this._initted && 1e-8 === Math.abs(this._zTime)) || (!t && !this._initted)) && (this._ts || (this._pTime = t), Tt(this, t, e)), this;
                    }),
                    (e.time = function (t, e) {
                        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + Bt(this)) % this._dur || (t ? this._dur : 0), e) : this._time;
                    }),
                    (e.totalProgress = function (t, e) {
                        return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
                    }),
                    (e.progress = function (t, e) {
                        return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + Bt(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
                    }),
                    (e.iteration = function (t, e) {
                        var r = this.duration() + this._rDelay;
                        return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? Ft(this._tTime, r) + 1 : 1;
                    }),
                    (e.timeScale = function (t) {
                        if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
                        if (this._rts === t) return this;
                        var e = this.parent && this._ts ? Lt(this.parent._time, this) : this._tTime;
                        return (
                            (this._rts = +t || 0),
                            (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
                            (function (t) {
                                for (var e = t.parent; e && e.parent; ) (e._dirty = 1), e.totalDuration(), (e = e.parent);
                                return t;
                            })(this.totalTime(Gt(-this._delay, this._tDur, e), !0))
                        );
                    }),
                    (e.paused = function (t) {
                        return arguments.length
                            ? (this._ps !== t &&
                                    ((this._ps = t),
                                    t
                                        ? ((this._pTime = this._tTime || Math.max(-this._delay, this.rawTime())), (this._ts = this._act = 0))
                                        : (be(),
                                        (this._ts = this._rts),
                                        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= 1e-8) && 1e-8 !== Math.abs(this._zTime)))),
                                this)
                            : this._ps;
                    }),
                    (e.startTime = function (t) {
                        if (arguments.length) {
                            this._start = t;
                            var e = this.parent || this._dp;
                            return e && (e._sort || !this.parent) && Xt(e, this, t - this._delay), this;
                        }
                        return this._start;
                    }),
                    (e.endTime = function (t) {
                        return this._start + (U(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
                    }),
                    (e.rawTime = function (t) {
                        var e = this.parent || this._dp;
                        return e ? (t && (!this._ts || (this._repeat && this._time && this.totalProgress() < 1)) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Lt(e.rawTime(t), this) : this._tTime) : this._tTime;
                    }),
                    (e.globalTime = function (t) {
                        for (var e = this, r = arguments.length ? t : e.rawTime(); e; ) (r = e._start + r / (e._ts || 1)), (e = e._dp);
                        return r;
                    }),
                    (e.repeat = function (t) {
                        return arguments.length ? ((this._repeat = t), qt(this)) : this._repeat;
                    }),
                    (e.repeatDelay = function (t) {
                        return arguments.length ? ((this._rDelay = t), qt(this)) : this._rDelay;
                    }),
                    (e.yoyo = function (t) {
                        return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
                    }),
                    (e.seek = function (t, e) {
                        return this.totalTime(Wt(this, t), U(e));
                    }),
                    (e.restart = function (t, e) {
                        return this.play().totalTime(t ? -this._delay : 0, U(e));
                    }),
                    (e.play = function (t, e) {
                        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
                    }),
                    (e.reverse = function (t, e) {
                        return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
                    }),
                    (e.pause = function (t, e) {
                        return null != t && this.seek(t, e), this.paused(!0);
                    }),
                    (e.resume = function () {
                        return this.paused(!1);
                    }),
                    (e.reversed = function (t) {
                        return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)), this) : this._rts < 0;
                    }),
                    (e.invalidate = function () {
                        return (this._initted = 0), (this._zTime = -1e-8), this;
                    }),
                    (e.isActive = function () {
                        var t,
                            e = this.parent || this._dp,
                            r = this._start;
                        return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - 1e-8));
                    }),
                    (e.eventCallback = function (t, e, r) {
                        var n = this.vars;
                        return arguments.length > 1 ? (e ? ((n[t] = e), r && (n[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete n[t], this) : n[t];
                    }),
                    (e.then = function (t) {
                        var e = this;
                        return new Promise(function (r) {
                            var n = j(t) ? t : Mt,
                                i = function () {
                                    var t = e.then;
                                    (e.then = null), j(n) && (n = n(e)) && (n.then || n === e) && (e.then = t), r(n), (e.then = t);
                                };
                            (e._initted && 1 === e.totalProgress() && e._ts >= 0) || (!e._tTime && e._ts < 0) ? i() : (e._prom = i);
                        });
                    }),
                    (e.kill = function () {
                        he(this);
                    }),
                    t
                );
            })();
        Ot(Ee.prototype, { _time: 0, _start: 0, _end: 0, _tTime: 0, _tDur: 0, _dirty: 0, _repeat: 0, _yoyo: !1, parent: null, _initted: !1, _rDelay: 0, _ts: 1, _dp: 0, ratio: 0, _zTime: -1e-8, _prom: 0, _ps: !1, _rts: 1 });
        var ze = (function (t) {
            function e(e, r) {
                var i;
                return (
                    void 0 === e && (e = {}),
                    ((i = t.call(this, e, r) || this).labels = {}),
                    (i.smoothChildTiming = !!e.smoothChildTiming),
                    (i.autoRemoveChildren = !!e.autoRemoveChildren),
                    (i._sort = U(e.sortChildren)),
                    i.parent && Yt(i.parent, n(i)),
                    e.scrollTrigger && Nt(n(i), e.scrollTrigger),
                    i
                );
            }
            i(e, t);
            var r = e.prototype;
            return (
                (r.to = function (t, e, r) {
                    return new Ne(t, xt(arguments, 0, this), Wt(this, Y(e) ? arguments[3] : r)), this;
                }),
                (r.from = function (t, e, r) {
                    return new Ne(t, xt(arguments, 1, this), Wt(this, Y(e) ? arguments[3] : r)), this;
                }),
                (r.fromTo = function (t, e, r, n) {
                    return new Ne(t, xt(arguments, 2, this), Wt(this, Y(e) ? arguments[4] : n)), this;
                }),
                (r.set = function (t, e, r) {
                    return (e.duration = 0), (e.parent = this), Dt(e).repeatDelay || (e.repeat = 0), (e.immediateRender = !!e.immediateRender), new Ne(t, e, Wt(this, r), 1), this;
                }),
                (r.call = function (t, e, r) {
                    return Xt(this, Ne.delayedCall(0, t, e), Wt(this, r));
                }),
                (r.staggerTo = function (t, e, r, n, i, s, a) {
                    return (r.duration = e), (r.stagger = r.stagger || n), (r.onComplete = s), (r.onCompleteParams = a), (r.parent = this), new Ne(t, r, Wt(this, i)), this;
                }),
                (r.staggerFrom = function (t, e, r, n, i, s, a) {
                    return (r.runBackwards = 1), (Dt(r).immediateRender = U(r.immediateRender)), this.staggerTo(t, e, r, n, i, s, a);
                }),
                (r.staggerFromTo = function (t, e, r, n, i, s, a, o) {
                    return (n.startAt = r), (Dt(n).immediateRender = U(n.immediateRender)), this.staggerTo(t, e, n, i, s, a, o);
                }),
                (r.render = function (t, e, r) {
                    var n,
                        i,
                        a,
                        o,
                        u,
                        l,
                        h,
                        f,
                        c,
                        d,
                        p,
                        _,
                        g = this._time,
                        m = this._dirty ? this.totalDuration() : this._tDur,
                        v = this._dur,
                        y = this !== s && t > m - 1e-8 && t >= 0 ? m : t < 1e-8 ? 0 : t,
                        b = this._zTime < 0 != t < 0 && (this._initted || !v);
                    if (y !== this._tTime || r || b) {
                        if (
                            (g !== this._time && v && ((y += this._time - g), (t += this._time - g)),
                            (n = y),
                            (c = this._start),
                            (l = !(f = this._ts)),
                            b && (v || (g = this._zTime), (t || !e) && (this._zTime = t)),
                            this._repeat &&
                                ((p = this._yoyo),
                                (u = v + this._rDelay),
                                ((n = yt(y % u)) > v || m === y) && (n = v),
                                (o = ~~(y / u)) && o === y / u && ((n = v), o--),
                                (d = Ft(this._tTime, u)),
                                !g && this._tTime && d !== o && (d = o),
                                p && 1 & o && ((n = v - n), (_ = 1)),
                                o !== d && !this._lock))
                        ) {
                            var x = p && 1 & d,
                                w = x === (p && 1 & o);
                            if (
                                (o < d && (x = !x),
                                (g = x ? 0 : v),
                                (this._lock = 1),
                                (this.render(g || (_ ? 0 : yt(o * u)), e, !v)._lock = 0),
                                !e && this.parent && le(this, "onRepeat"),
                                this.vars.repeatRefresh && !_ && (this.invalidate()._lock = 1),
                                g !== this._time || l !== !this._ts)
                            )
                                return this;
                            if ((w && ((this._lock = 2), (g = x ? v + 1e-4 : -1e-4), this.render(g, !0), this.vars.repeatRefresh && !_ && this.invalidate()), (this._lock = 0), !this._ts && !l)) return this;
                            Oe(this, _);
                        }
                        if (
                            (this._hasPause &&
                                !this._forcing &&
                                this._lock < 2 &&
                                (h = (function (t, e, r) {
                                    var n;
                                    if (r > e)
                                        for (n = t._first; n && n._start <= r; ) {
                                            if (!n._dur && "isPause" === n.data && n._start > e) return n;
                                            n = n._next;
                                        }
                                    else
                                        for (n = t._last; n && n._start >= r; ) {
                                            if (!n._dur && "isPause" === n.data && n._start < e) return n;
                                            n = n._prev;
                                        }
                                })(this, yt(g), yt(n))) &&
                                (y -= n - (n = h._start)),
                            (this._tTime = y),
                            (this._time = n),
                            (this._act = !f),
                            this._initted || ((this._onUpdate = this.vars.onUpdate), (this._initted = 1), (this._zTime = t)),
                            g || !n || e || le(this, "onStart"),
                            n >= g && t >= 0)
                        )
                            for (i = this._first; i; ) {
                                if (((a = i._next), (i._act || n >= i._start) && i._ts && h !== i)) {
                                    if (i.parent !== this) return this.render(t, e, r);
                                    if ((i.render(i._ts > 0 ? (n - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (n - i._start) * i._ts, e, r), n !== this._time || (!this._ts && !l))) {
                                        (h = 0), a && (y += this._zTime = -1e-8);
                                        break;
                                    }
                                }
                                i = a;
                            }
                        else {
                            i = this._last;
                            for (var T = t < 0 ? t : n; i; ) {
                                if (((a = i._prev), (i._act || T <= i._end) && i._ts && h !== i)) {
                                    if (i.parent !== this) return this.render(t, e, r);
                                    if ((i.render(i._ts > 0 ? (T - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (T - i._start) * i._ts, e, r), n !== this._time || (!this._ts && !l))) {
                                        (h = 0), a && (y += this._zTime = T ? -1e-8 : 1e-8);
                                        break;
                                    }
                                }
                                i = a;
                            }
                        }
                        if (h && !e && (this.pause(), (h.render(n >= g ? 0 : -1e-8)._zTime = n >= g ? 1 : -1), this._ts)) return (this._start = c), It(this), this.render(t, e, r);
                        this._onUpdate && !e && le(this, "onUpdate", !0),
                            ((y === m && m >= this.totalDuration()) || (!y && g)) &&
                                ((c !== this._start && Math.abs(f) === Math.abs(this._ts)) ||
                                    this._lock ||
                                    ((t || !v) && ((y === m && this._ts > 0) || (!y && this._ts < 0)) && Et(this, 1),
                                    e || (t < 0 && !g) || (!y && !g) || (le(this, y === m ? "onComplete" : "onReverseComplete", !0), this._prom && !(y < m && this.timeScale() > 0) && this._prom())));
                    }
                    return this;
                }),
                (r.add = function (t, e) {
                    var r = this;
                    if ((Y(e) || (e = Wt(this, e)), !(t instanceof Ee))) {
                        if (V(t))
                            return (
                                t.forEach(function (t) {
                                    return r.add(t, e);
                                }),
                                zt(this)
                            );
                        if (I(t)) return this.addLabel(t, e);
                        if (!j(t)) return this;
                        t = Ne.delayedCall(0, t);
                    }
                    return this !== t ? Xt(this, t, e) : this;
                }),
                (r.getChildren = function (t, e, r, n) {
                    void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === n && (n = -1e8);
                    for (var i = [], s = this._first; s; ) s._start >= n && (s instanceof Ne ? e && i.push(s) : (r && i.push(s), t && i.push.apply(i, s.getChildren(!0, e, r)))), (s = s._next);
                    return i;
                }),
                (r.getById = function (t) {
                    for (var e = this.getChildren(1, 1, 1), r = e.length; r--; ) if (e[r].vars.id === t) return e[r];
                }),
                (r.remove = function (t) {
                    return I(t) ? this.removeLabel(t) : j(t) ? this.killTweensOf(t) : (Rt(this, t), t === this._recent && (this._recent = this._last), zt(this));
                }),
                (r.totalTime = function (e, r) {
                    return arguments.length
                        ? ((this._forcing = 1),
                            !this._dp && this._ts && (this._start = yt(ye.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))),
                            t.prototype.totalTime.call(this, e, r),
                            (this._forcing = 0),
                            this)
                        : this._tTime;
                }),
                (r.addLabel = function (t, e) {
                    return (this.labels[t] = Wt(this, e)), this;
                }),
                (r.removeLabel = function (t) {
                    return delete this.labels[t], this;
                }),
                (r.addPause = function (t, e, r) {
                    var n = Ne.delayedCall(0, e || at, r);
                    return (n.data = "isPause"), (this._hasPause = 1), Xt(this, n, Wt(this, t));
                }),
                (r.removePause = function (t) {
                    var e = this._first;
                    for (t = Wt(this, t); e; ) e._start === t && "isPause" === e.data && Et(e), (e = e._next);
                }),
                (r.killTweensOf = function (t, e, r) {
                    for (var n = this.getTweensOf(t, r), i = n.length; i--; ) Be !== n[i] && n[i].kill(t, e);
                    return this;
                }),
                (r.getTweensOf = function (t, e) {
                    for (var r, n = [], i = Kt(t), s = this._first, a = Y(e); s; )
                        s instanceof Ne
                            ? bt(s._targets, i) && (a ? (!Be || (s._initted && s._ts)) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && n.push(s)
                            : (r = s.getTweensOf(i, e)).length && n.push.apply(n, r),
                            (s = s._next);
                    return n;
                }),
                (r.tweenTo = function (t, e) {
                    e = e || {};
                    var r = this,
                        n = Wt(r, t),
                        i = e,
                        s = i.startAt,
                        a = i.onStart,
                        o = i.onStartParams,
                        u = Ne.to(
                            r,
                            Ot(e, {
                                ease: "none",
                                lazy: !1,
                                time: n,
                                duration: e.duration || Math.abs((n - (s && "time" in s ? s.time : r._time)) / r.timeScale()) || 1e-8,
                                onStart: function () {
                                    r.pause();
                                    var t = e.duration || Math.abs((n - r._time) / r.timeScale());
                                    u._dur !== t && Ht(u, t).render(u._time, !0, !0), a && a.apply(u, o || []);
                                },
                            })
                        );
                    return u;
                }),
                (r.tweenFromTo = function (t, e, r) {
                    return this.tweenTo(e, Ot({ startAt: { time: Wt(this, t) } }, r));
                }),
                (r.recent = function () {
                    return this._recent;
                }),
                (r.nextLabel = function (t) {
                    return void 0 === t && (t = this._time), ue(this, Wt(this, t));
                }),
                (r.previousLabel = function (t) {
                    return void 0 === t && (t = this._time), ue(this, Wt(this, t), 1);
                }),
                (r.currentLabel = function (t) {
                    return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + 1e-8);
                }),
                (r.shiftChildren = function (t, e, r) {
                    void 0 === r && (r = 0);
                    for (var n, i = this._first, s = this.labels; i; ) i._start >= r && (i._start += t), (i = i._next);
                    if (e) for (n in s) s[n] >= r && (s[n] += t);
                    return zt(this);
                }),
                (r.invalidate = function () {
                    var e = this._first;
                    for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
                    return t.prototype.invalidate.call(this);
                }),
                (r.clear = function (t) {
                    void 0 === t && (t = !0);
                    for (var e, r = this._first; r; ) (e = r._next), this.remove(r), (r = e);
                    return (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), zt(this);
                }),
                (r.totalDuration = function (t) {
                    var e,
                        r,
                        n,
                        i,
                        a = 0,
                        o = this,
                        u = o._last,
                        l = 1e8;
                    if (arguments.length) return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -t : t));
                    if (o._dirty) {
                        for (i = o.parent; u; )
                            (e = u._prev),
                                u._dirty && u.totalDuration(),
                                (n = u._start) > l && o._sort && u._ts && !o._lock ? ((o._lock = 1), (Xt(o, u, n - u._delay, 1)._lock = 0)) : (l = n),
                                n < 0 && u._ts && ((a -= n), ((!i && !o._dp) || (i && i.smoothChildTiming)) && ((o._start += n / o._ts), (o._time -= n), (o._tTime -= n)), o.shiftChildren(-n, !1, -1 / 0), (l = 0)),
                                (r = It(u)) > a && u._ts && (a = r),
                                (u = e);
                        Ht(o, o === s && o._time > a ? o._time : a, 1), (o._dirty = 0);
                    }
                    return o._tDur;
                }),
                (e.updateRoot = function (t) {
                    if ((s._ts && (Tt(s, Lt(t, s)), (h = ye.frame)), ye.frame >= ct)) {
                        ct += A.autoSleep || 120;
                        var e = s._first;
                        if ((!e || !e._ts) && A.autoSleep && ye._listeners.length < 2) {
                            for (; e && !e._ts; ) e = e._next;
                            e || ye.sleep();
                        }
                    }
                }),
                e
            );
        })(Ee);
        Ot(ze.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
        var Be,
            Fe = function (t, e, r, n, i, s, a, o, u) {
                j(n) && (n = n(i || 0, t, s));
                var l,
                    h = t[e],
                    f = "get" !== r ? r : j(h) ? (u ? t[e.indexOf("set") || !j(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]()) : h,
                    c = j(h) ? (u ? qe : He) : Ue;
                if ((I(n) && (~n.indexOf("random(") && (n = ae(n)), "=" === n.charAt(1) && (n = parseFloat(f) + parseFloat(n.substr(2)) * ("-" === n.charAt(0) ? -1 : 1) + (Zt(f) || 0))), f !== n))
                    return isNaN(f * n)
                        ? (!h && !(e in t) && nt(e, n),
                            function (t, e, r, n, i, s, a) {
                                var o,
                                    u,
                                    l,
                                    h,
                                    f,
                                    c,
                                    d,
                                    p,
                                    _ = new rr(this._pt, t, e, 0, 1, Ze, null, i),
                                    g = 0,
                                    m = 0;
                                for (_.b = r, _.e = n, r += "", (d = ~(n += "").indexOf("random(")) && (n = ae(n)), s && (s((p = [r, n]), t, e), (r = p[0]), (n = p[1])), u = r.match(Z) || []; (o = Z.exec(n)); )
                                    (h = o[0]),
                                        (f = n.substring(g, o.index)),
                                        l ? (l = (l + 1) % 5) : "rgba(" === f.substr(-5) && (l = 1),
                                        h !== u[m++] &&
                                            ((c = parseFloat(u[m - 1]) || 0),
                                            (_._pt = { _next: _._pt, p: f || 1 === m ? f : ",", s: c, c: "=" === h.charAt(1) ? parseFloat(h.substr(2)) * ("-" === h.charAt(0) ? -1 : 1) : parseFloat(h) - c, m: l && l < 4 ? Math.round : 0 }),
                                            (g = Z.lastIndex));
                                return (_.c = g < n.length ? n.substring(g, n.length) : ""), (_.fp = a), (J.test(n) || d) && (_.e = 0), (this._pt = _), _;
                            }.call(this, t, e, f, n, c, o || A.stringFilter, u))
                        : ((l = new rr(this._pt, t, e, +f || 0, n - (f || 0), "boolean" == typeof h ? Ge : Qe, 0, c)), u && (l.fp = u), a && l.modifier(a, this, t), (this._pt = l));
            },
            Le = function (t, e, r, n, i, s) {
                var a, o, u, l;
                if (
                    ht[t] &&
                    !1 !==
                        (a = new ht[t]()).init(
                            i,
                            a.rawVars
                                ? e[t]
                                : (function (t, e, r, n, i) {
                                        if ((j(t) && (t = je(t, i, e, r, n)), !N(t) || (t.style && t.nodeType) || V(t))) return I(t) ? je(t, i, e, r, n) : t;
                                        var s,
                                            a = {};
                                        for (s in t) a[s] = je(t[s], i, e, r, n);
                                        return a;
                                    })(e[t], n, i, s, r),
                            r,
                            n,
                            s
                        ) &&
                    ((r._pt = o = new rr(r._pt, i, t, 0, 1, a.render, a, 0, a.priority)), r !== f)
                )
                    for (u = r._ptLookup[r._targets.indexOf(i)], l = a._props.length; l--; ) u[a._props[l]] = o;
                return a;
            },
            Ie = function t(e, r) {
                var n,
                    i,
                    a,
                    o,
                    u,
                    l,
                    h,
                    f,
                    c,
                    d,
                    p,
                    _,
                    g,
                    m = e.vars,
                    v = m.ease,
                    y = m.startAt,
                    b = m.immediateRender,
                    x = m.lazy,
                    w = m.onUpdate,
                    T = m.onUpdateParams,
                    P = m.callbackScope,
                    M = m.runBackwards,
                    O = m.yoyoEase,
                    C = m.keyframes,
                    k = m.autoRevert,
                    S = e._dur,
                    A = e._startAt,
                    R = e._targets,
                    E = e.parent,
                    z = E && "nested" === E.data ? E.parent._targets : R,
                    B = "auto" === e._overwrite,
                    F = e.timeline;
                if ((F && (!C || !v) && (v = "none"), (e._ease = Ce(v, D.ease)), (e._yEase = O ? Me(Ce(!0 === O ? v : O, D.ease)) : 0), O && e._yoyo && !e._repeat && ((O = e._yEase), (e._yEase = e._ease), (e._ease = O)), !F)) {
                    if (((_ = (f = R[0] ? gt(R[0]).harness : 0) && m[f.prop]), (n = At(m, ot)), A && A.render(-1, !0).kill(), y)) {
                        if ((Et((e._startAt = Ne.set(R, Ot({ data: "isStart", overwrite: !1, parent: E, immediateRender: !0, lazy: U(x), startAt: null, delay: 0, onUpdate: w, onUpdateParams: T, callbackScope: P, stagger: 0 }, y)))), b))
                            if (r > 0) !k && (e._startAt = 0);
                            else if (S && !(r < 0 && A)) return void (e._zTime = r);
                    } else if (M && S)
                        if (A) !k && (e._startAt = 0);
                        else if ((r && (b = !1), (a = Ot({ overwrite: !1, data: "isFromStart", lazy: b && U(x), immediateRender: b, stagger: 0, parent: E }, n)), _ && (a[f.prop] = _), Et((e._startAt = Ne.set(R, a))), b)) {
                            if (!r) return;
                        } else t(e._startAt, 1e-8);
                    for (e._pt = 0, x = (S && U(x)) || (x && !S), i = 0; i < R.length; i++) {
                        if (
                            ((h = (u = R[i])._gsap || _t(R)[i]._gsap),
                            (e._ptLookup[i] = d = {}),
                            lt[h.id] && wt(),
                            (p = z === R ? i : z.indexOf(u)),
                            f &&
                                !1 !== (c = new f()).init(u, _ || n, e, p, z) &&
                                ((e._pt = o = new rr(e._pt, u, c.name, 0, 1, c.render, c, 0, c.priority)),
                                c._props.forEach(function (t) {
                                    d[t] = o;
                                }),
                                c.priority && (l = 1)),
                            !f || _)
                        )
                            for (a in n) ht[a] && (c = Le(a, n, e, p, u, z)) ? c.priority && (l = 1) : (d[a] = o = Fe.call(e, u, a, "get", n[a], p, z, 0, m.stringFilter));
                        e._op && e._op[i] && e.kill(u, e._op[i]), B && e._pt && ((Be = e), s.killTweensOf(u, d, e.globalTime(0)), (g = !e.parent), (Be = 0)), e._pt && x && (lt[h.id] = 1);
                    }
                    l && er(e), e._onInit && e._onInit(e);
                }
                (e._from = !F && !!m.runBackwards), (e._onUpdate = w), (e._initted = (!e._op || e._pt) && !g);
            },
            je = function (t, e, r, n, i) {
                return j(t) ? t.call(e, r, n, i) : I(t) && ~t.indexOf("random(") ? ae(t) : t;
            },
            Ye = pt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
            Xe = (Ye + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
            Ne = (function (t) {
                function e(e, r, i, a) {
                    var o;
                    "number" == typeof r && ((i.duration = r), (r = i), (i = null));
                    var u,
                        l,
                        h,
                        f,
                        c,
                        d,
                        p,
                        _,
                        g = (o = t.call(this, a ? r : Dt(r), i) || this).vars,
                        m = g.duration,
                        v = g.delay,
                        y = g.immediateRender,
                        b = g.stagger,
                        x = g.overwrite,
                        w = g.keyframes,
                        T = g.defaults,
                        P = g.scrollTrigger,
                        M = g.yoyoEase,
                        O = o.parent,
                        C = (V(e) ? Y(e[0]) : "length" in r) ? [e] : Kt(e);
                    if (((o._targets = C.length ? _t(C) : it("GSAP target " + e + " not found. https://greensock.com", !A.nullTargetWarn) || []), (o._ptLookup = []), (o._overwrite = x), w || b || q(m) || q(v))) {
                        if (((r = o.vars), (u = o.timeline = new ze({ data: "nested", defaults: T || {} })).kill(), (u.parent = n(o)), w))
                            Ot(u.vars.defaults, { ease: "none" }),
                                w.forEach(function (t) {
                                    return u.to(C, t, ">");
                                });
                        else {
                            if (((f = C.length), (p = b ? ee(b) : at), N(b))) for (c in b) ~Ye.indexOf(c) && (_ || (_ = {}), (_[c] = b[c]));
                            for (l = 0; l < f; l++) {
                                for (c in ((h = {}), r)) Xe.indexOf(c) < 0 && (h[c] = r[c]);
                                (h.stagger = 0),
                                    M && (h.yoyoEase = M),
                                    _ && kt(h, _),
                                    (d = C[l]),
                                    (h.duration = +je(m, n(o), l, d, C)),
                                    (h.delay = (+je(v, n(o), l, d, C) || 0) - o._delay),
                                    !b && 1 === f && h.delay && ((o._delay = v = h.delay), (o._start += v), (h.delay = 0)),
                                    u.to(d, h, p(l, d, C));
                            }
                            u.duration() ? (m = v = 0) : (o.timeline = 0);
                        }
                        m || o.duration((m = u.duration()));
                    } else o.timeline = 0;
                    return (
                        !0 === x && ((Be = n(o)), s.killTweensOf(C), (Be = 0)),
                        O && Yt(O, n(o)),
                        (y ||
                            (!m &&
                                !w &&
                                o._start === yt(O._time) &&
                                U(y) &&
                                (function t(e) {
                                    return !e || (e._ts && t(e.parent));
                                })(n(o)) &&
                                "nested" !== O.data)) &&
                            ((o._tTime = -1e-8), o.render(Math.max(0, -v))),
                        P && Nt(n(o), P),
                        o
                    );
                }
                i(e, t);
                var r = e.prototype;
                return (
                    (r.render = function (t, e, r) {
                        var n,
                            i,
                            s,
                            a,
                            o,
                            u,
                            l,
                            h,
                            f,
                            c = this._time,
                            d = this._tDur,
                            p = this._dur,
                            _ = t > d - 1e-8 && t >= 0 ? d : t < 1e-8 ? 0 : t;
                        if (p) {
                            if (_ !== this._tTime || !t || r || (this._startAt && this._zTime < 0 != t < 0)) {
                                if (((n = _), (h = this.timeline), this._repeat)) {
                                    if (
                                        ((a = p + this._rDelay),
                                        ((n = yt(_ % a)) > p || d === _) && (n = p),
                                        (s = ~~(_ / a)) && s === _ / a && ((n = p), s--),
                                        (u = this._yoyo && 1 & s) && ((f = this._yEase), (n = p - n)),
                                        (o = Ft(this._tTime, a)),
                                        n === c && !r && this._initted)
                                    )
                                        return this;
                                    s !== o && (h && this._yEase && Oe(h, u), !this.vars.repeatRefresh || u || this._lock || ((this._lock = r = 1), (this.render(yt(a * s), !0).invalidate()._lock = 0)));
                                }
                                if (!this._initted) {
                                    if (Ut(this, t < 0 ? t : n, r, e)) return (this._tTime = 0), this;
                                    if (p !== this._dur) return this.render(t, e, r);
                                }
                                for (
                                    this._tTime = _,
                                        this._time = n,
                                        !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                                        this.ratio = l = (f || this._ease)(n / p),
                                        this._from && (this.ratio = l = 1 - l),
                                        n && !c && !e && le(this, "onStart"),
                                        i = this._pt;
                                    i;

                                )
                                    i.r(l, i.d), (i = i._next);
                                (h && h.render(t < 0 ? t : !n && u ? -1e-8 : h._dur * l, e, r)) || (this._startAt && (this._zTime = t)),
                                    this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, r), le(this, "onUpdate")),
                                    this._repeat && s !== o && this.vars.onRepeat && !e && this.parent && le(this, "onRepeat"),
                                    (_ !== this._tDur && _) ||
                                        this._tTime !== _ ||
                                        (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0),
                                        (t || !p) && ((_ === this._tDur && this._ts > 0) || (!_ && this._ts < 0)) && Et(this, 1),
                                        e || (t < 0 && !c) || (!_ && !c) || (le(this, _ === d ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < d && this.timeScale() > 0) && this._prom()));
                            }
                        } else
                            !(function (t, e, r, n) {
                                var i,
                                    s,
                                    a = t.ratio,
                                    o = e < 0 || (!e && a && !t._start && t._zTime > 1e-8 && !t._dp._lock) || t._ts < 0 || t._dp._ts < 0 ? 0 : 1,
                                    u = t._rDelay,
                                    l = 0;
                                if ((u && t._repeat && ((l = Gt(0, t._tDur, e)), Ft(l, u) !== (s = Ft(t._tTime, u)) && ((a = 1 - o), t.vars.repeatRefresh && t._initted && t.invalidate())), t._initted || !Ut(t, e, n, r)))
                                    if (o !== a || n || 1e-8 === t._zTime || (!e && t._zTime)) {
                                        for (s = t._zTime, t._zTime = e || (r ? 1e-8 : 0), r || (r = e && !s), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, r || le(t, "onStart"), i = t._pt; i; )
                                            i.r(o, i.d), (i = i._next);
                                        t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                                            t._onUpdate && !r && le(t, "onUpdate"),
                                            l && t._repeat && !r && t.parent && le(t, "onRepeat"),
                                            (e >= t._tDur || e < 0) && t.ratio === o && (o && Et(t, 1), r || (le(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
                                    } else t._zTime || (t._zTime = e);
                            })(this, t, e, r);
                        return this;
                    }),
                    (r.targets = function () {
                        return this._targets;
                    }),
                    (r.invalidate = function () {
                        return (this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0), (this._ptLookup = []), this.timeline && this.timeline.invalidate(), t.prototype.invalidate.call(this);
                    }),
                    (r.kill = function (t, e) {
                        if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e)) && ((this._lazy = 0), this.parent))) return he(this);
                        if (this.timeline) {
                            var r = this.timeline.totalDuration();
                            return this.timeline.killTweensOf(t, e, Be && !0 !== Be.vars.overwrite)._first || he(this), this.parent && r !== this.timeline.totalDuration() && Ht(this, (this._dur * this.timeline._tDur) / r), this;
                        }
                        var n,
                            i,
                            s,
                            a,
                            o,
                            u,
                            l,
                            h = this._targets,
                            f = t ? Kt(t) : h,
                            c = this._ptLookup,
                            d = this._pt;
                        if (
                            (!e || "all" === e) &&
                            (function (t, e) {
                                for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r]; );
                                return r < 0;
                            })(h, f)
                        )
                            return "all" === e && (this._pt = 0), he(this);
                        for (
                            n = this._op = this._op || [],
                                "all" !== e &&
                                    (I(e) &&
                                        ((o = {}),
                                        vt(e, function (t) {
                                            return (o[t] = 1);
                                        }),
                                        (e = o)),
                                    (e = (function (t, e) {
                                        var r,
                                            n,
                                            i,
                                            s,
                                            a = t[0] ? gt(t[0]).harness : 0,
                                            o = a && a.aliases;
                                        if (!o) return e;
                                        for (n in ((r = kt({}, e)), o)) if ((n in r)) for (i = (s = o[n].split(",")).length; i--; ) r[s[i]] = r[n];
                                        return r;
                                    })(h, e))),
                                l = h.length;
                            l--;

                        )
                            if (~f.indexOf(h[l]))
                                for (o in ((i = c[l]), "all" === e ? ((n[l] = e), (a = i), (s = {})) : ((s = n[l] = n[l] || {}), (a = e)), a))
                                    (u = i && i[o]) && (("kill" in u.d && !0 !== u.d.kill(o)) || Rt(this, u, "_pt"), delete i[o]), "all" !== s && (s[o] = 1);
                        return this._initted && !this._pt && d && he(this), this;
                    }),
                    (e.to = function (t, r) {
                        return new e(t, r, arguments[2]);
                    }),
                    (e.from = function (t, r) {
                        return new e(t, xt(arguments, 1));
                    }),
                    (e.delayedCall = function (t, r, n, i) {
                        return new e(r, 0, { immediateRender: !1, lazy: !1, overwrite: !1, delay: t, onComplete: r, onReverseComplete: r, onCompleteParams: n, onReverseCompleteParams: n, callbackScope: i });
                    }),
                    (e.fromTo = function (t, r, n) {
                        return new e(t, xt(arguments, 2));
                    }),
                    (e.set = function (t, r) {
                        return (r.duration = 0), r.repeatDelay || (r.repeat = 0), new e(t, r);
                    }),
                    (e.killTweensOf = function (t, e, r) {
                        return s.killTweensOf(t, e, r);
                    }),
                    e
                );
            })(Ee);
        Ot(Ne.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
            vt("staggerTo,staggerFrom,staggerFromTo", function (t) {
                Ne[t] = function () {
                    var e = new ze(),
                        r = $t.call(arguments, 0);
                    return r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r);
                };
            });
        var Ue = function (t, e, r) {
                return (t[e] = r);
            },
            He = function (t, e, r) {
                return t[e](r);
            },
            qe = function (t, e, r, n) {
                return t[e](n.fp, r);
            },
            Ve = function (t, e, r) {
                return t.setAttribute(e, r);
            },
            We = function (t, e) {
                return j(t[e]) ? He : X(t[e]) && t.setAttribute ? Ve : Ue;
            },
            Qe = function (t, e) {
                return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4, e);
            },
            Ge = function (t, e) {
                return e.set(e.t, e.p, !!(e.s + e.c * t), e);
            },
            Ze = function (t, e) {
                var r = e._pt,
                    n = "";
                if (!t && e.b) n = e.b;
                else if (1 === t && e.e) n = e.e;
                else {
                    for (; r; ) (n = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + n), (r = r._next);
                    n += e.c;
                }
                e.set(e.t, e.p, n, e);
            },
            $e = function (t, e) {
                for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
            },
            Je = function (t, e, r, n) {
                for (var i, s = this._pt; s; ) (i = s._next), s.p === n && s.modifier(t, e, r), (s = i);
            },
            Ke = function (t) {
                for (var e, r, n = this._pt; n; ) (r = n._next), (n.p === t && !n.op) || n.op === t ? Rt(this, n, "_pt") : n.dep || (e = 1), (n = r);
                return !e;
            },
            tr = function (t, e, r, n) {
                n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
            },
            er = function (t) {
                for (var e, r, n, i, s = t._pt; s; ) {
                    for (e = s._next, r = n; r && r.pr > s.pr; ) r = r._next;
                    (s._prev = r ? r._prev : i) ? (s._prev._next = s) : (n = s), (s._next = r) ? (r._prev = s) : (i = s), (s = e);
                }
                t._pt = n;
            },
            rr = (function () {
                function t(t, e, r, n, i, s, a, o, u) {
                    (this.t = e), (this.s = n), (this.c = i), (this.p = r), (this.r = s || Qe), (this.d = a || this), (this.set = o || Ue), (this.pr = u || 0), (this._next = t), t && (t._prev = this);
                }
                return (
                    (t.prototype.modifier = function (t, e, r) {
                        (this.mSet = this.mSet || this.set), (this.set = tr), (this.m = t), (this.mt = r), (this.tween = e);
                    }),
                    t
                );
            })();
        vt(
            pt +
                "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
            function (t) {
                return (ot[t] = 1);
            }
        ),
            (tt.TweenMax = tt.TweenLite = Ne),
            (tt.TimelineLite = tt.TimelineMax = ze),
            (s = new ze({ sortChildren: !1, defaults: D, autoRemoveChildren: !0, id: "root", smoothChildTiming: !0 })),
            (A.stringFilter = ve);
        var nr = {
            registerPlugin: function () {
                for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                e.forEach(function (t) {
                    return (function (t) {
                        var e = (t = (!t.name && t.default) || t).name,
                            r = j(t),
                            n =
                                e && !r && t.init
                                    ? function () {
                                            this._props = [];
                                        }
                                    : t,
                            i = { init: at, render: $e, add: Fe, kill: Ke, modifier: Je, rawVars: 0 },
                            s = { targetTest: 0, get: 0, getSetter: We, aliases: {}, register: 0 };
                        if ((be(), t !== n)) {
                            if (ht[e]) return;
                            Ot(n, Ot(At(t, i), s)), kt(n.prototype, kt(i, At(t, s))), (ht[(n.prop = e)] = n), t.targetTest && (dt.push(n), (ot[e] = 1)), (e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
                        }
                        st(e, n), t.register && t.register(ar, n, rr);
                    })(t);
                });
            },
            timeline: function (t) {
                return new ze(t);
            },
            getTweensOf: function (t, e) {
                return s.getTweensOf(t, e);
            },
            getProperty: function (t, e, r, n) {
                I(t) && (t = Kt(t)[0]);
                var i = gt(t || {}).get,
                    s = r ? Mt : Pt;
                return (
                    "native" === r && (r = ""),
                    t
                        ? e
                            ? s(((ht[e] && ht[e].get) || i)(t, e, r, n))
                            : function (e, r, n) {
                                    return s(((ht[e] && ht[e].get) || i)(t, e, r, n));
                                }
                        : t
                );
            },
            quickSetter: function (t, e, r) {
                if ((t = Kt(t)).length > 1) {
                    var n = t.map(function (t) {
                            return ar.quickSetter(t, e, r);
                        }),
                        i = n.length;
                    return function (t) {
                        for (var e = i; e--; ) n[e](t);
                    };
                }
                t = t[0] || {};
                var s = ht[e],
                    a = gt(t),
                    o = (a.harness && (a.harness.aliases || {})[e]) || e,
                    u = s
                        ? function (e) {
                                var n = new s();
                                (f._pt = 0), n.init(t, r ? e + r : e, f, 0, [t]), n.render(1, n), f._pt && $e(1, f);
                            }
                        : a.set(t, o);
                return s
                    ? u
                    : function (e) {
                            return u(t, o, r ? e + r : e, a, 1);
                        };
            },
            isTweening: function (t) {
                return s.getTweensOf(t, !0).length > 0;
            },
            defaults: function (t) {
                return t && t.ease && (t.ease = Ce(t.ease, D.ease)), St(D, t || {});
            },
            config: function (t) {
                return St(A, t || {});
            },
            registerEffect: function (t) {
                var e = t.name,
                    r = t.effect,
                    n = t.plugins,
                    i = t.defaults,
                    s = t.extendTimeline;
                (n || "").split(",").forEach(function (t) {
                    return t && !ht[t] && !tt[t] && it(e + " effect requires " + t + " plugin.");
                }),
                    (ft[e] = function (t, e, n) {
                        return r(Kt(t), Ot(e || {}, i), n);
                    }),
                    s &&
                        (ze.prototype[e] = function (t, r, n) {
                            return this.add(ft[e](t, N(r) ? r : (n = r) && {}, this), n);
                        });
            },
            registerEase: function (t, e) {
                xe[t] = Ce(e);
            },
            parseEase: function (t, e) {
                return arguments.length ? Ce(t, e) : xe;
            },
            getById: function (t) {
                return s.getById(t);
            },
            exportRoot: function (t, e) {
                void 0 === t && (t = {});
                var r,
                    n,
                    i = new ze(t);
                for (i.smoothChildTiming = U(t.smoothChildTiming), s.remove(i), i._dp = 0, i._time = i._tTime = s._time, r = s._first; r; )
                    (n = r._next), (!e && !r._dur && r instanceof Ne && r.vars.onComplete === r._targets[0]) || Xt(i, r, r._start - r._delay), (r = n);
                return Xt(s, i, 0), i;
            },
            utils: {
                wrap: function t(e, r, n) {
                    var i = r - e;
                    return V(e)
                        ? se(e, t(0, e.length), r)
                        : Qt(n, function (t) {
                                return ((i + ((t - e) % i)) % i) + e;
                            });
                },
                wrapYoyo: function t(e, r, n) {
                    var i = r - e,
                        s = 2 * i;
                    return V(e)
                        ? se(e, t(0, e.length - 1), r)
                        : Qt(n, function (t) {
                                return e + ((t = (s + ((t - e) % s)) % s || 0) > i ? s - t : t);
                            });
                },
                distribute: ee,
                random: ie,
                snap: ne,
                normalize: function (t, e, r) {
                    return oe(t, e, 0, 1, r);
                },
                getUnit: Zt,
                clamp: function (t, e, r) {
                    return Qt(r, function (r) {
                        return Gt(t, e, r);
                    });
                },
                splitColor: de,
                toArray: Kt,
                mapRange: oe,
                pipe: function () {
                    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                    return function (t) {
                        return e.reduce(function (t, e) {
                            return e(t);
                        }, t);
                    };
                },
                unitize: function (t, e) {
                    return function (r) {
                        return t(parseFloat(r)) + (e || Zt(r));
                    };
                },
                interpolate: function t(e, r, n, i) {
                    var s = isNaN(e + r)
                        ? 0
                        : function (t) {
                                return (1 - t) * e + t * r;
                            };
                    if (!s) {
                        var a,
                            o,
                            u,
                            l,
                            h,
                            f = I(e),
                            c = {};
                        if ((!0 === n && (i = 1) && (n = null), f)) (e = { p: e }), (r = { p: r });
                        else if (V(e) && !V(r)) {
                            for (u = [], l = e.length, h = l - 2, o = 1; o < l; o++) u.push(t(e[o - 1], e[o]));
                            l--,
                                (s = function (t) {
                                    t *= l;
                                    var e = Math.min(h, ~~t);
                                    return u[e](t - e);
                                }),
                                (n = r);
                        } else i || (e = kt(V(e) ? [] : {}, e));
                        if (!u) {
                            for (a in r) Fe.call(c, e, a, "get", r[a]);
                            s = function (t) {
                                return $e(t, c) || (f ? e.p : e);
                            };
                        }
                    }
                    return Qt(n, s);
                },
                shuffle: te,
            },
            install: rt,
            effects: ft,
            ticker: ye,
            updateRoot: ze.updateRoot,
            plugins: ht,
            globalTimeline: s,
            core: { PropTween: rr, globals: st, Tween: Ne, Timeline: ze, Animation: Ee, getCache: gt, _removeLinkedListItem: Rt },
        };
        vt("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
            return (nr[t] = Ne[t]);
        }),
            ye.add(ze.updateRoot),
            (f = nr.to({}, { duration: 0 }));
        var ir = function (t, e) {
                for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; ) r = r._next;
                return r;
            },
            sr = function (t, e) {
                return {
                    name: t,
                    rawVars: 1,
                    init: function (t, r, n) {
                        n._onInit = function (t) {
                            var n, i;
                            if (
                                (I(r) &&
                                    ((n = {}),
                                    vt(r, function (t) {
                                        return (n[t] = 1);
                                    }),
                                    (r = n)),
                                e)
                            ) {
                                for (i in ((n = {}), r)) n[i] = e(r[i]);
                                r = n;
                            }
                            !(function (t, e) {
                                var r,
                                    n,
                                    i,
                                    s = t._targets;
                                for (r in e) for (n = s.length; n--; ) (i = t._ptLookup[n][r]) && (i = i.d) && (i._pt && (i = ir(i, r)), i && i.modifier && i.modifier(e[r], t, s[n], r));
                            })(t, r);
                        };
                    },
                };
            },
            ar =
                nr.registerPlugin(
                    {
                        name: "attr",
                        init: function (t, e, r, n, i) {
                            var s, a;
                            for (s in e) (a = this.add(t, "setAttribute", (t.getAttribute(s) || 0) + "", e[s], n, i, 0, 0, s)) && (a.op = s), this._props.push(s);
                        },
                    },
                    {
                        name: "endArray",
                        init: function (t, e) {
                            for (var r = e.length; r--; ) this.add(t, r, t[r] || 0, e[r]);
                        },
                    },
                    sr("roundProps", re),
                    sr("modifiers"),
                    sr("snap", ne)
                ) || nr;
        (Ne.version = ze.version = ar.version = "3.4.2"), (l = 1), H() && be();
        var or,
            ur,
            lr,
            hr,
            fr,
            cr,
            dr,
            pr,
            _r = xe.Power0,
            gr = xe.Power1,
            mr = xe.Power2,
            vr = xe.Power3,
            yr = xe.Power4,
            br = xe.Linear,
            xr = xe.Quad,
            wr = xe.Cubic,
            Tr = xe.Quart,
            Pr = xe.Quint,
            Mr = xe.Strong,
            Or = xe.Elastic,
            Cr = xe.Back,
            kr = xe.SteppedEase,
            Sr = xe.Bounce,
            Ar = xe.Sine,
            Dr = xe.Expo,
            Rr = xe.Circ,
            Er = {},
            zr = 180 / Math.PI,
            Br = Math.PI / 180,
            Fr = Math.atan2,
            Lr = /([A-Z])/g,
            Ir = /(?:left|right|width|margin|padding|x)/i,
            jr = /[\s,\(]\S/,
            Yr = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" },
            Xr = function (t, e) {
                return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
            },
            Nr = function (t, e) {
                return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
            },
            Ur = function (t, e) {
                return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e);
            },
            Hr = function (t, e) {
                var r = e.s + e.c * t;
                e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
            },
            qr = function (t, e) {
                return e.set(e.t, e.p, t ? e.e : e.b, e);
            },
            Vr = function (t, e) {
                return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
            },
            Wr = function (t, e, r) {
                return (t.style[e] = r);
            },
            Qr = function (t, e, r) {
                return t.style.setProperty(e, r);
            },
            Gr = function (t, e, r) {
                return (t._gsap[e] = r);
            },
            Zr = function (t, e, r) {
                return (t._gsap.scaleX = t._gsap.scaleY = r);
            },
            $r = function (t, e, r, n, i) {
                var s = t._gsap;
                (s.scaleX = s.scaleY = r), s.renderTransform(i, s);
            },
            Jr = function (t, e, r, n, i) {
                var s = t._gsap;
                (s[e] = r), s.renderTransform(i, s);
            },
            Kr = "transform",
            tn = Kr + "Origin",
            en = function (t, e) {
                var r = ur.createElementNS ? ur.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ur.createElement(t);
                return r.style ? r : ur.createElement(t);
            },
            rn = function t(e, r, n) {
                var i = getComputedStyle(e);
                return i[r] || i.getPropertyValue(r.replace(Lr, "-$1").toLowerCase()) || i.getPropertyValue(r) || (!n && t(e, sn(r) || r, 1)) || "";
            },
            nn = "O,Moz,ms,Ms,Webkit".split(","),
            sn = function (t, e, r) {
                var n = (e || fr).style,
                    i = 5;
                if (t in n && !r) return t;
                for (t = t.charAt(0).toUpperCase() + t.substr(1); i-- && !(nn[i] + t in n); );
                return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? nn[i] : "") + t;
            },
            an = function () {
                "undefined" != typeof window &&
                    window.document &&
                    ((or = window),
                    (ur = or.document),
                    (lr = ur.documentElement),
                    (fr = en("div") || { style: {} }),
                    (cr = en("div")),
                    (Kr = sn(Kr)),
                    (tn = Kr + "Origin"),
                    (fr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"),
                    (pr = !!sn("perspective")),
                    (hr = 1));
            },
            on = function t(e) {
                var r,
                    n = en("svg", (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
                    i = this.parentNode,
                    s = this.nextSibling,
                    a = this.style.cssText;
                if ((lr.appendChild(n), n.appendChild(this), (this.style.display = "block"), e))
                    try {
                        (r = this.getBBox()), (this._gsapBBox = this.getBBox), (this.getBBox = t);
                    } catch (t) {}
                else this._gsapBBox && (r = this._gsapBBox());
                return i && (s ? i.insertBefore(this, s) : i.appendChild(this)), lr.removeChild(n), (this.style.cssText = a), r;
            },
            un = function (t, e) {
                for (var r = e.length; r--; ) if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
            },
            ln = function (t) {
                var e;
                try {
                    e = t.getBBox();
                } catch (r) {
                    e = on.call(t, !0);
                }
                return (e && (e.width || e.height)) || t.getBBox === on || (e = on.call(t, !0)), !e || e.width || e.x || e.y ? e : { x: +un(t, ["x", "cx", "x1"]) || 0, y: +un(t, ["y", "cy", "y1"]) || 0, width: 0, height: 0 };
            },
            hn = function (t) {
                return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !ln(t));
            },
            fn = function (t, e) {
                if (e) {
                    var r = t.style;
                    e in Er && e !== tn && (e = Kr), r.removeProperty ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) || (e = "-" + e), r.removeProperty(e.replace(Lr, "-$1").toLowerCase())) : r.removeAttribute(e);
                }
            },
            cn = function (t, e, r, n, i, s) {
                var a = new rr(t._pt, e, r, 0, 1, s ? Vr : qr);
                return (t._pt = a), (a.b = n), (a.e = i), t._props.push(r), a;
            },
            dn = { deg: 1, rad: 1, turn: 1 },
            pn = function t(e, r, n, i) {
                var s,
                    a,
                    o,
                    u,
                    l = parseFloat(n) || 0,
                    h = (n + "").trim().substr((l + "").length) || "px",
                    f = fr.style,
                    c = Ir.test(r),
                    d = "svg" === e.tagName.toLowerCase(),
                    p = (d ? "client" : "offset") + (c ? "Width" : "Height"),
                    _ = "px" === i,
                    g = "%" === i;
                return i === h || !l || dn[i] || dn[h]
                    ? l
                    : ("px" !== h && !_ && (l = t(e, r, n, "px")),
                        (u = e.getCTM && hn(e)),
                        g && (Er[r] || ~r.indexOf("adius"))
                            ? yt((l / (u ? e.getBBox()[c ? "width" : "height"] : e[p])) * 100)
                            : ((f[c ? "width" : "height"] = 100 + (_ ? h : i)),
                            (a = ~r.indexOf("adius") || ("em" === i && e.appendChild && !d) ? e : e.parentNode),
                            u && (a = (e.ownerSVGElement || {}).parentNode),
                            (a && a !== ur && a.appendChild) || (a = ur.body),
                            (o = a._gsap) && g && o.width && c && o.time === ye.time
                                ? yt((l / o.width) * 100)
                                : ((g || "%" === h) && (f.position = rn(e, "position")),
                                    a === e && (f.position = "static"),
                                    a.appendChild(fr),
                                    (s = fr[p]),
                                    a.removeChild(fr),
                                    (f.position = "absolute"),
                                    c && g && (((o = gt(a)).time = ye.time), (o.width = a[p])),
                                    yt(_ ? (s * l) / 100 : s && l ? (100 / s) * l : 0))));
            },
            _n = function (t, e, r, n) {
                var i;
                return (
                    hr || an(),
                    e in Yr && "transform" !== e && ~(e = Yr[e]).indexOf(",") && (e = e.split(",")[0]),
                    Er[e] && "transform" !== e
                        ? ((i = On(t, n)), (i = "transformOrigin" !== e ? i[e] : Cn(rn(t, tn)) + " " + i.zOrigin + "px"))
                        : (!(i = t.style[e]) || "auto" === i || n || ~(i + "").indexOf("calc(")) && (i = (yn[e] && yn[e](t, e, r)) || rn(t, e) || mt(t, e) || ("opacity" === e ? 1 : 0)),
                    r && !~(i + "").indexOf(" ") ? pn(t, e, i, r) + r : i
                );
            },
            gn = function (t, e, r, n) {
                if (!r || "none" === r) {
                    var i = sn(e, t, 1),
                        s = i && rn(t, i, 1);
                    s && s !== r ? ((e = i), (r = s)) : "borderColor" === e && (r = rn(t, "borderTopColor"));
                }
                var a,
                    o,
                    u,
                    l,
                    h,
                    f,
                    c,
                    d,
                    p,
                    _,
                    g,
                    m,
                    v = new rr(this._pt, t.style, e, 0, 1, Ze),
                    y = 0,
                    b = 0;
                if (((v.b = r), (v.e = n), (r += ""), "auto" == (n += "") && ((t.style[e] = n), (n = rn(t, e) || n), (t.style[e] = r)), ve((a = [r, n])), (n = a[1]), (u = (r = a[0]).match(G) || []), (n.match(G) || []).length)) {
                    for (; (o = G.exec(n)); )
                        (c = o[0]),
                            (p = n.substring(y, o.index)),
                            h ? (h = (h + 1) % 5) : ("rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5)) || (h = 1),
                            c !== (f = u[b++] || "") &&
                                ((l = parseFloat(f) || 0),
                                (g = f.substr((l + "").length)),
                                (m = "=" === c.charAt(1) ? +(c.charAt(0) + "1") : 0) && (c = c.substr(2)),
                                (d = parseFloat(c)),
                                (_ = c.substr((d + "").length)),
                                (y = G.lastIndex - _.length),
                                _ || ((_ = _ || A.units[e] || g), y === n.length && ((n += _), (v.e += _))),
                                g !== _ && (l = pn(t, e, f, _) || 0),
                                (v._pt = { _next: v._pt, p: p || 1 === b ? p : ",", s: l, c: m ? m * d : d - l, m: h && h < 4 ? Math.round : 0 }));
                    v.c = y < n.length ? n.substring(y, n.length) : "";
                } else v.r = "display" === e && "none" === n ? Vr : qr;
                return J.test(n) && (v.e = 0), (this._pt = v), v;
            },
            mn = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
            vn = function (t, e) {
                if (e.tween && e.tween._time === e.tween._dur) {
                    var r,
                        n,
                        i,
                        s = e.t,
                        a = s.style,
                        o = e.u,
                        u = s._gsap;
                    if ("all" === o || !0 === o) (a.cssText = ""), (n = 1);
                    else for (i = (o = o.split(",")).length; --i > -1; ) (r = o[i]), Er[r] && ((n = 1), (r = "transformOrigin" === r ? tn : Kr)), fn(s, r);
                    n && (fn(s, Kr), u && (u.svg && s.removeAttribute("transform"), On(s, 1), (u.uncache = 1)));
                }
            },
            yn = {
                clearProps: function (t, e, r, n, i) {
                    if ("isFromStart" !== i.data) {
                        var s = (t._pt = new rr(t._pt, e, r, 0, 0, vn));
                        return (s.u = n), (s.pr = -10), (s.tween = i), t._props.push(r), 1;
                    }
                },
            },
            bn = [1, 0, 0, 1, 0, 0],
            xn = {},
            wn = function (t) {
                return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
            },
            Tn = function (t) {
                var e = rn(t, Kr);
                return wn(e) ? bn : e.substr(7).match(Q).map(yt);
            },
            Pn = function (t, e) {
                var r,
                    n,
                    i,
                    s,
                    a = t._gsap || gt(t),
                    o = t.style,
                    u = Tn(t);
                return a.svg && t.getAttribute("transform")
                    ? "1,0,0,1,0,0" === (u = [(i = t.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f]).join(",")
                        ? bn
                        : u
                    : (u !== bn ||
                            t.offsetParent ||
                            t === lr ||
                            a.svg ||
                            ((i = o.display),
                            (o.display = "block"),
                            ((r = t.parentNode) && t.offsetParent) || ((s = 1), (n = t.nextSibling), lr.appendChild(t)),
                            (u = Tn(t)),
                            i ? (o.display = i) : fn(t, "display"),
                            s && (n ? r.insertBefore(t, n) : r ? r.appendChild(t) : lr.removeChild(t))),
                        e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
            },
            Mn = function (t, e, r, n, i, s) {
                var a,
                    o,
                    u,
                    l = t._gsap,
                    h = i || Pn(t, !0),
                    f = l.xOrigin || 0,
                    c = l.yOrigin || 0,
                    d = l.xOffset || 0,
                    p = l.yOffset || 0,
                    _ = h[0],
                    g = h[1],
                    m = h[2],
                    v = h[3],
                    y = h[4],
                    b = h[5],
                    x = e.split(" "),
                    w = parseFloat(x[0]) || 0,
                    T = parseFloat(x[1]) || 0;
                r
                    ? h !== bn && (o = _ * v - g * m) && ((u = w * (-g / o) + T * (_ / o) - (_ * b - g * y) / o), (w = w * (v / o) + T * (-m / o) + (m * b - v * y) / o), (T = u))
                    : ((w = (a = ln(t)).x + (~x[0].indexOf("%") ? (w / 100) * a.width : w)), (T = a.y + (~(x[1] || x[0]).indexOf("%") ? (T / 100) * a.height : T))),
                    n || (!1 !== n && l.smooth) ? ((y = w - f), (b = T - c), (l.xOffset = d + (y * _ + b * m) - y), (l.yOffset = p + (y * g + b * v) - b)) : (l.xOffset = l.yOffset = 0),
                    (l.xOrigin = w),
                    (l.yOrigin = T),
                    (l.smooth = !!n),
                    (l.origin = e),
                    (l.originIsAbsolute = !!r),
                    (t.style[tn] = "0px 0px"),
                    s && (cn(s, l, "xOrigin", f, w), cn(s, l, "yOrigin", c, T), cn(s, l, "xOffset", d, l.xOffset), cn(s, l, "yOffset", p, l.yOffset)),
                    t.setAttribute("data-svg-origin", w + " " + T);
            },
            On = function (t, e) {
                var r = t._gsap || new Re(t);
                if ("x" in r && !e && !r.uncache) return r;
                var n,
                    i,
                    s,
                    a,
                    o,
                    u,
                    l,
                    h,
                    f,
                    c,
                    d,
                    p,
                    _,
                    g,
                    m,
                    v,
                    y,
                    b,
                    x,
                    w,
                    T,
                    P,
                    M,
                    O,
                    C,
                    k,
                    S,
                    D,
                    R,
                    E,
                    z,
                    B,
                    F = t.style,
                    L = r.scaleX < 0,
                    I = rn(t, tn) || "0";
                return (
                    (n = i = s = u = l = h = f = c = d = 0),
                    (a = o = 1),
                    (r.svg = !(!t.getCTM || !hn(t))),
                    (g = Pn(t, r.svg)),
                    r.svg && ((O = !r.uncache && t.getAttribute("data-svg-origin")), Mn(t, O || I, !!O || r.originIsAbsolute, !1 !== r.smooth, g)),
                    (p = r.xOrigin || 0),
                    (_ = r.yOrigin || 0),
                    g !== bn &&
                        ((b = g[0]),
                        (x = g[1]),
                        (w = g[2]),
                        (T = g[3]),
                        (n = P = g[4]),
                        (i = M = g[5]),
                        6 === g.length
                            ? ((a = Math.sqrt(b * b + x * x)),
                                (o = Math.sqrt(T * T + w * w)),
                                (u = b || x ? Fr(x, b) * zr : 0),
                                (f = w || T ? Fr(w, T) * zr + u : 0) && (o *= Math.cos(f * Br)),
                                r.svg && ((n -= p - (p * b + _ * w)), (i -= _ - (p * x + _ * T))))
                            : ((B = g[6]),
                                (E = g[7]),
                                (S = g[8]),
                                (D = g[9]),
                                (R = g[10]),
                                (z = g[11]),
                                (n = g[12]),
                                (i = g[13]),
                                (s = g[14]),
                                (l = (m = Fr(B, R)) * zr),
                                m &&
                                    ((O = P * (v = Math.cos(-m)) + S * (y = Math.sin(-m))),
                                    (C = M * v + D * y),
                                    (k = B * v + R * y),
                                    (S = P * -y + S * v),
                                    (D = M * -y + D * v),
                                    (R = B * -y + R * v),
                                    (z = E * -y + z * v),
                                    (P = O),
                                    (M = C),
                                    (B = k)),
                                (h = (m = Fr(-w, R)) * zr),
                                m && ((v = Math.cos(-m)), (z = T * (y = Math.sin(-m)) + z * v), (b = O = b * v - S * y), (x = C = x * v - D * y), (w = k = w * v - R * y)),
                                (u = (m = Fr(x, b)) * zr),
                                m && ((O = b * (v = Math.cos(m)) + x * (y = Math.sin(m))), (C = P * v + M * y), (x = x * v - b * y), (M = M * v - P * y), (b = O), (P = C)),
                                l && Math.abs(l) + Math.abs(u) > 359.9 && ((l = u = 0), (h = 180 - h)),
                                (a = yt(Math.sqrt(b * b + x * x + w * w))),
                                (o = yt(Math.sqrt(M * M + B * B))),
                                (m = Fr(P, M)),
                                (f = Math.abs(m) > 2e-4 ? m * zr : 0),
                                (d = z ? 1 / (z < 0 ? -z : z) : 0)),
                        r.svg && ((O = t.getAttribute("transform")), (r.forceCSS = t.setAttribute("transform", "") || !wn(rn(t, Kr))), O && t.setAttribute("transform", O))),
                    Math.abs(f) > 90 && Math.abs(f) < 270 && (L ? ((a *= -1), (f += u <= 0 ? 180 : -180), (u += u <= 0 ? 180 : -180)) : ((o *= -1), (f += f <= 0 ? 180 : -180))),
                    (r.x = ((r.xPercent = n && Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0) ? 0 : n) + "px"),
                    (r.y = ((r.yPercent = i && Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0) ? 0 : i) + "px"),
                    (r.z = s + "px"),
                    (r.scaleX = yt(a)),
                    (r.scaleY = yt(o)),
                    (r.rotation = yt(u) + "deg"),
                    (r.rotationX = yt(l) + "deg"),
                    (r.rotationY = yt(h) + "deg"),
                    (r.skewX = f + "deg"),
                    (r.skewY = c + "deg"),
                    (r.transformPerspective = d + "px"),
                    (r.zOrigin = parseFloat(I.split(" ")[2]) || 0) && (F[tn] = Cn(I)),
                    (r.xOffset = r.yOffset = 0),
                    (r.force3D = A.force3D),
                    (r.renderTransform = r.svg ? Dn : pr ? An : Sn),
                    (r.uncache = 0),
                    r
                );
            },
            Cn = function (t) {
                return (t = t.split(" "))[0] + " " + t[1];
            },
            kn = function (t, e, r) {
                var n = Zt(e);
                return yt(parseFloat(e) + parseFloat(pn(t, "x", r + "px", n))) + n;
            },
            Sn = function (t, e) {
                (e.z = "0px"), (e.rotationY = e.rotationX = "0deg"), (e.force3D = 0), An(t, e);
            },
            An = function (t, e) {
                var r = e || this,
                    n = r.xPercent,
                    i = r.yPercent,
                    s = r.x,
                    a = r.y,
                    o = r.z,
                    u = r.rotation,
                    l = r.rotationY,
                    h = r.rotationX,
                    f = r.skewX,
                    c = r.skewY,
                    d = r.scaleX,
                    p = r.scaleY,
                    _ = r.transformPerspective,
                    g = r.force3D,
                    m = r.target,
                    v = r.zOrigin,
                    y = "",
                    b = ("auto" === g && t && 1 !== t) || !0 === g;
                if (v && ("0deg" !== h || "0deg" !== l)) {
                    var x,
                        w = parseFloat(l) * Br,
                        T = Math.sin(w),
                        P = Math.cos(w);
                    (w = parseFloat(h) * Br), (x = Math.cos(w)), (s = kn(m, s, T * x * -v)), (a = kn(m, a, -Math.sin(w) * -v)), (o = kn(m, o, P * x * -v + v));
                }
                "0px" !== _ && (y += "perspective(" + _ + ") "),
                    (n || i) && (y += "translate(" + n + "%, " + i + "%) "),
                    (b || "0px" !== s || "0px" !== a || "0px" !== o) && (y += "0px" !== o || b ? "translate3d(" + s + ", " + a + ", " + o + ") " : "translate(" + s + ", " + a + ") "),
                    "0deg" !== u && (y += "rotate(" + u + ") "),
                    "0deg" !== l && (y += "rotateY(" + l + ") "),
                    "0deg" !== h && (y += "rotateX(" + h + ") "),
                    ("0deg" === f && "0deg" === c) || (y += "skew(" + f + ", " + c + ") "),
                    (1 === d && 1 === p) || (y += "scale(" + d + ", " + p + ") "),
                    (m.style[Kr] = y || "translate(0, 0)");
            },
            Dn = function (t, e) {
                var r,
                    n,
                    i,
                    s,
                    a,
                    o = e || this,
                    u = o.xPercent,
                    l = o.yPercent,
                    h = o.x,
                    f = o.y,
                    c = o.rotation,
                    d = o.skewX,
                    p = o.skewY,
                    _ = o.scaleX,
                    g = o.scaleY,
                    m = o.target,
                    v = o.xOrigin,
                    y = o.yOrigin,
                    b = o.xOffset,
                    x = o.yOffset,
                    w = o.forceCSS,
                    T = parseFloat(h),
                    P = parseFloat(f);
                (c = parseFloat(c)),
                    (d = parseFloat(d)),
                    (p = parseFloat(p)) && ((d += p = parseFloat(p)), (c += p)),
                    c || d
                        ? ((c *= Br),
                            (d *= Br),
                            (r = Math.cos(c) * _),
                            (n = Math.sin(c) * _),
                            (i = Math.sin(c - d) * -g),
                            (s = Math.cos(c - d) * g),
                            d && ((p *= Br), (a = Math.tan(d - p)), (i *= a = Math.sqrt(1 + a * a)), (s *= a), p && ((a = Math.tan(p)), (r *= a = Math.sqrt(1 + a * a)), (n *= a))),
                            (r = yt(r)),
                            (n = yt(n)),
                            (i = yt(i)),
                            (s = yt(s)))
                        : ((r = _), (s = g), (n = i = 0)),
                    ((T && !~(h + "").indexOf("px")) || (P && !~(f + "").indexOf("px"))) && ((T = pn(m, "x", h, "px")), (P = pn(m, "y", f, "px"))),
                    (v || y || b || x) && ((T = yt(T + v - (v * r + y * i) + b)), (P = yt(P + y - (v * n + y * s) + x))),
                    (u || l) && ((a = m.getBBox()), (T = yt(T + (u / 100) * a.width)), (P = yt(P + (l / 100) * a.height))),
                    (a = "matrix(" + r + "," + n + "," + i + "," + s + "," + T + "," + P + ")"),
                    m.setAttribute("transform", a),
                    w && (m.style[Kr] = a);
            },
            Rn = function (t, e, r, n, i, s) {
                var a,
                    o,
                    u = I(i),
                    l = parseFloat(i) * (u && ~i.indexOf("rad") ? zr : 1),
                    h = s ? l * s : l - n,
                    f = n + h + "deg";
                return (
                    u &&
                        ("short" === (a = i.split("_")[1]) && (h %= 360) != h % 180 && (h += h < 0 ? 360 : -360),
                        "cw" === a && h < 0 ? (h = ((h + 36e9) % 360) - 360 * ~~(h / 360)) : "ccw" === a && h > 0 && (h = ((h - 36e9) % 360) - 360 * ~~(h / 360))),
                    (t._pt = o = new rr(t._pt, e, r, n, h, Nr)),
                    (o.e = f),
                    (o.u = "deg"),
                    t._props.push(r),
                    o
                );
            },
            En = function (t, e, r) {
                var n,
                    i,
                    s,
                    a,
                    o,
                    u,
                    l,
                    h = cr.style,
                    f = r._gsap;
                for (i in ((h.cssText = getComputedStyle(r).cssText + ";position:absolute;display:block;"), (h[Kr] = e), ur.body.appendChild(cr), (n = On(cr, 1)), Er))
                    (s = f[i]) !== (a = n[i]) &&
                        "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 &&
                        ((o = Zt(s) !== (l = Zt(a)) ? pn(r, i, s, l) : parseFloat(s)), (u = parseFloat(a)), (t._pt = new rr(t._pt, f, i, o, u - o, Xr)), (t._pt.u = l || 0), t._props.push(i));
                ur.body.removeChild(cr);
            };
        vt("padding,margin,Width,Radius", function (t, e) {
            var r = "Top",
                n = "Right",
                i = "Bottom",
                s = "Left",
                a = (e < 3 ? [r, n, i, s] : [r + s, r + n, i + n, i + s]).map(function (r) {
                    return e < 2 ? t + r : "border" + r + t;
                });
            yn[e > 1 ? "border" + t : t] = function (t, e, r, n, i) {
                var s, o;
                if (arguments.length < 4)
                    return (
                        (s = a.map(function (e) {
                            return _n(t, e, r);
                        })),
                        5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o
                    );
                (s = (n + "").split(" ")),
                    (o = {}),
                    a.forEach(function (t, e) {
                        return (o[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
                    }),
                    t.init(e, o, i);
            };
        });
        var zn,
            Bn,
            Fn = {
                name: "css",
                register: an,
                targetTest: function (t) {
                    return t.style && t.nodeType;
                },
                init: function (t, e, r, n, i) {
                    var s,
                        a,
                        o,
                        u,
                        l,
                        h,
                        f,
                        c,
                        d,
                        p,
                        _,
                        g,
                        m,
                        v,
                        y,
                        b,
                        x,
                        w,
                        T,
                        P = this._props,
                        M = t.style;
                    for (f in (hr || an(), e))
                        if ("autoRound" !== f && ((a = e[f]), !ht[f] || !Le(f, e, r, n, t, i)))
                            if (((l = typeof a), (h = yn[f]), "function" === l && (l = typeof (a = a.call(r, n, t, i))), "string" === l && ~a.indexOf("random(") && (a = ae(a)), h)) h(this, t, f, a, r) && (y = 1);
                            else if ("--" === f.substr(0, 2)) this.add(M, "setProperty", getComputedStyle(t).getPropertyValue(f) + "", a + "", n, i, 0, 0, f);
                            else {
                                if (
                                    ((s = _n(t, f)),
                                    (u = parseFloat(s)),
                                    (p = "string" === l && "=" === a.charAt(1) ? +(a.charAt(0) + "1") : 0) && (a = a.substr(2)),
                                    (o = parseFloat(a)),
                                    f in Yr &&
                                        ("autoAlpha" === f && (1 === u && "hidden" === _n(t, "visibility") && o && (u = 0), cn(this, M, "visibility", u ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)),
                                        "scale" !== f && "transform" !== f && ~(f = Yr[f]).indexOf(",") && (f = f.split(",")[0])),
                                    (_ = f in Er))
                                )
                                    if ((g || ((m = t._gsap).renderTransform || On(t), (v = !1 !== e.smoothOrigin && m.smooth), ((g = this._pt = new rr(this._pt, M, Kr, 0, 1, m.renderTransform, m, 0, -1)).dep = 1)), "scale" === f))
                                        (this._pt = new rr(this._pt, m, "scaleY", m.scaleY, p ? p * o : o - m.scaleY)), P.push("scaleY", f), (f += "X");
                                    else {
                                        if ("transformOrigin" === f) {
                                            (x = void 0),
                                                (w = void 0),
                                                (T = void 0),
                                                (w = (x = (b = a).split(" "))[0]),
                                                (T = x[1] || "50%"),
                                                ("top" !== w && "bottom" !== w && "left" !== T && "right" !== T) || ((b = w), (w = T), (T = b)),
                                                (x[0] = mn[w] || w),
                                                (x[1] = mn[T] || T),
                                                (a = x.join(" ")),
                                                m.svg ? Mn(t, a, 0, v, 0, this) : ((d = parseFloat(a.split(" ")[2]) || 0) !== m.zOrigin && cn(this, m, "zOrigin", m.zOrigin, d), cn(this, M, f, Cn(s), Cn(a)));
                                            continue;
                                        }
                                        if ("svgOrigin" === f) {
                                            Mn(t, a, 1, v, 0, this);
                                            continue;
                                        }
                                        if (f in xn) {
                                            Rn(this, m, f, u, a, p);
                                            continue;
                                        }
                                        if ("smoothOrigin" === f) {
                                            cn(this, m, "smooth", m.smooth, a);
                                            continue;
                                        }
                                        if ("force3D" === f) {
                                            m[f] = a;
                                            continue;
                                        }
                                        if ("transform" === f) {
                                            En(this, a, t);
                                            continue;
                                        }
                                    }
                                else f in M || (f = sn(f) || f);
                                if (_ || ((o || 0 === o) && (u || 0 === u) && !jr.test(a) && f in M))
                                    o || (o = 0),
                                        (c = (s + "").substr((u + "").length)) !== (d = (a + "").substr((o + "").length) || (f in A.units ? A.units[f] : c)) && (u = pn(t, f, s, d)),
                                        (this._pt = new rr(this._pt, _ ? m : M, f, u, p ? p * o : o - u, "px" !== d || !1 === e.autoRound || _ ? Xr : Hr)),
                                        (this._pt.u = d || 0),
                                        c !== d && ((this._pt.b = s), (this._pt.r = Ur));
                                else if (f in M) gn.call(this, t, f, s, a);
                                else {
                                    if (!(f in t)) {
                                        nt(f, a);
                                        continue;
                                    }
                                    this.add(t, f, t[f], a, n, i);
                                }
                                P.push(f);
                            }
                    y && er(this);
                },
                get: _n,
                aliases: Yr,
                getSetter: function (t, e, r) {
                    var n = Yr[e];
                    return (
                        n && n.indexOf(",") < 0 && (e = n),
                        e in Er && e !== tn && (t._gsap.x || _n(t, "x")) ? (r && dr === r ? ("scale" === e ? Zr : Gr) : (dr = r || {}) && ("scale" === e ? $r : Jr)) : t.style && !X(t.style[e]) ? Wr : ~e.indexOf("-") ? Qr : We(t, e)
                    );
                },
                core: { _removeProperty: fn, _getMatrix: Pn },
            };
        (ar.utils.checkPrefix = sn),
            (Bn = vt("x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + (zn = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function (t) {
                Er[t] = 1;
            })),
            vt(zn, function (t) {
                (A.units[t] = "deg"), (xn[t] = 1);
            }),
            (Yr[Bn[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + zn),
            vt("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function (t) {
                var e = t.split(":");
                Yr[e[1]] = Bn[e[0]];
            }),
            vt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) {
                A.units[t] = "px";
            }),
            ar.registerPlugin(Fn);
        var Ln = ar.registerPlugin(Fn) || ar,
            In = Ln.core.Tween;
    },
]);   
