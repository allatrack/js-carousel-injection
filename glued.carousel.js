/**
 * Author: Jason Farrell
 * Author URI: http://useallfive.com/
 *
 * Description: Checks if a DOM element is truly visible.
 * Package URL: https://github.com/UseAllFive/true-visibility
 */
Element.prototype.isVisible = function() {

    'use strict';

    /**
     * Checks if a DOM element is visible. Takes into
     * consideration its parents and overflow.
     *
     * @param (el)      the DOM element to check if is visible
     *
     * These params are optional that are sent in recursively,
     * you typically won't use these:
     *
     * @param (t)       Top corner position number
     * @param (r)       Right corner position number
     * @param (b)       Bottom corner position number
     * @param (l)       Left corner position number
     * @param (w)       Element width number
     * @param (h)       Element height number
     */
    function _isVisible(el, t, r, b, l, w, h) {
        var p = el.parentNode,
            VISIBLE_PADDING = 2;

        if (!_elementInDocument(el)) {
            return false;
        }

        //-- Return true for document node
        if (9 === p.nodeType) {
            return true;
        }

        //-- Return false if our element is invisible
        if (
            '0' === _getStyle(el, 'opacity') ||
            'none' === _getStyle(el, 'display') ||
            'hidden' === _getStyle(el, 'visibility')
        ) {
            return false;
        }

        if (
            'undefined' === typeof(t) ||
            'undefined' === typeof(r) ||
            'undefined' === typeof(b) ||
            'undefined' === typeof(l) ||
            'undefined' === typeof(w) ||
            'undefined' === typeof(h)
        ) {
            t = el.offsetTop;
            l = el.offsetLeft;
            b = t + el.offsetHeight;
            r = l + el.offsetWidth;
            w = el.offsetWidth;
            h = el.offsetHeight;
        }
        //-- If we have a parent, let's continue:
        if (p) {
            //-- Check if the parent can hide its children.
            if (('hidden' === _getStyle(p, 'overflow') || 'scroll' === _getStyle(p, 'overflow'))) {
                //-- Only check if the offset is different for the parent
                if (
                    //-- If the target element is to the right of the parent elm
                    l + VISIBLE_PADDING > p.offsetWidth + p.scrollLeft ||
                    //-- If the target element is to the left of the parent elm
                    l + w - VISIBLE_PADDING < p.scrollLeft ||
                    //-- If the target element is under the parent elm
                    t + VISIBLE_PADDING > p.offsetHeight + p.scrollTop ||
                    //-- If the target element is above the parent elm
                    t + h - VISIBLE_PADDING < p.scrollTop
                ) {
                    //-- Our target element is out of bounds:
                    return false;
                }
            }
            //-- Add the offset parent's left/top coords to our element's offset:
            if (el.offsetParent === p) {
                l += p.offsetLeft;
                t += p.offsetTop;
            }
            //-- Let's recursively check upwards:
            return _isVisible(p, t, r, b, l, w, h);
        }
        return true;
    }

    //-- Cross browser method to get style properties:
    function _getStyle(el, property) {
        if (window.getComputedStyle) {
            return document.defaultView.getComputedStyle(el, null)[property];
        }
        if (el.currentStyle) {
            return el.currentStyle[property];
        }
    }

    function _elementInDocument(element) {
        while (element = element.parentNode) {
            if (element == document) {
                return true;
            }
        }
        return false;
    }

    return _isVisible(this);

};


// Special dog-nail for IE

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        }
    });
}

/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
! function(a, b, c, d) {
    "use strict";

    function e(a, b, c) { return setTimeout(j(a, c), b) }

    function f(a, b, c) { return Array.isArray(a) ? (g(a, c[b], c), !0) : !1 }

    function g(a, b, c) {
        var e;
        if (a)
            if (a.forEach) a.forEach(b, c);
            else if (a.length !== d)
            for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
        else
            for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
    }

    function h(b, c, d) {
        var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
        return function() {
            var c = new Error("get-stack-trace"),
                d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                f = a.console && (a.console.warn || a.console.log);
            return f && f.call(a.console, e, d), b.apply(this, arguments)
        }
    }

    function i(a, b, c) {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c)
    }

    function j(a, b) { return function() { return a.apply(b, arguments) } }

    function k(a, b) { return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a }

    function l(a, b) { return a === d ? b : a }

    function m(a, b, c) { g(q(b), function(b) { a.addEventListener(b, c, !1) }) }

    function n(a, b, c) { g(q(b), function(b) { a.removeEventListener(b, c, !1) }) }

    function o(a, b) {
        for (; a;) {
            if (a == b) return !0;
            a = a.parentNode
        }
        return !1
    }

    function p(a, b) { return a.indexOf(b) > -1 }

    function q(a) { return a.trim().split(/\s+/g) }

    function r(a, b, c) {
        if (a.indexOf && !c) return a.indexOf(b);
        for (var d = 0; d < a.length;) {
            if (c && a[d][c] == b || !c && a[d] === b) return d;
            d++
        }
        return -1
    }

    function s(a) { return Array.prototype.slice.call(a, 0) }

    function t(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length;) {
            var g = b ? a[f][b] : a[f];
            r(e, g) < 0 && d.push(a[f]), e[f] = g, f++
        }
        return c && (d = b ? d.sort(function(a, c) { return a[b] > c[b] }) : d.sort()), d
    }

    function u(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
            if (c = ma[g], e = c ? c + f : b, e in a) return e;
            g++
        }
        return d
    }

    function v() { return ua++ }

    function w(b) { var c = b.ownerDocument || b; return c.defaultView || c.parentWindow || a }

    function x(a, b) {
        var c = this;
        this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) { k(a.options.enable, [a]) && c.handler(b) }, this.init()
    }

    function y(a) { var b, c = a.options.inputClass; return new(b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z) }

    function z(a, b, c) {
        var d = c.pointers.length,
            e = c.changedPointers.length,
            f = b & Ea && d - e === 0,
            g = b & (Ga | Ha) && d - e === 0;
        c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
    }

    function A(a, b) {
        var c = a.session,
            d = b.pointers,
            e = d.length;
        c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput,
            g = c.firstMultiple,
            h = g ? g.center : f.center,
            i = b.center = E(d);
        b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
        var j = F(b.deltaTime, b.deltaX, b.deltaY);
        b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);
        var k = a.element;
        o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k
    }

    function B(a, b) {
        var c = b.center,
            d = a.offsetDelta || {},
            e = a.prevDelta || {},
            f = a.prevInput || {};
        b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
    }

    function C(a, b) {
        var c, e, f, g, h = a.lastInterval || b,
            i = b.timeStamp - h.timeStamp;
        if (b.eventType != Ha && (i > Da || h.velocity === d)) {
            var j = b.deltaX - h.deltaX,
                k = b.deltaY - h.deltaY,
                l = F(i, j, k);
            e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b
        } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
        b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
    }

    function D(a) { for (var b = [], c = 0; c < a.pointers.length;) b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++; return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY } }

    function E(a) { var b = a.length; if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) }; for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++; return { x: pa(c / b), y: pa(d / b) } }

    function F(a, b, c) { return { x: b / a || 0, y: c / a || 0 } }

    function G(a, b) { return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma }

    function H(a, b, c) {
        c || (c = Qa);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e)
    }

    function I(a, b, c) {
        c || (c = Qa);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI
    }

    function J(a, b) { return I(b[1], b[0], Ra) + I(a[1], a[0], Ra) }

    function K(a, b) { return H(b[0], b[1], Ra) / H(a[0], a[1], Ra) }

    function L() { this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments) }

    function M() { this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [] }

    function N() { this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments) }

    function O(a, b) {
        var c = s(a.touches),
            d = s(a.changedTouches);
        return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d]
    }

    function P() { this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments) }

    function Q(a, b) {
        var c = s(a.touches),
            d = this.targetIds;
        if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
        var e, f, g = s(a.changedTouches),
            h = [],
            i = this.target;
        if (f = c.filter(function(a) { return o(a.target, i) }), b === Ea)
            for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
        for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;
        return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0
    }

    function R() {
        x.apply(this, arguments);
        var a = j(this.handler, this);
        this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = []
    }

    function S(a, b) { a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b) }

    function T(a) {
        var b = a.changedPointers[0];
        if (b.identifier === this.primaryTouch) {
            var c = { x: b.clientX, y: b.clientY };
            this.lastTouches.push(c);
            var d = this.lastTouches,
                e = function() {
                    var a = d.indexOf(c);
                    a > -1 && d.splice(a, 1)
                };
            setTimeout(e, cb)
        }
    }

    function U(a) {
        for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
            var e = this.lastTouches[d],
                f = Math.abs(b - e.x),
                g = Math.abs(c - e.y);
            if (db >= f && db >= g) return !0
        }
        return !1
    }

    function V(a, b) { this.manager = a, this.set(b) }

    function W(a) {
        if (p(a, jb)) return jb;
        var b = p(a, kb),
            c = p(a, lb);
        return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb
    }

    function X() {
        if (!fb) return !1;
        var b = {},
            c = a.CSS && a.CSS.supports;
        return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(d) { b[d] = c ? a.CSS.supports("touch-action", d) : !0 }), b
    }

    function Y(a) { this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [] }

    function Z(a) { return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "" }

    function $(a) { return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "" }

    function _(a, b) { var c = b.manager; return c ? c.get(a) : a }

    function aa() { Y.apply(this, arguments) }

    function ba() { aa.apply(this, arguments), this.pX = null, this.pY = null }

    function ca() { aa.apply(this, arguments) }

    function da() { Y.apply(this, arguments), this._timer = null, this._input = null }

    function ea() { aa.apply(this, arguments) }

    function fa() { aa.apply(this, arguments) }

    function ga() { Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0 }

    function ha(a, b) { return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b) }

    function ia(a, b) {
        this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function(a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
        }, this)
    }

    function ja(a, b) {
        var c = a.element;
        if (c.style) {
            var d;
            g(a.options.cssProps, function(e, f) { d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "" }), b || (a.oldCssProps = {})
        }
    }

    function ka(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
    }
    var la, ma = ["", "webkit", "Moz", "MS", "ms", "o"],
        na = b.createElement("div"),
        oa = "function",
        pa = Math.round,
        qa = Math.abs,
        ra = Date.now;
    la = "function" != typeof Object.assign ? function(a) {
        if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");
        for (var b = Object(a), c = 1; c < arguments.length; c++) {
            var e = arguments[c];
            if (e !== d && null !== e)
                for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f])
        }
        return b
    } : Object.assign;
    var sa = h(function(a, b, c) { for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++; return a }, "extend", "Use `assign`."),
        ta = h(function(a, b) { return sa(a, b, !0) }, "merge", "Use `assign`."),
        ua = 1,
        va = /mobile|tablet|ip(ad|hone|od)|android/i,
        wa = "ontouchstart" in a,
        xa = u(a, "PointerEvent") !== d,
        ya = wa && va.test(navigator.userAgent),
        za = "touch",
        Aa = "pen",
        Ba = "mouse",
        Ca = "kinect",
        Da = 25,
        Ea = 1,
        Fa = 2,
        Ga = 4,
        Ha = 8,
        Ia = 1,
        Ja = 2,
        Ka = 4,
        La = 8,
        Ma = 16,
        Na = Ja | Ka,
        Oa = La | Ma,
        Pa = Na | Oa,
        Qa = ["x", "y"],
        Ra = ["clientX", "clientY"];
    x.prototype = { handler: function() {}, init: function() { this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler) }, destroy: function() { this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler) } };
    var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga },
        Ta = "mousedown",
        Ua = "mousemove mouseup";
    i(L, x, {
        handler: function(a) {
            var b = Sa[a.type];
            b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a }))
        }
    });
    var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha },
        Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca },
        Xa = "pointerdown",
        Ya = "pointermove pointerup pointercancel";
    a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, {
        handler: function(a) {
            var b = this.store,
                c = !1,
                d = a.type.toLowerCase().replace("ms", ""),
                e = Va[d],
                f = Wa[a.pointerType] || a.pointerType,
                g = f == za,
                h = r(b, a.pointerId, "pointerId");
            e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1))
        }
    });
    var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
        $a = "touchstart",
        _a = "touchstart touchmove touchend touchcancel";
    i(N, x, {
        handler: function(a) {
            var b = Za[a.type];
            if (b === Ea && (this.started = !0), this.started) {
                var c = O.call(this, a, b);
                b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a })
            }
        }
    });
    var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
        bb = "touchstart touchmove touchend touchcancel";
    i(P, x, {
        handler: function(a) {
            var b = ab[a.type],
                c = Q.call(this, a, b);
            c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a })
        }
    });
    var cb = 2500,
        db = 25;
    i(R, x, {
        handler: function(a, b, c) {
            var d = c.pointerType == za,
                e = c.pointerType == Ba;
            if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
                if (d) S.call(this, b, c);
                else if (e && U.call(this, c)) return;
                this.callback(a, b, c)
            }
        },
        destroy: function() { this.touch.destroy(), this.mouse.destroy() }
    });
    var eb = u(na.style, "touchAction"),
        fb = eb !== d,
        gb = "compute",
        hb = "auto",
        ib = "manipulation",
        jb = "none",
        kb = "pan-x",
        lb = "pan-y",
        mb = X();
    V.prototype = {
        set: function(a) { a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim() },
        update: function() { this.set(this.manager.options.touchAction) },
        compute: function() { var a = []; return g(this.manager.recognizers, function(b) { k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction())) }), W(a.join(" ")) },
        preventDefaults: function(a) {
            var b = a.srcEvent,
                c = a.offsetDirection;
            if (this.manager.session.prevented) return void b.preventDefault();
            var d = this.actions,
                e = p(d, jb) && !mb[jb],
                f = p(d, lb) && !mb[lb],
                g = p(d, kb) && !mb[kb];
            if (e) {
                var h = 1 === a.pointers.length,
                    i = a.distance < 2,
                    j = a.deltaTime < 250;
                if (h && i && j) return
            }
            return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0
        },
        preventSrc: function(a) { this.manager.session.prevented = !0, a.preventDefault() }
    };
    var nb = 1,
        ob = 2,
        pb = 4,
        qb = 8,
        rb = qb,
        sb = 16,
        tb = 32;
    Y.prototype = {
        defaults: {},
        set: function(a) { return la(this.options, a), this.manager && this.manager.touchAction.update(), this },
        recognizeWith: function(a) { if (f(a, "recognizeWith", this)) return this; var b = this.simultaneous; return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this },
        dropRecognizeWith: function(a) { return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this) },
        requireFailure: function(a) { if (f(a, "requireFailure", this)) return this; var b = this.requireFail; return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this },
        dropRequireFailure: function(a) {
            if (f(a, "dropRequireFailure", this)) return this;
            a = _(a, this);
            var b = r(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1), this
        },
        hasRequireFailures: function() { return this.requireFail.length > 0 },
        canRecognizeWith: function(a) { return !!this.simultaneous[a.id] },
        emit: function(a) {
            function b(b) { c.manager.emit(b, a) }
            var c = this,
                d = this.state;
            qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d))
        },
        tryEmit: function(a) { return this.canEmit() ? this.emit(a) : void(this.state = tb) },
        canEmit: function() {
            for (var a = 0; a < this.requireFail.length;) {
                if (!(this.requireFail[a].state & (tb | nb))) return !1;
                a++
            }
            return !0
        },
        recognize: function(a) { var b = la({}, a); return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void(this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void(this.state = tb)) },
        process: function(a) {},
        getTouchAction: function() {},
        reset: function() {}
    }, i(aa, Y, {
        defaults: { pointers: 1 },
        attrTest: function(a) { var b = this.options.pointers; return 0 === b || a.pointers.length === b },
        process: function(a) {
            var b = this.state,
                c = a.eventType,
                d = b & (ob | pb),
                e = this.attrTest(a);
            return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb
        }
    }), i(ba, aa, {
        defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa },
        getTouchAction: function() {
            var a = this.options.direction,
                b = [];
            return a & Na && b.push(lb), a & Oa && b.push(kb), b
        },
        directionTest: function(a) {
            var b = this.options,
                c = !0,
                d = a.distance,
                e = a.direction,
                f = a.deltaX,
                g = a.deltaY;
            return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
        },
        attrTest: function(a) { return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a)) },
        emit: function(a) {
            this.pX = a.deltaX, this.pY = a.deltaY;
            var b = $(a.direction);
            b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a)
        }
    }), i(ca, aa, {
        defaults: { event: "pinch", threshold: 0, pointers: 2 },
        getTouchAction: function() { return [jb] },
        attrTest: function(a) { return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob) },
        emit: function(a) {
            if (1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";
                a.additionalEvent = this.options.event + b
            }
            this._super.emit.call(this, a)
        }
    }), i(da, Y, {
        defaults: { event: "press", pointers: 1, time: 251, threshold: 9 },
        getTouchAction: function() { return [hb] },
        process: function(a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                f = a.deltaTime > b.time;
            if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();
            else if (a.eventType & Ea) this.reset(), this._timer = e(function() { this.state = rb, this.tryEmit() }, b.time, this);
            else if (a.eventType & Ga) return rb;
            return tb
        },
        reset: function() { clearTimeout(this._timer) },
        emit: function(a) { this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input))) }
    }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function() { return [jb] }, attrTest: function(a) { return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob) } }), i(fa, aa, {
        defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 },
        getTouchAction: function() { return ba.prototype.getTouchAction.call(this) },
        attrTest: function(a) { var b, c = this.options.direction; return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga },
        emit: function(a) {
            var b = $(a.offsetDirection);
            b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
        }
    }), i(ga, Y, {
        defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 },
        getTouchAction: function() { return [ib] },
        process: function(a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                f = a.deltaTime < b.time;
            if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();
            if (d && f && c) {
                if (a.eventType != Ga) return this.failTimeout();
                var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                    h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                var i = this.count % b.taps;
                if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() { this.state = rb, this.tryEmit() }, b.interval, this), ob) : rb
            }
            return tb
        },
        failTimeout: function() { return this._timer = e(function() { this.state = tb }, this.options.interval, this), tb },
        reset: function() { clearTimeout(this._timer) },
        emit: function() { this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input)) }
    }), ha.VERSION = "2.0.8", ha.defaults = {
        domEvents: !1,
        touchAction: gb,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
            [ea, { enable: !1 }],
            [ca, { enable: !1 },
                ["rotate"]
            ],
            [fa, { direction: Na }],
            [ba, { direction: Na },
                ["swipe"]
            ],
            [ga],
            [ga, { event: "doubletap", taps: 2 },
                ["tap"]
            ],
            [da]
        ],
        cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" }
    };
    var ub = 1,
        vb = 2;
    ia.prototype = {
        set: function(a) { return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this },
        stop: function(a) { this.session.stopped = a ? vb : ub },
        recognize: function(a) {
            var b = this.session;
            if (!b.stopped) {
                this.touchAction.preventDefaults(a);
                var c, d = this.recognizers,
                    e = b.curRecognizer;
                (!e || e && e.state & rb) && (e = b.curRecognizer = null);
                for (var f = 0; f < d.length;) c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++
            }
        },
        get: function(a) {
            if (a instanceof Y) return a;
            for (var b = this.recognizers, c = 0; c < b.length; c++)
                if (b[c].options.event == a) return b[c];
            return null
        },
        add: function(a) { if (f(a, "add", this)) return this; var b = this.get(a.options.event); return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a },
        remove: function(a) {
            if (f(a, "remove", this)) return this;
            if (a = this.get(a)) {
                var b = this.recognizers,
                    c = r(b, a); - 1 !== c && (b.splice(c, 1), this.touchAction.update())
            }
            return this
        },
        on: function(a, b) { if (a !== d && b !== d) { var c = this.handlers; return g(q(a), function(a) { c[a] = c[a] || [], c[a].push(b) }), this } },
        off: function(a, b) { if (a !== d) { var c = this.handlers; return g(q(a), function(a) { b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a] }), this } },
        emit: function(a, b) { this.options.domEvents && ka(a, b); var c = this.handlers[a] && this.handlers[a].slice(); if (c && c.length) { b.type = a, b.preventDefault = function() { b.srcEvent.preventDefault() }; for (var d = 0; d < c.length;) c[d](b), d++ } },
        destroy: function() { this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null }
    }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u });
    var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
    wb.Hammer = ha, "function" == typeof define && define.amd ? define(function() { return ha }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha
}(window, document, "Hammer");
//# sourceMappingURL=hammer.min.js.map

! function() {
    var a = window.MutationObserver || window.WebKitMutationObserver,
        b = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        c = void 0 !== document.documentElement.style["touch-action"] || document.documentElement.style["-ms-touch-action"];
    if (!c && b && a) {
        window.Hammer = window.Hammer || {};
        var d = /touch-action[:][\s]*(none)[^;'"]*/,
            e = /touch-action[:][\s]*(manipulation)[^;'"]*/,
            f = /touch-action/,
            g = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1,
            h = function() { try { var a = document.createElement("canvas"); return !(!window.WebGLRenderingContext || !a.getContext("webgl") && !a.getContext("experimental-webgl")) } catch (b) { return !1 } }(),
            i = h && g;
        window.Hammer.time = {
            getTouchAction: function(a) { return this.checkStyleString(a.getAttribute("style")) },
            checkStyleString: function(a) { return f.test(a) ? d.test(a) ? "none" : e.test(a) ? "manipulation" : !0 : void 0 },
            shouldHammer: function(a) { var b = this.hasParent(a.target); return b && (!i || Date.now() - a.target.lastStart < 125) ? b : !1 },
            touchHandler: function(a) {
                var b = a.target.getBoundingClientRect(),
                    c = b.top !== this.pos.top || b.left !== this.pos.left,
                    d = this.shouldHammer(a);
                ("none" === d || c === !1 && "manipulation" === d) && ("touchend" === a.type && (a.target.focus(), setTimeout(function() { a.target.click() }, 0)), a.preventDefault()), this.scrolled = !1, delete a.target.lastStart
            },
            touchStart: function(a) { this.pos = a.target.getBoundingClientRect(), i && this.hasParent(a.target) && (a.target.lastStart = Date.now()) },
            styleWatcher: function(a) { a.forEach(this.styleUpdater, this) },
            styleUpdater: function(a) { if (a.target.updateNext) return void(a.target.updateNext = !1); var b = this.getTouchAction(a.target); return b ? void("none" !== b && (a.target.hadTouchNone = !1)) : void(!b && (a.oldValue && this.checkStyleString(a.oldValue) || a.target.hadTouchNone) && (a.target.hadTouchNone = !0, a.target.updateNext = !1, a.target.setAttribute("style", a.target.getAttribute("style") + " touch-action: none;"))) },
            hasParent: function(a) {
                for (var b, c = a; c && c.parentNode; c = c.parentNode)
                    if (b = this.getTouchAction(c)) return b;
                return !1
            },
            installStartEvents: function() { document.addEventListener("touchstart", this.touchStart.bind(this)), document.addEventListener("mousedown", this.touchStart.bind(this)) },
            installEndEvents: function() { document.addEventListener("touchend", this.touchHandler.bind(this), !0), document.addEventListener("mouseup", this.touchHandler.bind(this), !0) },
            installObserver: function() { this.observer = new a(this.styleWatcher.bind(this)).observe(document, { subtree: !0, attributes: !0, attributeOldValue: !0, attributeFilter: ["style"] }) },
            install: function() { this.installEndEvents(), this.installStartEvents(), this.installObserver() }
        }, window.Hammer.time.install()
    }
}();

function MGCarousel() {

    this.rootId = '';
    this.mgboxWidth = 0;
    this.currentFirstVisibleIndex = 0;
    this.currentLastVisibleIndex = 0;
    this.currentCarouselShift = 0;
    this.lastSlidePartialVisible = true;
    this.firstSlidePartialVisible = false;
    this.slides = [];
    this.mgslider = null;
    this.mgsliderPrev = null;
    this.mgsliderNext = null;

    this.transitionalMoving = false;
    this.movingSide = 'none';

    this.mouseXCoord = 0;

    Object.defineProperties(this, {
        "lastVisibleSlide": {
            "get": function() { return this.slides[this.currentLastVisibleIndex]; }
        },
        "firstVisibleSlide": {
            "get": function() { return this.slides[this.currentFirstVisibleIndex]; }
        }
    });

    function closest(el, selector) {
        var matchesFn;

        // find vendor prefix
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        })

        var parent;

        // traverse parents
        while (el) {
            parent = el.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }

        return null;
    }

    function ismobile() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    this.init = function(rootId, preloadID) {
        this.rootId = rootId;

        var styles = '#MarketGidComposite' + this.rootId + '{display:block}#MarketGidComposite' + this.rootId + ' .mgbox{height:430px;line-height:100%;margin:0 auto;position:relative;overflow:hidden;vertical-align:top;text-align:center;padding:0;border:1px solid #bfbfbf}#MarketGidComposite' + this.rootId + ' .mgheader{width:100%;display:block}#MarketGidComposite' + this.rootId + ' .mghead{color:#2f3b82;font:normal 700 12px "Open sans",sans-serif;text-transform:uppercase;text-align:left;display:block;margin:8px 0 0 15px;float:left}#MarketGidComposite' + this.rootId + ' .mg_addad' + this.rootId + '{text-align:right;opacity:.5;margin:6px 15px 0 0;float:right}#MarketGidComposite' + this.rootId + ' .mg_addad' + this.rootId + ':hover{opacity:.8}#MarketGidComposite' + this.rootId + ' .mg_addad' + this.rootId + ' a{color:#000;font:normal normal normal 8px "Open sans",sans-serif;cursor: pointer;text-decoration:none}#MarketGidComposite' + this.rootId + ' .mg_addad' + this.rootId + ' a img{display:inline-block;height: 16px;padding-bottom:0;width:auto;border:none;margin:0 -5px -4px 0}#MarketGidComposite' + this.rootId + ' .mgslider{width:10000px;position:absolute;left:0;padding-left:0;-webkit-transition:top 1s ease-out .5s;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out}#MarketGidComposite' + this.rootId + ' .mgline{float:left;display:block;border:1px solid #bfbfbf;margin:10px 5px;padding:0;opacity:1}#MarketGidComposite' + this.rootId + ' .image-with-text{display:block;width:100%;min-height:1px;margin:0 auto}#MarketGidComposite' + this.rootId + ' .mcimg{width:100%;height:auto;display:block}#MarketGidComposite' + this.rootId + ' .mcimg .image-container{width:auto;margin:0 auto}#MarketGidComposite' + this.rootId + ' .text-elements{display:block}#MarketGidComposite' + this.rootId + ' .text-elements .mctitle{margin:5px 15px 0 10px;display:block;height:50px;overflow:hidden;text-align:left}#MarketGidComposite' + this.rootId + ' .text-elements .mctitle a{text-decoration:none;color:#4f81bd;font:normal 700 11px/110% "Open sans",sans-serif}#MarketGidComposite' + this.rootId + ' .text-elements .fake{display:block;visibility:hidden;height:2px}#MarketGidComposite' + this.rootId + ' .text-elements .fake .mcdomain{display:block;overflow:hidden;padding:0 4px 4px;text-align:left}#MarketGidComposite' + this.rootId + ' .text-elements .fake .mcdomain a{padding:0 0 2px 6px;color:#bbb;text-decoration:none;font:normal normal 10px/10px "Open sans",sans-serif}#MarketGidComposite' + this.rootId + ' .text-elements .mgtobottom{display:block;width:100%;margin:0 auto;text-align:left}#MarketGidComposite' + this.rootId + ' .text-elements .mgtobottom .mcdomain{display:block;overflow:hidden;padding:0 4px 4px;text-align:left}#MarketGidComposite' + this.rootId + ' .text-elements .mgtobottom .mcdomain a{padding:0 0 2px 6px;color:#bbb;text-decoration:none;font:normal normal 10px/10px "Open sans",sans-serif}#MarketGidComposite' + this.rootId + ' .mgslider-next,#MarketGidComposite' + this.rootId + ' .mgslider-prev{display:block;cursor:pointer;position:absolute;top:45%;width:40px;height:40px;background-color:#fff;border-top:1px solid #bfbfbf;border-bottom:1px solid #bfbfbf;-webkit-transition:top 1s ease-out .5s;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out}#MarketGidComposite' + this.rootId + ' .mgslider-next img,#MarketGidComposite' + this.rootId + ' .mgslider-prev img{width:20px;height:40px}#MarketGidComposite' + this.rootId + ' .mgslider-next:hover,#MarketGidComposite' + this.rootId + ' .mgslider-prev:hover{opacity:.8}#MarketGidComposite' + this.rootId + ' .mgslider-next{right:0;border-left: 1px solid #bfbfbf}#MarketGidComposite' + this.rootId + ' .mgslider-prev{border-right: 1px solid #bfbfbf}';

        document.getElementById(preloadID).style = "display: none;";
        document.getElementById(preloadID).innerHTML = '';

        // Build Carousel
        var mgbox = document.querySelector("#MarketGidComposite" + this.rootId + " .mgbox");
        var mgsliderBox = document.createElement('div');
        mgsliderBox.className = "mgslider-box";

        this.mgslider = document.createElement('div');
        this.slides = document.querySelectorAll("#MarketGidComposite" + this.rootId + " .mgline");
        this.mgslider.className = "mgslider";

        this.mgsliderPrev = document.createElement('div');
        this.mgsliderPrev.className = "mgslider-prev";
        this.mgsliderPrev.style.display = 'none';
        this.mgsliderPrev.innerHTML = '<img src="img/scroll-arrow-to-left.svg">';

        this.mgsliderNext = document.createElement('div');
        this.mgsliderNext.className = "mgslider-next";
        this.mgsliderNext.style.display = 'block';
        this.mgsliderNext.innerHTML = '<img src="img/scroll-arrow-to-right.svg">';

        mgbox.appendChild(mgsliderBox);
        mgsliderBox.appendChild(this.mgslider);
        mgsliderBox.appendChild(this.mgsliderPrev);
        mgsliderBox.appendChild(this.mgsliderNext);

        var that = this;

        [].forEach.call(this.slides, function(slide) {
            that.mgslider.appendChild(slide);
        });

        document.querySelector("style.MarketGidC" + this.rootId).innerHTML = styles;

        this.mgboxWidth = document.getElementById("MarketGidComposite" + this.rootId).clientWidth - 2; // Borders

        // Events
        this.mgsliderPrev.addEventListener('click', function() { that.move('right') });
        this.mgsliderNext.addEventListener('click', function() { that.move('left') });

        // Dirty parent hover on arrows
        this.mgsliderNext.addEventListener('mouseover', function() {
            if (that.lastVisibleSlide.getAttribute('data-opacity') < 1) {
                that.lastVisibleSlide.style.opacity = '0.6';
            }
        });

        this.mgsliderPrev.addEventListener('mouseover', function() {
            if (that.firstVisibleSlide.getAttribute('data-opacity') < 1) {
                that.firstVisibleSlide.style.opacity = '0.6';
            }
        });

        this.mgsliderNext.addEventListener('mouseout', function() {
            that.lastVisibleSlide.style.opacity = '1';
        });


        this.mgsliderPrev.addEventListener('mouseout', function() {
            that.firstVisibleSlide.style.opacity = '1';
        });

        // Mobile
        var hammerOn = new Hammer(this.mgslider);
        hammerOn.on('swipeleft', function() { that.move('left') });
        hammerOn.on('swiperight', function() { that.move('right') });

        // Listeners when moving is done
        ['webkitTransitionEnd', 'oTransitionEnd', 'transitionend', 'msTransitionEnd'].forEach(function(event) { // vendor events
            that.mgslider.addEventListener(event, function() {
                that.decorateSlider();
            }, false);
        });

        // Listeners and hover for images
        for (var i = 0; i < this.slides.length; i++) {
            (function(i) {
                that.slides[i].addEventListener('click', function() {
                    if (that.slides[i].getAttribute('data-opacity') < 1) {
                        that.move((that.slides[i].offsetLeft + that.currentCarouselShift < 10) ? 'right' : 'left');
                    }
                });

                that.slides[i].addEventListener('mouseover', function(e) {
                    if ((that.slides[i].getAttribute('data-opacity') < 1) && (!that.transitionalMoving)) {
                        that.slides[i].style.opacity = '0.6';
                    }
                });

                that.slides[i].addEventListener('mousemove', function(e) {
                    that.mouseXCoord = e.clientX;
                });

                that.slides[i].addEventListener('mouseout', function() {
                    that.slides[i].style.opacity = '1';
                });
            })(i)
        }

        // Prevent links
        [].forEach.call(document.querySelectorAll(".mgline a"), function(a) {
            a.addEventListener('click', function(event) {
                var clickedSlide = closest(a, '.mgline');

                if ((clickedSlide.getAttribute('data-clickable') == false) || (clickedSlide.getAttribute('data-opacity') < 1)) {
                    event.preventDefault();
                    return false;
                }
            });
        });
    }

    this.calculateHeight = function() {
        //Get current width and height of the first image
        var width = document.getElementById("MarketGidComposite" + this.rootId).clientWidth;
        var imageWidth = 300;
        var fullImageCount = 1;
        while (imageWidth > 230) {
            imageWidth = width / (fullImageCount + 0.6) - 12; //Borders and Margins
            fullImageCount += 1;
        }

        // Apply image width
        [].forEach.call(this.slides, function(slide) {
            slide.style.width = imageWidth + "px";
        });

        document.querySelector('#MarketGidComposite' + this.rootId + ' .mgbox').style.height = (imageWidth + 110) + "px";
    }

    this.decorateSlider = function() {
        this.currentFirstVisibleIndex = null;
        this.currentLastVisibleIndex = 0;

        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].setAttribute('data-opacity', '1');
            if (this.slides[i].isVisible()) {
                this.slides[i].setAttribute('data-clickable', 1);
                if (this.currentFirstVisibleIndex === null) {
                    this.currentFirstVisibleIndex = i;
                }
                this.currentLastVisibleIndex = i;
            } else {
                this.slides[i].setAttribute('data-clickable', 0);
            }
        };

        var lastSlideRightBorder = this.lastVisibleSlide.offsetLeft + this.lastVisibleSlide.clientWidth + this.currentCarouselShift;

        this.lastSlidePartialVisible = lastSlideRightBorder > this.mgboxWidth;
        this.firstSlidePartialVisible = this.firstVisibleSlide.offsetLeft + this.currentCarouselShift < 0;

        // Very "left" position of the carousel
        if ((!this.firstSlidePartialVisible) && (this.currentFirstVisibleIndex < 1)) {
            this.mgsliderPrev.style.display = 'none';
        } else {
            this.firstVisibleSlide.setAttribute('data-opacity', '0.6');
            this.mgsliderPrev.style.display = 'block';
            var mousePosition = this.mouseXCoord - this.firstVisibleSlide.offsetLeft - this.currentCarouselShift;
            if ((this.movingSide == 'right') && (!ismobile()) &&
                (mousePosition < this.firstVisibleSlide.clientWidth)) {
                this.firstVisibleSlide.style.opacity = '0.6';
            }
        }

        // Very "right" position of the carousel
        if ((!this.lastSlidePartialVisible) && (this.currentLastVisibleIndex > this.slides.length - 2)) {
            this.mgsliderNext.style.display = 'none';
        } else {
            this.lastVisibleSlide.setAttribute('data-opacity', '0.6');
            this.mgsliderNext.style.display = 'block';
            var mousePosition = this.mouseXCoord - this.lastVisibleSlide.offsetLeft - this.currentCarouselShift;
            if ((this.movingSide == 'left') && (!ismobile()) && (mousePosition > 0)) {
                this.lastVisibleSlide.style.opacity = '0.6';
            }
        }

        this.transitionalMoving = false;
    }

    this.move = function(side) {
        if (this.transitionalMoving) {
            return;
        }

        [].forEach.call(this.slides, function(slide) {
            slide.style.opacity = '1';
            slide.setAttribute('data-opacity', '1');
        });

        if (side == 'left') {
            // Prevent redundant move
            if ((!this.lastSlidePartialVisible) && (this.currentLastVisibleIndex > this.slides.length - 2)) {
                return;
            }

            var lastSlideRelativeShift = this.mgboxWidth - this.slides[this.slides.length - 1].offsetLeft - this.slides[this.slides.length - 1].clientWidth - 6; // Margin + Border

            if ((!this.firstSlidePartialVisible) && (this.currentFirstVisibleIndex < 1)) {
                this.currentCarouselShift -= 0.7 * (this.slides[this.currentLastVisibleIndex - 1].clientWidth + 2 + 10);
            } else if (this.currentLastVisibleIndex > this.slides.length - 2) { // Most "right" position of the carousel
                this.currentCarouselShift = lastSlideRelativeShift;
            } else {
                this.currentCarouselShift -= this.slides[this.currentLastVisibleIndex - 1].clientWidth + 2 + 10; // Margins + Borders
            }

            // Prevent white space moving
            if (this.currentCarouselShift < lastSlideRelativeShift) {
                this.currentCarouselShift = lastSlideRelativeShift;
            }

            this.movingSide = 'left';
        } else if (side == 'right') {
            // Prevent redundant move
            if ((!this.firstSlidePartialVisible) && (this.currentFirstVisibleIndex < 1)) {
                return;
            }

            // Most "left" position of the carousel
            if ((this.firstSlidePartialVisible) && (this.currentFirstVisibleIndex < 1)) {
                this.currentCarouselShift = 0;
                // Very "right" position of the carousel
            } else if ((!this.lastSlidePartialVisible) && (this.currentLastVisibleIndex > this.slides.length - 2)) {
                this.currentCarouselShift += 0.7 * (this.slides[this.currentLastVisibleIndex - 1].clientWidth + 2 + 10);
            } else {
                this.currentCarouselShift += this.slides[this.currentLastVisibleIndex - 1].clientWidth + 2 + 10; // Margins + Borders
            }

            this.movingSide = 'right';
        }

        this.transitionalMoving = true;
        this.mgslider.style.left = this.currentCarouselShift + 'px';
    }
}