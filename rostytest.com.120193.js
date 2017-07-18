/*marketgid.comV3*/

if (!this.MarketGidJSON) {
    MarketGidJSON = function() {
        function f(n) { return n < 10 ? '0' + n : n; }
        Date.prototype.toJSON = function() {
            return this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z';
        };
        var m = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };

        function stringify(value, whitelist) {
            var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g,
                v;
            switch (typeof value) {
                case 'string':
                    return r.test(value) ? '"' + value.replace(r, function(a) {
                        var c = m[a];
                        if (c) { return c; }
                        c = a.charCodeAt();
                        return '\\u00' + Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    }) + '"' : '"' + value + '"';
                case 'number':
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                case 'null':
                    return String(value);
                case 'object':
                    if (!value) { return 'null'; }
                    if (typeof value.toJSON === 'function') { return stringify(value.toJSON()); }
                    a = [];
                    if (typeof value.length === 'number' && !(value.propertyIsEnumerable('length'))) {
                        l = value.length;
                        for (i = 0; i < l; i += 1) { a.push(stringify(value[i], whitelist) || 'null'); }
                        return '[' + a.join(',') + ']';
                    }
                    if (whitelist) { l = whitelist.length; for (i = 0; i < l; i += 1) { k = whitelist[i]; if (typeof k === 'string') { v = stringify(value[k], whitelist); if (v) { a.push(stringify(k) + ':' + v); } } } } else { for (k in value) { if (typeof k === 'string') { v = stringify(value[k], whitelist); if (v) { a.push(stringify(k) + ':' + v); } } } }
                    return '{' + a.join(',') + '}';
            }
        }
        return {
            stringify: stringify,
            parse: function(text, filter) {
                var j;

                function walk(k, v) {
                    var i, n;
                    if (v && typeof v === 'object') { for (i in v) { if (Object.prototype.hasOwnProperty.apply(v, [i])) { n = walk(i, v[i]); if (n !== undefined) { v[i] = n; } } } }
                    return filter(k, v);
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof filter === 'function' ? walk('', j) : j; }
                throw new SyntaxError('parseJSON');
            }
        };
    }();
}

MarketGidBaseBlockC120193 = function(root_id, context, fallback, containerId) {
    var self = this;

    this.context = context;
    this.root = this.context.document.getElementById(root_id);
    this.containerId = containerId;
    this.fallbackMode = fallback;
    this.page = 1;
    this.iteration = 1;
    this.adlink = '';
    this.template = '';
    this.id = 120193;
    this.tickerShow = 0;
    this.linkerLinks = [];
    this.cookieStorage = {};
    this.sharedCookieStorage = {};
    this.beforeLoadNewsHooks = [];
    this.afterLoadNewsHooks = [];
    this.afterInitHooks = [];
    this.blocksAddress = "";
    this.tickerPrefix = "";
    this.countLoadBlocks = 0;
    this.blockIds = {};
    this.preTemplate = "";
    this.postTemplate = "";
    this.crashStep = 0;
    this.loadedDefault = false;
    this.teaserHashes = {};
    this.teaserData = {};
    this.json = [];
    this.servicerData = {};

    this.fakeMode = 0;

    this.requestParams = {};

    this.servicerDomain = "mgid.com";
    self.templateText = '<div class="mgbox">            <!--advertPrefix-->    {foreach}    {if this.iteration != 1}</div>{/if}<div class="mgline">                <div class="image-with-text">                        <div class="mcimg">                <a {$target} {$href} >                    <div class="image-container">                        <img class="mcimg" {$src} />                                                    <!--intExchangeWagesImagePlace-->                                            </div>                </a>            </div>                            <div class="text-elements">    <div class="text_on_hover">        <div class="mctitle"><a {$target} {$href}>{$title}</a></div>                <div class="fake">                                        <div class="mcdomain"><a {$target} {$href}>{$source}</a></div>                    </div>        <div class="mgtobottom">                                        <div class="mcdomain"><a {$target} {$href}><!--intExhangeWagesSourcePlace-->{$source}</a></div>                    </div>    </div></div>                    </div>    {/foreach}    </div></div>';
    self.styles = '/* cyrillic-ext */ @font-face { font-family: \'Open Sans\'; font-style: normal; font-weight: 400; src: local(\'Open Sans\'), local(\'OpenSans\'), url(//fonts.gstatic.com/s/opensans/v10/K88pR3goAWT7BTt32Z01m1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\'); unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F; } /* cyrillic */ @font-face { font-family: \'Open Sans\'; font-style: normal; font-weight: 400; src: local(\'Open Sans\'), local(\'OpenSans\'), url(//fonts.gstatic.com/s/opensans/v10/RjgO7rYTmqiVp7vzi-Q5UVtXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; } /* latin-ext */ @font-face { font-family: \'Open Sans\'; font-style: normal; font-weight: 400; src: local(\'Open Sans\'), local(\'OpenSans\'), url(//fonts.gstatic.com/s/opensans/v10/u-WUoqrET9fUeobQW7jkRVtXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\'); unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF; } /* latin */ @font-face { font-family: \'Open Sans\'; font-style: normal; font-weight: 400; src: local(\'Open Sans\'), local(\'OpenSans\'), url(//fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3VtXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000; } /* cyrillic-ext */ @font-face { font-family: \'Open Sans\'; font-style: normal; font-weight: 700; src: local(\'Open Sans Bold\'), local(\'OpenSans-Bold\'), url(//fonts.gstatic.com/s/opensans/v10/k3k702ZOKiLJc3WVjuplzCUUniRZcd_wq8DYmIfsw2A.woff2) format(\'woff2\'); unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F; } /* cyrillic */ @font-face { font-family: \'Open Sans\'; font-style: normal; font-weight: 700; src: local(\'Open Sans Bold\'), local(\'OpenSans-Bold\'), url(//fonts.gstatic.com/s/opensans/v10/k3k702ZOKiLJc3WVjuplzOXREeHhJi4GEUJI9ob_ak4.woff2) format(\'woff2\'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; } /* latin-ext */ @font-face { font-family: \'Open Sans\'; font-style: normal; font-weight: 700; src: local(\'Open Sans Bold\'), local(\'OpenSans-Bold\'), url(//fonts.gstatic.com/s/opensans/v10/k3k702ZOKiLJc3WVjuplzBUOjZSKWg4xBWp_C_qQx0o.woff2) format(\'woff2\'); unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF; } /* latin */ @font-face { font-family: \'Open Sans\'; font-style: normal; font-weight: 700; src: local(\'Open Sans Bold\'), local(\'OpenSans-Bold\'), url(//fonts.gstatic.com/s/opensans/v10/k3k702ZOKiLJc3WVjuplzOgdm0LZdjqr5-oayXSOefg.woff2) format(\'woff2\'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000; } .mgresponsive { display: inherit; } .mgbox { padding: 0 !important; position: relative !important; text-align: center; vertical-align: top !important; margin: 0 auto; border-style: solid; border-width: 0px; border-color: ; background-color: ; display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; line-height: 100% !important; transition: none !important; } .mgbox { width: 2000px; max-width: 2000px; } div.mcimg { padding: 0px; text-align: center; } img.mcimg { border-style: solid; border-color: #ffffff; border-width: 0px; width: 100% !important; height: auto !important; max-width: 328px; max-height: 328px; box-sizing: border-box; display: block; } .mctitle { margin-top: 10px; text-align: left; } .mctitle a { font-weight: bold; font-size: 13px; line-height: 13px; font-style: normal; text-decoration: none; color: #4f81bd; font-family: \'Open Sans\', sans-serif; } .mcdesc { display: none; text-align: center; } .mcdesc a { font-weight: normal; font-size: 12px; line-height: 12px; font-style: normal; text-decoration: none; color: #666666; font-family: \'Open Sans\', sans-serif; } .mcdomain { display: block; text-align: center; } .mcdomain a { font-weight: normal; font-size: 10px; line-height: 10px; font-style: normal; text-decoration: none; color: #bbbbbb; font-family: \'Open Sans\', sans-serif; padding: 4px; display: block; overflow: hidden; } .mcdomain a img.mcimgsrc { vertical-align: bottom; margin-bottom: -3px; } .mgline { background: none repeat scroll 0 0; background-color: ; cursor: pointer; display: inline-block; _overflow: hidden; *zoom: 1; *display: inline; padding: 0 !important; border-style: solid; border-color: #bfbfbf; border-width: 1px; width: 10.51111111%; max-width: 10.51111111%; box-sizing: border-box; margin: 10px 0.3%; display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; word-wrap: break-word; } .mgline .image-container { position: relative; } .mgline .image-container .mcimgad { position: absolute; right: 0; bottom: 0; } .mgline { vertical-align: top; } .mgline, .mgbox { min-width: 90px; } .mgline[max-width~="120px"] .mcdesc { display: none !important; } @supports not (flex-wrap: wrap) { .mgbox { display: block !important; } .mgline { display: inline-block !important; } } .text-elements a { text-decoration: none; } div.mcprice { text-align: center; } div.mcprice span { font-weight: bold; font-size: 12px; line-height: 12px; font-style: normal; text-decoration: none; color: #ffffff; font-family: \'Open Sans\', sans-serif; } div.mgbuybox, div.mgarrowbox { display: false; } div.mgbuybox, div.mgarrowbox, div.mcprice { display: none; } span.mcpriceold { text-decoration: line-through !important; } .mgpopular { background-color: rgba(255, 0, 0, 0.2) !important; border-color: rgba(255, 90, 0, 0.3) !important; } img.mcimg { margin: 0; opacity: 1 !important; } .mgline { position: relative; } .mgline .fake { visibility: hidden; position: relative; padding-top: 4px; } .mgline:hover .mctitle a { color: #00bfff; text-decoration: underline !important; } .mgline:hover .mcpriceold + .mcprice, .mgline:hover .mcpriceold { visibility: hidden; } .mgline:hover .mcdiscount { display: block; position: absolute; left: 0px; right: 0px; top: 5px; } .mgarrowbox { position: relative; background: #00bfff; width: 55%; height: 22px; margin: 0px; border-color: transparent; border-left-color: #00bfff; display: inline-block; font-family: \'Open Sans\', sans-serif; } .mgarrowbox:after { left: 100%; top: 50%; content: " "; height: 0px; width: 0px; position: absolute; pointer-events: none; margin-top: -11px; border: solid 11px; border-color: inherit; } .mgbuybox { width: 40%; display: inline-block; text-align: right; font-weight: bold; font-family: \'Open Sans\', sans-serif; font-size: 12px; color: #666666; text-decoration: underline; } .mctitle { margin-top: 2px; line-height: 1 !important; } .mctitle a { line-height: 110% !important; } .mcdesc { margin-top: 0; margin-bottom: 2px; } .mcdesc a { line-height: 1.5 !important; } div.mcprice { margin-top: 5px; line-height: 12 px !important; } div.mgbuybox, div.mgarrowbox { display: none; } .mgtobottom { position: absolute; bottom: 0px; width: 100%; text-align: left; } .mgline .image-with-text, .mgline .mgtobottom { width: 100% !important; margin: 0 auto; } .mgline .image-with-text, .mgline .mgtobottom { max-width: 328px; } .mghead { color: #00bfff !important; } .mcpriceold { float: left; padding-left: 5px; } .mcdiscount { display: none; } .mcdomain { display: block; overflow: hidden; padding: 4px; } .mcdomain a { padding: 0px; display: block; padding-top: 5px; padding-bottom: 2px; overflow: hidden; } div.mcprice, div.mcriceold { font-weight: bold; font-size: 12px; line-height: 12px; font-style: normal; text-decoration: none; color: #ffffff; font-family: \'Open Sans\', sans-serif; } div.mcpriceold { text-decoration: line-through !important; } .mgline[max-width~="120px"] .mgarrowbox, .mgline[max-width~="120px"] .mgbuybox { display: none !important; } .image-with-text { min-height: 1px; } @media(max-width:940px){ .mgbox{width: 2200px !important; max-width:2200px !important;} } @media(max-width:800px){ .mgbox{width: 2100px !important; max-width:2100px !important;} } @media(max-width:680px){ .mgbox{width: 1900px !important; max-width:1900px !important;} } @media(max-width:480px){ .mgbox{width: 2100px !important; max-width:2100px !important;} } @media(max-width:360px){ .mgbox{width: 1800px !important; max-width:1800px !important;} } @media(max-width:250px){ .mgbox{width: 1500px !important; max-width:1500px !important;} } ';

    self.webProtocol = "http:";
    self.clickTracking = "";

    self.loadedType = '';

    self.funcBlocks = {};

    self.teaserData = {};

    self.loadedPopularTeaser = false;

    self.deviceType = "desktop";

    self.hrefAttr = "href";
    self.enabledCooperationTypes = ["wages"];

    this.MarketCutStr = function(str, limit) {
        if (str.length <= limit) return str;

        var word = new Array();
        word = str.split(" ");
        var ret = word[0] + ' ';
        var test;

        for (i = 1; i < word.length; i++) {
            test = ret + word[i];
            if (test.length > limit) return ret + '...';
            else ret += word[i] + ' ';
        }
        return str;
    };

    this.MarketParseStr = function(str, limit) {
        var word = new Array();
        var i;
        var ret = '';
        word = str.split(" ");
        for (i = 0; i < word.length; i++) {
            if (word[i].length > limit && word[i].search(/&\w+;/) < 0)
                ret += word[i].substr(0, limit) + ' ' + word[i].substr(limit) + ' ';
            else ret += word[i] + ' ';
        }
        return ret;
    };

    this.prepareTitle = function(title) {
        title = this.MarketCutStr(title, 90);
        return title;
    };

    this.prepareDesc = function(desc) {
        desc = this.MarketCutStr(desc, 75);
        return desc;
    };

    this.isArray = function(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    };

    self.fixGetElementsByClassNameHandler = function(el) {
        if (el.getElementsByClassName == undefined) {
            el.getElementsByClassName = function(cl) {
                var retnode = [];
                var myclass = new RegExp('\\b' + cl + '\\b');
                var elem = this.getElementsByTagName('*');
                for (var i = 0; i < elem.length; i++) {
                    var classes = elem[i].className;
                    if (myclass.test(classes)) retnode.push(elem[i]);
                }
                return retnode;
            };
        }
    };

    this.hidePreloadDiv = function() {
        if (!self.fallbackMode) {
            if (self.context.document.getElementById("MarketGidPreloadC" + this.containerId)) {
                this.context.document.getElementById("MarketGidPreloadC" + this.containerId).style.display = 'none';
            } else if (self.context.document.getElementById("M135950PreloadC" + this.containerId)) {
                self.context.document.getElementById("M135950PreloadC" + this.containerId).style.display = 'none';
            }
        } else if (self.fallbackMode && this.countLoadBlocks == 0) {
            self.root.innerHTML = "";
        }
    };

    this.MarketGidLoadNews = function(json, servicerData) {
        this.hidePreloadDiv();

        if (typeof servicerData != 'undefined') {
            self.servicerData = servicerData;
            if (typeof servicerData.dt != 'undefined') {
                self.deviceType = servicerData.dt;
            }
        }

        if (self.fakeMode == 0) {
            for (var i = 0; i < self.beforeLoadNewsHooks.length; i++) {
                self[self.beforeLoadNewsHooks[i]]();
            }
        }

        if (this.isArray(json)) {
            if (json.length == 0) {
                return;
            }

            var template = self["templateFunc"](self, json);
            self.json = json;

            if (this.root && template) {
                if (typeof self.parseAdvertLink == 'function') {
                    template = self.parseAdvertLink(template);
                }
                if (this.fallbackMode && this.countLoadBlocks == 0) {
                    this.root.innerHTML = ""
                }
                this.root.innerHTML += this.preTemplate + template + this.postTemplate;
            }
        } else {
            if (this.root && this.countLoadBlocks == 0) {
                this.root.innerHTML = '';
                return;
            }
        }
        this.cookieStorage["page"] = this.page;
        this.cookieStorage['time'] = (new Date()).getTime();
        this.setCookie();

        var hrefs = this.root.getElementsByTagName("a");
        for (var i = 0; i < hrefs.length; i++) {
            hrefs[i].rel = "nofollow";
        }

        this.injectStyle(self.styles);

        this.countLoadBlocks++;

        if (self.fakeMode == 0) {
            for (var i = 0; i < self.afterLoadNewsHooks.length; i++) {
                self[self.afterLoadNewsHooks[i]]();
            }
        } else {
            if (typeof(self.responsiveInit) == "function") {
                self.responsiveInit();
            }
        }
    };

    this.getViewportHeight = function() {
        var d = this.context.document,
            w = this.context,
            dE = 'documentElement',
            cH = 'clientHeight',
            cW = 'clientWidth',
            iH = 'innerHeight',
            iW = 'innerWidth',
            sH = 'scrollHeight',
            sW = 'scrollWidth',
            oH = 'offsetHeight',
            oW = 'offsetWidth',
            oL = 'offsetLeft',
            oT = 'offsetTop',
            sT = 'scrollTop',
            sL = 'scrollLeft';
        if (w[iW]) {
            return { "c": w[iH], "s": w.pageYOffset };
        } else if (d[dE] && d[dE][cW]) {
            return { "c": d[dE][cH], "s": d[dE][sT] };
        } else if (d.body[cW]) {
            return { "c": d.body[cH], "s": d.body[sT] };
        }
        return 0;
    };

    this.crashWorker = function() {
        if (MarketGidInfC120193.template == '' && !MarketGidInfC120193.loadedDefault) {
            MarketGidInfC120193.crashStep = 1;
            MarketGidInfC120193.MarketGidRedirectComposite([]);
        }
    };


    this.renderItem = function(n, callbackText, type) {
        if (self.isArray(n)) {
            var p = self.prepareTeaserData(n, type);

            if (!(p.id in self.blockIds) && p.id != '') {
                if (typeof p.hash !== 'undefined' && typeof p.id !== 'undefined') {
                    self.teaserHashes[p.id] = p.hash;
                }
                self.blockIds[p.id] = 1;

                var addClasses = [];
                if (!self.loadedPopularTeaser && typeof(p.other.adc) != 'undefined' && (
                        p.other.adc.toString().indexOf('mrsadca') >= 0 || p.other.adc.toString().indexOf('mrsadcp') >= 0
                    )) {
                    addClasses.push('mgpopular');
                    self.loadedPopularTeaser = true;
                }

                addClasses.push('teaser-' + p.id);
                if ('l' in p.other && null != p.other.l.match(/[\?|&]u=/)) {
                    addClasses.push('dsp');
                }
                if ('type' in p.other) {
                    addClasses.push('type-' + p.other.type);
                }

                var vars = [
                    [/\{\*.*?\*\}/, ''],
                    [/\{\$href\}/g, self.hrefAttr + '="' + self.prepareNiceHref(p.hash) + '" data-hash="' + p.hash + '"'],
                    [/\{\$pmc_item\}/, self.id],
                    [/\{\$target\}/g, (typeof p.other.type !== 'undefined' && p.other.type == 'i') ? 'target="_self"' : 'target="_blank"'],
                    [/(class\=\"[^+]?)(mgline)([^+]?\")/, '$1$2 ' + addClasses.join(' ') + '$3'],
                    [/\{\$source\}/g, p.source],
                    [/\{\$src\}/g, 'width="328" height="328"' + ' data-i="' + p.id + '" src="' + p.other["i"] + '"'],
                    [/\{\$title\}/g, self.prepareTitle(p.title)],
                    [/\{\$desc\}/g, self.prepareDesc(p.desc)],
                    [/\{\$iteration\}/g, self.iteration],
                    [/\$iteration/g, self.iteration],
                    [/this\.iteration/g, self.iteration],
                    [/\{\$price\}/g, p.price],
                    [/\{\$priceold\}/g, p.priceold],
                    [/\{\$discount\}/g, p.discount],
                    [/\{if \$price\}/g, "{if '' != p.price.replace(new RegExp('[^0-9.]'), '')}"],
                    [/\{if !\$price\}/g, "{if '' == p.price.replace(new RegExp('[^0-9.]'), '')}"],
                    [/\{if \$priceold\}/g, "{if '' != p.priceold.replace(new RegExp('[^0-9.]'), '')}"],
                    [/\{if \$price != " "\}/g, "{if p.price != ' '}"],
                    [/\{if \$price == " "\}/g, "{if p.price == ' '}"],
                    [/\$priceold/g, p.priceold],
                    [/\$price/g, p.price],
                    [/\{if \$rep\}/g, "{if p.isReplic}"]
                ];

                for (var i = 0; i < vars.length; i++) {
                    callbackText = callbackText.replace(vars[i][0], vars[i][1]);
                }

                while (true) {
                    var x = callbackText;
                    var r = /\{if ([^\}]*?)\}(((?!\{(?:\/)?if).)*)\{\/if\}/g;
                    callbackText = callbackText.replace(r, function(str, p1, p2) {
                        if (eval(p1)) {
                            return p2;
                        } else {
                            return "";
                        }
                    });
                    if (x == callbackText) break;
                }

                this.iteration++;

                return callbackText;
            } else {
                self.blockIds[p.id]++;
                return "";
            }
        }
    };

    this.generateTemplate = function(templateText) {
        self["templateText"] = templateText;

        self["templateFunc"] = function(inf, json) {
            var parts = /(.*)?\{foreach\}(.*)?\{\/foreach\}(.*)?/.exec(self["templateText"]);
            if (!parts) {
                return;
            }
            var template = typeof(parts[1]) != 'undefined' ? parts[1] : '';
            for (var i = 0; i < json.length; i++) {
                template += inf.renderItem(json[i], parts[2], 'goods');
            }
            template += typeof(parts[3]) != 'undefined' ? parts[3] : '';
            return template;
        };

        return true;
    };

    this.init = function() {
        if (this.root) {
            this.getCookie();
            var cookiePage = parseInt(this.cookieStorage["page"]);
            this.linkerLinks = this.root.getElementsByTagName('a');

            var pageOffset = (this.context['MarketGidPageOffset'] ? parseInt(this.context['MarketGidPageOffset']) : 0);
            self.addEvent(self.root, 'click', self.hangNiceLinkListener);
            /* \x63\x6f\x6e\x74\x65\x78\x74 = context. Чтобы не исключать context из обфускатора*/
            self.addEvent(self.root, "\x63\x6f\x6e\x74\x65\x78\x74menu", self.hangNiceLinkListener);
            self.addEvent(self.root, 'mouseup', self.hangNiceLinkListener);
            self.addEvent(self.root, 'touchstart', self.hangNiceLinkListener);

            var tmpType = this.cookieStorage["mg_type"] ? this.cookieStorage["mg_type"] : this.defaultBlockType;

            var pagesCountNews = parseInt('');
            var pagesCountGoods = parseInt('20');
            var pagesCount = (tmpType == 'news') ? pagesCountNews : pagesCountGoods;

            if (cookiePage != null && cookiePage < pagesCount && cookiePage > 0) {
                this.page = cookiePage + 1;
            } else if (cookiePage > (pagesCount - 1) || cookiePage < 1) {
                this.page = 1 + pageOffset;
            }

            if ((new Date()).getTime() - (this.cookieStorage['time'] != undefined ? this.cookieStorage['time'] : 0) >= 6e5) {
                this.page = 1 + pageOffset;
            }

            if (!this.page) this.page = 1;
            this.pageUnlim = this.page - 1;
            this.cookieStorage["page"] = this.page;
            this.setCookie();

            if (!this.context.document.cookie) {
                var dt = new Date();
                this.page = dt.getSeconds() % pagesCount + 1;
            }

            this.blocksAddress = '//servicer.' + this.servicerDomain + '/';


            var protocol = self.context.document.location.protocol;
            self.webProtocol = protocol.indexOf("http") != -1 ? protocol : "http:";

            self.clickTracking = typeof(self.context.MGClickTracking) != 'undefined' ? self.context.MGClickTracking : "";

            if (!self.generateTemplate(self.templateText)) {
                return;
            }

            self.context.onClickExcludes = self.context.onClickExcludes || [];
            self.context.onClickExcludes.push(self.root);

            for (var i = 0; i < this.afterInitHooks.length; i++) {
                this[this.afterInitHooks[i]]();
            }
        }
    };

    this.getMostTopWindow = function() {
        var w = self.context;
        while (w != w.parent) {
            try {
                var test = w.parent.document.body;
                w = w.parent;
            } catch (e) {
                break;
            }
        }
        return w;
    };

    this.injectScript = function(forceShow, refresh) {

        var script = this.context.document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';

        var scriptSrc = "";

        var fs = forceShow ? 'fs/' : '';
        scriptSrc += self.blocksAddress + fs + '120193/' + this.page;


        if (refresh) {
            self.requestParams.rsh = "rsh=1";
        }
        if (this.context.MGi != undefined) {
            self.requestParams.geo = "geo=" + this.context.MGi;
        }
        self.requestParams.pv = "pv=5";
        self.requestParams.cbuster = "cbuster=" + (this.context.MG_CacheBuster ? this.context.MG_CacheBuster : ((new Date().getTime()) + '' + Math.floor((Math.random() * 1000000000) + 1)));

        if (JSON.parse('["wages"]').indexOf('int_exchange') >= 0) {
            var ogUrlEl = self.context.document.querySelector('meta[property="og:url"]');
            if (ogUrlEl) {
                self.requestParams.ogurl = 'ogurl=' + ogUrlEl.getAttribute('content');
            }
            var ogTitleEl = self.context.document.querySelector('meta[property="og:title"]');
            if (ogTitleEl) {
                self.requestParams.ogtitle = 'ogtitle=' + ogTitleEl.getAttribute('content');
            }
        }

        if (scriptSrc.indexOf('?') == -1) {
            scriptSrc += '?';
        } else {
            scriptSrc += '&';
        }
        var params = [];
        for (var key in self.requestParams) {
            params.push(self.requestParams[key]);
        }
        params.push('ref=' + encodeURIComponent(this.context.document.referrer));
        /* Параметр iframe должен быть последним в url пока о нем ничего не знает раздатчик */
        var isIframe = self.context.self !== self.context.top;
        if (isIframe) {
            params.push('iframe=1');
        }
        try {
            if (!sessionStorage.MG_Session_lastUpdate || Number(sessionStorage.MG_Session_lastUpdate) + 30 * 60 * 1000 < Date.now()) {
                var refererUrl = isIframe ? this.context.parent.document.referrer : this.context.document.referrer;
                var matchDomain = refererUrl.match(/:\/\/([^\/:]+)/i);
                sessionStorage.MG_Session_pr = matchDomain && matchDomain[1] ? matchDomain[1] : '';
                sessionStorage.MG_Session_lu = isIframe ? this.context.parent.location.href : this.context.location.href;
            }
            sessionStorage.MG_Session_lastUpdate = Date.now();

            if (sessionStorage && sessionStorage.MG_Session_pr) {
                params.push('pr=' + encodeURIComponent(sessionStorage.MG_Session_pr))
            }
            if (sessionStorage && sessionStorage.MG_Session_lu) {
                params.push('lu=' + encodeURIComponent(sessionStorage.MG_Session_lu))
            }
        } catch (err) {}

        var w = self.getMostTopWindow();
        if (typeof w._mgPageView135950 == 'undefined') {
            w._mgPageView135950 = (new Date()).getTime().toString(16) + (Math.round(Math.random() * 1000000000) + 2147483648).toString(16);
            params.push('pageView=1');
        } else {
            params.push('pageView=0');
        }

        params.push('pvid=' + w._mgPageView135950);

        scriptSrc += params.join("&");


        script.src = scriptSrc;

        (this.realRoot != undefined ? this.realRoot : this.root).parentNode.appendChild(script);

        script.onerror = function() {
            self.mg_ws.onmessage = function(evt) { self.context.eval(evt.data) };
            self.sendMessage('gb|' + script.src);
            self.isAdblock = true;
        };

        /*if (this.crashStep == 0) this.crashWorkerTimeout = setTimeout(this.crashWorker, 4000);*/
    };

    this.start = function() {
        if (self.root && self.countLoadBlocks == 0) {
            self.injectScript();
            self.afterLoadNewsHooks.push("carouselInit");

            /*function isScriptAlreadyIncluded(src) {
                var scripts = document.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; i++)
                    if (scripts[i].getAttribute('src') == src) return true;
                return false;
            }*/

            self.carouselInit = function() {
                /*if (isScriptAlreadyIncluded("glued.carousel.js")) {
                    return;
                }*/

                var carouselScript = self.context.document.createElement('script');
                carouselScript.type = 'text/javascript';
                carouselScript.charset = 'utf-8';
                carouselScript.src = "glued.carousel.js";
                (self.realRoot != undefined ? self.realRoot : self.root).parentNode.appendChild(carouselScript);

                carouselScript.onload = function() {
                    var mGCarousel = new parent.window.MGCarousel();
                    mGCarousel.init(self.id, "M135950PreloadC" + self.id);
                    mGCarousel.calculateHeight();
                    mGCarousel.decorateSlider();

                    self.addEvent(parent.window, "resize", function() {
                        mGCarousel.mgboxWidth = parent.window.document.getElementById("MarketGidComposite" + self.id).clientWidth - 2; // Borders
                        mGCarousel.calculateHeight();
                        mGCarousel.movingSide = 'none';
                        mGCarousel.currentCarouselShift = 0;
                        mGCarousel.transitionalMoving = true;
                        mGCarousel.mgslider.style.left = mGCarousel.currentCarouselShift + 'px';
                        mGCarousel.decorateSlider();
                    });
                }
            }
        }
    };

    this.addEvent = function(elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false)
        } else {
            elem.attachEvent('on' + type, handler)
        }
    };

    this.removeEvent = function(elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false)
        } else {
            elem.detachEvent('on' + type, handler)
        }
    };

    this.getMainCssSelector = function() {
        return "#" + (this.realRoot ? this.realRoot.id : this.root.id);
    }
};

var mgCanLoad120193 = false;
var mgFallback120193 = false;
if (document.getElementById("MG_ID")) mgCanLoad120193 = true;
if (document.getElementById("MarketGidComposite120193") || document.getElementById("M135950Composite120193")) {
    mgCanLoad120193 = true;
    mgFallback120193 = true;
}

if (this['mgCanLoad120193']) {
    if (!mgFallback120193) {
        var rootId120193 = document.getElementById("MG_ID").innerHTML;
        var div120193 = parent.window.document.createElement('div');
        div120193.id = "MarketGidComposite120193";
        var mgRootId120193 = parent.window.document.getElementById("MarketGidScriptRootC" + rootId120193) ? ("MarketGidScriptRootC" + rootId120193) : ("M135950ScriptRootC" + rootId120193);
        parent.window.document.getElementById(mgRootId120193).appendChild(div120193);
        MarketGidInfC120193 = new MarketGidBaseBlockC120193(div120193.id, parent.window, false, rootId120193);
    } else {
        var mgRootId120193 = document.getElementById("MarketGidComposite120193") ? "MarketGidComposite120193" : "M135950Composite120193";
        MarketGidInfC120193 = new MarketGidBaseBlockC120193(mgRootId120193, window, true, 0);
    }

    /**
     * Основные дополнения которые необходимы в обеих скриптах news и composite
     * @param self
     */
    this['MarketGidCMainBlock120193'] = function(self) {
        self.mg_ws = typeof(mg_ws120193) == "object" ? mg_ws120193 : {};
        self.mg_ws_location = "wss://wsp.mgid.com/ws";
        self.waitForSocketConnection = function(e, t) {
            setTimeout(function() {
                return 1 === e.readyState ? void(null != t && t()) : void self.waitForSocketConnection(e, t)
            }, 5)
        };

        self.afterLoadNewsHooks.push("checkVisibilityForAdBlock");

        /*  */

        /**
         * Метод подготовки ссылки для тизера
         */
        self.prepareHref = function(hash, event, element) {
            var href = "";
            var data = self.teaserData[hash];

            if (element && typeof self.context._mgExternalLinkChanger !== 'undefined' && self.context._mgExternalLinkChanger == 1) {
                href = element.protocol + "//" + element.hostname + element.pathname;
                var paramsStr = element.search;
                if (paramsStr != '') {
                    paramsStr = paramsStr.replace("?", "");
                    var params = paramsStr.split("&");
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i].split("=");
                        if (param[0] != 'k') {
                            href += (i == 0 ? "?" : "&") + params[i];
                        }
                    }
                }
            } else {
                href = self.clickTracking + self.webProtocol;

                if (data) {
                    if (data.link) {
                        href += data.link;
                    }
                } else {
                    href = "#";
                }
            }

            if (typeof self.getAntifraudParams == 'function' && data && data['coopType'] != 'i') {
                var afParams = self.getAntifraudParams(event, element);
                if (afParams) {
                    var suffix = '120193';
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'k=' + suffix + 'f' + afParams;
                }
            }

            if (true == parseInt('0')) {
                var template = '//%host%/r/%title%?u=%rurl%';
                template = template.replace(/^(\/\/)/, self.context.location.protocol + '$1');
                template = template.replace(/(%host%)/, self.context.location.host);
                template = template.replace(/(%title%)/, self.transliterate(data[3]));
                href = template.replace(/(%rurl%)/, self.tox64String(href, true));
            }

            return href;
        };

        /**
         * Метод подготовки "красивой" ссылки для тизера
         */
        self.prepareNiceHref = function(hash, event, element) {
            var href;
            var data = self.teaserData[hash];

            if (data.other['sdl'] == 1 && data['coopType'] != 'i') {

                href = self.clickTracking;

                if (typeof(data.other['dl']) != 'undefined' && data.other['dl'] != '') {
                    href += data.other['dl'];
                } else {
                    var source = decodeURIComponent(data[0].replace(/[`|',:\/?;$%&\(\)^*!@\s]/g, '')).toLowerCase();
                    var title = decodeURIComponent(data[3].replace(/[`|',:\/?;$%&\(\)^*!@]/g, '')).replace(/\s/g, '_');
                    href += self.webProtocol + '//' + (source ? source + '/' : '') + title;
                }
            } else {
                href = self.prepareHref(hash, event, element);
            }

            return href;
        };

        /**
         * Вспомагательная функция для транслитерации фраз
         * @param {string} str
         * @returns {string}
         */
        self.transliterate = function(str) {
            var a = {
                'Ё': 'YO',
                'Й': 'I',
                'Ц': 'TS',
                'У': 'U',
                'К': 'K',
                'Е': 'E',
                'Н': 'N',
                'Г': 'G',
                'Ш': 'SH',
                'Щ': 'SCH',
                'З': 'Z',
                'Х': 'H',
                'Ъ': '',
                'ё': 'yo',
                'й': 'i',
                'ц': 'ts',
                'у': 'u',
                'к': 'k',
                'е': 'e',
                'н': 'n',
                'г': 'g',
                'ш': 'sh',
                'щ': 'sch',
                'з': 'z',
                'х': 'h',
                'ъ': '\'',
                'Ф': 'F',
                'Ы': 'I',
                'В': 'V',
                'А': 'a',
                'П': 'P',
                'Р': 'R',
                'О': 'O',
                'Л': 'L',
                'Д': 'D',
                'Ж': 'ZH',
                'Э': 'E',
                'ф': 'f',
                'ы': 'i',
                'в': 'v',
                'а': 'a',
                'п': 'p',
                'р': 'r',
                'о': 'o',
                'л': 'l',
                'д': 'd',
                'ж': 'zh',
                'э': 'e',
                'Я': 'Ya',
                'Ч': 'CH',
                'С': 'S',
                'М': 'M',
                'И': 'I',
                'Т': 'T',
                'Ь': '',
                'Б': 'B',
                'Ю': 'YU',
                'я': 'ya',
                'ч': 'ch',
                'с': 's',
                'м': 'm',
                'и': 'i',
                'т': 't',
                'ь': '',
                'б': 'b',
                'ю': 'yu',
                ' ': '_',
                'і': 'i',
                'І': 'I',
                'ї': 'i',
                'Ї': 'I'
            };

            return str.split('').map(function(char) {
                if (char.match(/[a-z0-9_\-]/i)) {
                    return char;
                }
                return a[char] || '';
            }).join('');
        };

        /**
         * Воспомагательная функция, которая ищет родительскую ссылку
         * @param {Element} el
         * @returns {Element}
         */
        self.getParentLink = function(el) {
            while (el.tagName !== 'BODY') {
                if (el.tagName == "A") {
                    return el;
                } else {
                    el = el.parentNode;
                }
            }

            return null;
        };

        /**
         * Get the closest matching element up the DOM tree.
         * @param  {Element} element     Starting element
         * @param  {String}  selector Selector to find
         * @return {Boolean|Element}  Returns null if not match found
         */
        self.findClosest = function(element, selector) {
            var foundElements;
            while (element.parentNode) {
                foundElements = element.parentNode.querySelectorAll(selector);
                for (var i = 0; i < foundElements.length; i++) {
                    if (element.isEqualNode(foundElements[i])) {
                        return foundElements[i];
                    }
                }

                element = element.parentNode;
            }

            return null;
        };

        /**
         * Метод сбора данных по каждому тизеру с ответа раздатчика
         * @param data
         * @param type
         * @returns {Object}
         */
        self.prepareTeaserData = function(data, type) {
            var t = {};
            t.source = data[0];
            t.id = data[1];
            t.title = data[3];
            t.desc = data[4];
            if (type.toLowerCase() == 'news') {
                t.mirror = data[5] ? data[5] : self.subnetMirrors[self.currentSubnet];
                t.hash = data[6];
                t.other = data[7];
                t.price = " ";
                t.priceold = t.discount = "";
                t.isReplic = false;
            } else {
                t.mirror = self.subnetMirrors[self.currentSubnet];
                t.key = data[6];
                t.price = data[7].replace(".00", "");
                t.priceold = data[8].replace(".00", "");
                t.discount = t.priceold.replace(new RegExp('[^0-9.]'), '') == '' ? '' : Math.floor((1 * /\d+(?:\.\d+)?/.exec(t.priceold) - 1 * /\d+(?:\.\d+)?/.exec(t.price)) * 100 / (/\d+(?:\.\d+)?/).exec(t.priceold)) + '%';
                t.hash = data[9];
                t.other = data[10];

                var titleLower = t.title.toLowerCase();
                var descLower = t.desc.toLowerCase();
                var replicWords = ["копия", "подделка", "реплика", "как оригинал"];
                var replicInsertWords = ["Копия. ", "Реплика. "];

                if (data[5] == '1') {
                    t.isReplic = true;
                    for (var i = 0; i < replicWords.length; i++) {
                        if (self.prepareTitle(titleLower).indexOf(replicWords[i]) > -1 ||
                            self.prepareDesc(descLower).indexOf(replicWords[i]) > -1) {
                            t.isReplic = false;
                            break;
                        }
                    }
                } else {
                    t.isReplic = false;
                }
            }

            if (self.deviceType != 'desktop') {
                t.other.sdl = 0;
            }

            data['other'] = t.other;
            self.teaserData[t.hash] = data;
            self.teaserData[t.hash]['id'] = t.id;
            self.teaserData[t.hash]['img'] = t.other["i"];
            self.teaserData[t.hash]['type'] = type;
            self.teaserData[t.hash]['link'] = typeof(t.other['l']) != 'undefined' ? t.other['l'] : null;
            self.teaserData[t.hash]['mirror'] = t.mirror;
            self.teaserData[t.hash]['coopType'] = typeof(t.other['type']) != 'undefined' ? t.other['type'] : null;

            return t;
        };

        /**
         * Альтернатива btoa функции
         * @param {string} s строка
         * @param {boolean} replaceChars - заменять симлолы для корректной url строки
         * @returns {string}
         */
        self.tox64String = function(s, replaceChars) {
            replaceChars = typeof replaceChars == 'undefined' ? replaceChars : false;
            var b64c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var b64e = '';
            var c1, c2, c3, e1, e2, e3, e4;
            var i = 0;
            while (i < s.length) {
                c1 = s.charCodeAt(i++);
                c2 = s.charCodeAt(i++);
                c3 = s.charCodeAt(i++);
                e1 = c1 >> 2;
                e2 = ((c1 & 3) << 4) | (c2 >> 4);
                e3 = isNaN(c2) ? 64 : (((c2 & 15) << 2) | (c3 >> 6));
                e4 = isNaN(c3) ? 64 : (c3 & 63);
                b64e += b64c.charAt(e1) + b64c.charAt(e2) + b64c.charAt(e3) + b64c.charAt(e4);
            }

            if (true == replaceChars) {
                b64e = b64e.replace('+', '-').replace('/', '_').replace('=', '*');
            }

            return b64e;
        };

        /**
         * Обрабатывает клик по ссылкам тизера и меняет "красивую" ссылку на нормальную
         * @param event
         */
        self.hangNiceLinkListener = function(event) {
            if (self.loadedDefault) {
                return;
            }

            if (!event) {
                var event = self.context.event;
            }
            if (!event.target) {
                event.target = event.srcElement;
            }
            var element = event.target;
            if (element.tagName != 'A') {
                var element = self.getParentLink(element);
                if (null == element) {
                    return;
                }
            }
            var hash = element['data-hash'] || element.getAttribute('data-hash');
            if (hash != undefined) {

                if (typeof self.teaserData[hash] != 'undefined' &&
                    typeof self.teaserData[hash]['other'] != 'undefined' &&
                    typeof self.teaserData[hash]['other']['sdl'] != 'undefined'
                ) {
                    self.teaserData[hash]['other']['sdl'] = 0;
                }

                element[self.hrefAttr] = self.prepareHref(hash, event, element);
            }
        };

        /**
         *
         * @param html
         * @returns {*}
         */
        self.htmlToElement = function(html) {
            var template = document.createElement('div');
            template.innerHTML = html;
            return template.firstChild;
        };

        /**
         *
         * @param html
         * @returns {*}
         */
        self.htmlToElements = function(html) {
            var template = self.context.document.createElement('div');
            template.innerHTML = html;
            return Array.prototype.slice.call(template.childNodes);
        };


        /**
         * Отправка сообщения на веб-сокет
         * @param msg
         */
        self.sendMessage = function(msg) {
            if (typeof self.mg_ws == 'object' && self.mg_ws.__proto__.toString() == '[object Worker]') {
                self.mg_ws.postMessage(msg);
            } else {
                var h = self.mg_ws.onmessage;
                self.mg_ws = new Worker(URL.createObjectURL(new Blob(['eval(atob(\'ZnVuY3Rpb24gc2VuZE1lc3NhZ2UoZSl7dmFyIGg9bWdfd3Mub25tZXNzYWdlOyBtZ193cy5yZWFkeVN0YXRlPT1tZ193cy5DTE9TRUQmJihtZ193cz1uZXcgV2ViU29ja2V0KG1nX3dzX2xvY2F0aW9uKSksbWdfd3Mub25tZXNzYWdlPWgsd2FpdEZvclNvY2tldENvbm5lY3Rpb24obWdfd3MsZnVuY3Rpb24oKXttZ193cy5zZW5kKGUpfSl9ZnVuY3Rpb24gd2FpdEZvclNvY2tldENvbm5lY3Rpb24oZSx0KXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIDE9PT1lLnJlYWR5U3RhdGU/dm9pZChudWxsIT10JiZ0KCkpOnZvaWQgd2FpdEZvclNvY2tldENvbm5lY3Rpb24oZSx0KX0sNSl9OyB2YXIgbWdfd3NfbG9jYXRpb24gPSAid3NzOi8vd3NwLm1naWQuY29tL3dzIjsgbWdfd3MgPSBuZXcgV2ViU29ja2V0KG1nX3dzX2xvY2F0aW9uKSwgbWdfd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKHQpIHtwb3N0TWVzc2FnZSh0LmRhdGEpO30sIG9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpe3NlbmRNZXNzYWdlKGUuZGF0YSl9\'))']), { type: "application/javascript" }));
                self.mg_ws.onmessage = h;
                self.mg_ws.postMessage(msg);
            }
        };

        /**
         * Проверяем что антиадблочный код отрендерился в видимом контейнере
         */
        self.checkVisibilityForAdBlock = function() {
            setTimeout(function() {
                /* Уходим: веб-сокет не открыт, вероятно загружены не через код AntiAdblock или контейнер видимый */
                if (typeof self.mg_ws != "object" || !(self.mg_ws instanceof WebSocket) || !self.isHiddenElement(self.root)) {
                    return;
                }

                var dt = new Date().toISOString().slice(0, 19).replace('T', ' ');
                var uid = self.blockType == 'news' ? '' : '5565583';

                self.sendMessage('a| ' + dt + ': ' + uid + ' - ' + self.context.location.href);
            }, 2000);
        };

        /**
         * Проверка является ли текущий элемент спрятаным на странице
         * @param el {HTMLElement}
         * @returns {boolean}
         */
        self.isHiddenElement = function(el) {
            while (el.tagName !== 'BODY') {
                if ('fixed' != el.style.position && null == el.offsetParent) {
                    return true;
                }

                if ('hidden' == el.style.visibility) {
                    return true;
                }

                if ('none' == el.style.display) {
                    return true;
                }

                el = el.parentNode;
            }

            return false;
        };

        self.injectStyle = function(style, container) {
            style = style.replace(/(@media \([^(]*\) {)/g, "$1}");

            style = style.replace(/((?:^|}|,)\W*)((?:\w+)?\.(?:mc|mg)[\-\w]+)/g, "$1" + this.getMainCssSelector() + " $2");

            style = style.replace(/((@media \([^(]*\) \{)\})/g, "$2");

            if (style == "") return;

            if (!container) {
                var MGst = container ? container : this.context.document.createElement('style');
                MGst.className = 'MarketGidC120193';
                MGst.type = 'text/css';
                (this.realRoot != undefined ? this.realRoot : this.root).parentNode.appendChild(MGst);
                if (MGst.styleSheet) {
                    MGst.styleSheet.cssText = style;
                } else {
                    MGst.appendChild(this.context.document.createTextNode(style));
                };
            } else {
                var MGst = container;
                MGst.className = 'MarketGidC120193';
                if (MGst.styleSheet) {
                    MGst.styleSheet.cssText = style;
                } else {
                    while (MGst.firstChild) {
                        MGst.removeChild(MGst.firstChild);
                    }
                    MGst.appendChild(this.context.document.createTextNode(style));
                };
            }
        };
    };
    this['MarketGidCMainBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Main'] = 'MarketGidCMainBlock120193';
    MarketGidCCookieBlock120193 = function(self) {
        this.storageName = "MarketGidStorage" + (this.context.MarketGidPageOffset ? this.context.MarketGidPageOffset : "");

        this.getCookieValue = function() {
            var matches = this.context.document.cookie.match(new RegExp("(?:^|; )" + this.storageName + "=([^;]*)"));
            var res = {};
            if (matches) {
                try {
                    res = MarketGidJSON.parse(decodeURIComponent(matches[1]));
                } catch (e) {};
            }
            return res;
        };

        this.getCookie = function() {
            var value = this.getCookieValue();
            if (value["C120193"] != undefined) {
                this.cookieStorage = value["C120193"];
            } else this.cookieStorage = {};

            if (value["0"] != undefined) {
                this.sharedCookieStorage = value["0"];
            } else this.sharedCookieStorage = {};
        };

        this.setCookie = function() {
            var totalCookie = this.getCookieValue();
            totalCookie["C120193"] = this.cookieStorage;
            totalCookie["0"] = this.sharedCookieStorage;
            var value = encodeURIComponent(MarketGidJSON.stringify(totalCookie));
            this.context.document.cookie = this.storageName + "=" + value + ";path=/";
        };
    };
    this['MarketGidCCookieBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Cookie'] = 'MarketGidCCookieBlock120193';
    MarketGidCSubnetsBlock120193 = function() {
        var self = this;
        self.funcBlocks["Subnets"] = "MarketGidCSubnetsBlock120193";

        this.afterInitHooks.push("subnetsLoad");

        this.currentSubnet = "";

        this.subnetMirrors = {};
        this.subnetMirrorServicers = {};
        this.subnetMirrorsImages = {};
        this.subnetMirrorsAdvert = {};
        this.subnetMirrorsAdLinkBlocks = {};
        this.subnetMirrorsUtm = {};
        this.subnetDashboardDomains = {};
        this.subnetMirrorNames = {};

        this.subnetMirrors['0'] = 'mgid.com';
        this.subnetMirrorServicers['0'] = 'mgid.com';
        this.subnetMirrorNames['marketgid'] = parseInt('0');
        this.subnetMirrorsImages['0'] = 'mgid.com';
        this.subnetMirrorsAdLinkBlocks['0'] = '<div class="mgheader" data-advert-url="//cdn.mgid.com/advert/mgid/main.html"><span class="mghead">%WIDGET_TITLE%</span><div class="mg_addad%id"><a href="http://mgid.com/advertisers%utm%id" target="_blank"> by<img style="display: inline-block;width: auto!important;" src="//cdn.mgid.com/images/mgid_logo_mini_43x20.png" alt="Mgid" title="Mgid"></a></div></div><style>.mghead{font-weight:700;font-size:14px;text-transform:uppercase;text-align:left;font-family: "Open Sans", sans-serif;color:#4555a7;display:block;margin:0 0 0px 5px;float:left;}.mgheader{  display: table !Important; width: 100% !important;}div.mg_addad%id{text-align: right; opacity: 0.5;margin-right: 10px;display: inline-block;float: right;} div.mg_addad%id:hover{opacity: 1} div.mg_addad%id a{color: #000000; font:normal 10px Myriad Pro; text-decoration: none;} div.mg_addad%id img{margin: 0px -5px 0px 0px; border:0px;float: none;padding:0px;}</style>';
        this.subnetMirrorsUtm['0'] = '?utm_source=widget&utm_medium=text&utm_campaign=add&utm_content=';
        this.subnetDashboardDomains['0'] = '//dashboard.mgid.com';
        this.subnetMirrors['1'] = 'fem.mgid.com';
        this.subnetMirrorServicers['1'] = 'mgid.com';
        this.subnetMirrorNames['lady'] = parseInt('1');
        this.subnetMirrorsImages['1'] = 'mgid.com';
        this.subnetMirrorsAdLinkBlocks['1'] = '<div class="mgheader"><span class="mghead">%WIDGET_TITLE%</span><div class="mg_addad%id"><a href="http://mgid.com/advertisers%utm%id" target="_blank"> by<img style="display: inherit!important;width: auto!important;" src="//cdn.mgid.com/images/mgid_logo_mini_43x20.png" alt="Mgid" title="Mgid"></a></div></div><style>.mghead{font-weight:700;font-size:14px;text-transform:uppercase;text-align:left;font-family: "Open Sans", sans-serif;color:#4555a7;display:block;margin:0 0 0px 5px;float:left;}.mgheader{  display: table !Important; width: 100% !important;}div.mg_addad%id{text-align: right; opacity: 0.5;margin-right: 10px} div.mg_addad%id:hover{opacity: 1} div.mg_addad%id a{color: #000000; font:normal 10px Myriad Pro; text-decoration: none;} div.mg_addad%id img{margin-bottom: -5px; border:0px}</style>';
        this.subnetMirrorsUtm['1'] = '?utm_source=widget_fem&utm_medium=text&utm_campaign=add&utm_content=';
        this.subnetDashboardDomains['1'] = '//dashboard.mgid.com';
        this.subnetMirrors['2'] = 'adskeeper.co.uk';
        this.subnetMirrorServicers['2'] = 'adskeeper.co.uk';
        this.subnetMirrorNames['adskeeper'] = parseInt('2');
        this.subnetMirrorsImages['2'] = 'adskeeper.co.uk';
        this.subnetMirrorsAdLinkBlocks['2'] = '<div class="mg_addad%id widgets_logo%id"><a href="http://adskeeper.co.uk/#1" target="_blank"><img src="//cdn.adskeeper.co.uk/images/adskeeper_logo_mini_71x28.png" alt="Adskeeper" title="Adskeeper"></a></div><style type="text/css">div.mg_addad%id{text-align: right; opacity: 0.5;} div.mg_addad%id:hover{opacity: 1} div.mg_addad%id a{color: #000000; font:normal 10px Myriad Pro; text-decoration: none;} div.mg_addad%id img{margin-bottom: -5px; border:0px}</style>';
        this.subnetMirrorsUtm['2'] = '?utm_source=widget_adskeeper&utm_medium=text&utm_campaign=add&utm_content=';
        this.subnetDashboardDomains['2'] = '//dashboard.adskeeper.co.uk';
        this.afterInitHooks.push("subnetsLoad");

        var informerData = [];
        informerData.push({ "id": "120193", "protocol": "5", "type": "Goods", "subnet": "0" });

        this.subnetsLoad = function() {
            for (var i = 0; i < informerData.length; i++) {
                var tickerId = informerData[i].id;
                if ((informerData[i].subnet !== '1') ^ ('0' === '1')) {
                    (function(type) {
                        self.context["MarketGidLoad" + type + tickerId] = function(json, awd) {
                            self.loadedType = type.toLowerCase();
                            self.currentSubnet = '0';
                            self["MarketGidLoadNews"](json, awd);
                        };
                        self.context["MarketGidCReject120193"] = self['MarketGidReject'];
                    })(informerData[i].type);
                }
                if ((informerData[i].subnet !== '1') ^ ('1' === '1')) {
                    (function(type) {
                        self.context["MarketGidLoad" + type + tickerId] = function(json, awd) {
                            self.loadedType = type.toLowerCase();
                            self.currentSubnet = '1';
                            self["MarketGidLoadNews"](json, awd);
                        };
                        self.context["MarketGidCReject120193"] = self['MarketGidReject'];
                    })(informerData[i].type);
                }
                if ((informerData[i].subnet !== '1') ^ ('2' === '1')) {
                    (function(type) {
                        self.context["AdskeeperLoad" + type + tickerId] = function(json, awd) {
                            self.loadedType = type.toLowerCase();
                            self.currentSubnet = '2';
                            self["MarketGidLoadNews"](json, awd);
                        };
                        self.context["AdskeeperCReject120193"] = self['MarketGidReject'];
                    })(informerData[i].type);
                }
            }
        };

        self.getSubnetByMirror = function(mirror) {
            var subnet = 0;

            if (typeof self.subnetMirrorNames[mirror] != 'undefined') {
                subnet = self.subnetMirrorNames[mirror];
            }

            return subnet;
        }
    };
    this['MarketGidCSubnetsBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Subnets'] = 'MarketGidCSubnetsBlock120193';
    MarketGidCInternalExchangeLoggerBlock120193 = function(self) {
        self.afterLoadNewsHooks.push("iExchangeLoggerInit");

        self.iExchangeLoggerInit = function() {
            self.addEvent(self.root, "click", function(event) {

                if (!event) var event = self.context.event;
                if (!event.target) {
                    event.target = event.srcElement;
                }

                self.allowReturnParams = true;
                var element = event.target;
                if (element.tagName != 'A') {
                    var element = self.getParentLink(element);

                    if (null == element) {
                        return;
                    }
                }

                if (!element.hasAttribute('data-hash')) {
                    return;
                }

                var hash = element.getAttribute('data-hash');

                if (self.teaserData[hash] && self.teaserData[hash]['coopType'] == 'i') {
                    var img = document.createElement('IMG');

                    var data = "cid=120193&tid=" + self.teaserData[hash]['id'] + "&h=" + hash;
                    if (typeof self.servicerData['isBot'] !== 'undefined') {
                        data += "&bot=" + self.servicerData['isBot'];
                    }
                    if (typeof self.servicerData['tt'] !== 'undefined') {
                        data += "&tt=" + self.servicerData['tt'];
                    }
                    if (typeof self.servicerData['ts'] !== 'undefined') {
                        data += "&ts=" + self.servicerData['ts'];
                    }

                    var scriptSrc = "//c." + (self.currentSubnet == 2 ? "adskeeper.co.uk" : "mgid.com") + "/clie?" + data;

                    img.src = scriptSrc;
                }
            });
        };
    };
    this['MarketGidCInternalExchangeLoggerBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['InternalExchangeLogger'] = 'MarketGidCInternalExchangeLoggerBlock120193';
    /**
     * Блок по внутреннему обмену
     * @param self
     * @constructor
     */
    MarketGidCInternalExchangeBlock120193 = function(self) {
        self.afterLoadNewsHooks.push("initIntExchangeLabels");

        /**
         * Поиск всех комментариев внутри информера
         * @param context
         * @return {Array}
         */
        function getComments(context) {
            var foundComments = [];
            var elementPath = [context];
            while (elementPath.length > 0) {
                var el = elementPath.pop();
                for (var i = 0; i < el.childNodes.length; i++) {
                    var node = el.childNodes[i];
                    if (node.nodeType === Node.COMMENT_NODE) {
                        foundComments.push(node);
                    } else {
                        elementPath.push(node);
                    }
                }
            }

            return foundComments;
        }

        /**
         * Поиск и подмена плейсхолдеров на картинки
         */
        self.initIntExchangeLabels = function() {

            if (self.enabledCooperationTypes.indexOf('int_exchange') == -1) {
                return;
            }

            var comments = getComments(self.root);
            for (var i = 0; i < comments.length; i++) {
                var comment = comments[i];
                var mgline = self.findClosest(comment, '.mgline');

                /* Если блок .mgline не найден, то уходим, без него продолжение безполезно */
                if (!mgline) {
                    continue;
                }

                /* Рекламное лого нужно только для товарных тизеров */
                if (mgline.className.indexOf('type-w') == -1) {
                    continue;
                }

                /* Создаем изображение */
                var img = self.context.document.createElement("IMG");

                img.setAttribute('height', 20);

                if (comment.data == 'intExchangeWagesImagePlace') {
                    img.className = 'mcimgad';
                    img.src = "//cdn.mirs.com/images/mgid/int_exchange_wages_ad.svg";
                }

                if (comment.data == 'intExhangeWagesSourcePlace') {
                    img.className = 'mcimgsrc';
                    img.src = "//cdn.mirs.com/images/mgid/int_exchange_wages_src.svg";
                }

                /* Какой-то другой коммент, не наш маркер, пропускаем */
                if (!img.src) {
                    continue;
                }

                /* Маркер заменяем на подготовленное изображение */
                comment.parentNode.replaceChild(img, comment);
            }
        }
    };
    this['MarketGidCInternalExchangeBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['InternalExchange'] = 'MarketGidCInternalExchangeBlock120193';
    this['MarketGidCAntiAdblockBlock120193'] = function(self) {

        self.isAdblock = false;
        self.isServerSide = typeof loadServerSideAds5565583 == 'function';
        self.afterInitHooks.push('checkAdblock');
        self.afterInitHooks.push('initServerSide');
        self.afterLoadNewsHooks.push("initAntiAdblock");
        self.initServerSide = function() {
            if (self.isServerSide && self.isAdblock) {
                self.context._mgq = self.context._mgq || [];
                loadServerSideAds5565583(self.context._mgq);
            }
        };

        self.checkAdblock = function() {
            if (typeof self.context.getComputedStyle == "function") {
                var a = self.context.document.createElement("A");
                a.href = "http://mgid.com/ghits/";
                self.context.document.body.appendChild(a);
                var isAdblock = self.context.getComputedStyle(a).display == 'none';
                self.context.document.body.removeChild(a);
                self.isAdblock = isAdblock;
            }
        };

        self.initAntiAdblock = function() {
            if (self.isAdblock) {
                var displayType = "block";
                if (self.root.style.display != "") {
                    displayType = self.root.style.display;
                }
                self.root.style.setProperty("visibility", "visible", "important");
                self.root.style.setProperty("display", displayType, "important");
                self.appendVisibleRecursive(self.root);
                self.root.addEventListener("click", function(t) {
                    t.preventDefault();
                    var e = t.target;
                    var n = '';
                    if (e.tagName == 'A') {
                        return window.location = e.href;
                    } else {
                        while ("A" != e.tagName) {
                            e = e.parentNode;
                            if (e == self.root) {
                                return false;
                            }
                        }
                        n = e.href;
                    }
                    return window.location = n;
                });
            }
        };
        self.appendVisibleRecursive = function(node) {
            for (var i = -1, l = node.childNodes.length; ++i < l;) {
                var el = node.childNodes[i];
                var displayType = "block";
                if (typeof el.style != 'object') {
                    continue;
                }
                if (el.style.display == 'none') {
                    continue;
                }
                if (el.tagName == 'STYLE' || el.tagName == 'SCRIPT') {
                    continue;
                }
                if (el.tagName == 'TD') {
                    displayType = "table-cell";
                }
                if (el.tagName == 'TR') {
                    displayType = "table-row";
                }
                if (el.className.length > 0 && el.className.split(' ').indexOf('mgbox') > -1) {
                    displayType = "flex";
                }
                if (el.className.length > 0 && el.className.split(' ').indexOf('mgline') > -1) {
                    displayType = "inline-block";
                }
                if (el.tagName == 'A' && el.parentNode.className.length > 0 && el.parentNode.className.split(' ').indexOf('submit') > -1) {
                    displayType = "inline-block";
                }
                if (el.className.length > 0 && el.className.split(' ').indexOf('fake') > -1) {
                    continue;
                }
                el.style.setProperty("visibility", "visible", "important");
                el.style.setProperty("display", displayType, "important");
                if (el.childNodes.length > 0) {
                    self.appendVisibleRecursive(el);
                }
            }
        };
    };
    this['MarketGidCAntiAdblockBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['AntiAdblock'] = 'MarketGidCAntiAdblockBlock120193';
    MarketGidCUtilsBlock120193 = function(self) {
        self.utils = {};

        /**
         * Возвращает кроссбраузерно значения скролла
         * 
         * @returns {{top: *, left: *}}
         * 
         */
        self.utils.getScroll = function() {
            var w = self.utils.getWindow();
            return {
                top: w.document.body.scrollTop || w.document.documentElement.scrollTop || 0,
                left: w.document.body.scrollLeft || w.document.documentElement.scrollLeft || 0
            }
        };

        /**
         * Возвращает позицию элемента
         * @param element
         * @param {boolean} withScroll Учитывать ли скролл для top и left (т.е. показывать от верха страницы, а не от верха окна)
         * 
         * @returns {{top: *, bottom: *, left: *, right: *, height: *, width: *}}
         * 
         */
        self.utils.getRect = function(element, withScroll) {
            var rect = element.getBoundingClientRect();
            var toReturn = {
                top: rect.top,
                bottom: rect.bottom,
                left: rect.left,
                right: rect.right,
                height: (rect.height ? rect.height : rect.bottom - rect.top),
                width: (rect.width ? rect.width : rect.right - rect.left)
            };
            if (self.context.self !== self.context.top) {
                var frame = self.utils.getFrame();
                if (frame) {
                    var iframeRect = frame.getBoundingClientRect();
                    toReturn.top += iframeRect.top;
                    toReturn.bottom += iframeRect.top;
                    toReturn.left += iframeRect.left;
                    toReturn.right += iframeRect.left;
                }
            }
            if (withScroll) {
                var scroll = self.utils.getScroll();
                toReturn.top += scroll.top;
                toReturn.bottom += scroll.top;
                toReturn.left += scroll.left;
                toReturn.right += scroll.left;
            }
            return toReturn;
        };

        /**
         * Возвращает размеры видимой области страницы
         * 
         * @returns {{width: (Number|number), height: (Number|number)}}
         * 
         */
        self.utils.getViewportSize = function() {
            var w = self.utils.getWindow();
            return {
                width: (w.innerWidth || w.document.documentElement.clientWidth),
                height: (w.innerHeight || w.document.documentElement.clientHeight)
            };
        };

        /** объект window для определения scroll */
        var currentWindow = undefined;

        /**
         * Возвращает объект window для определения scroll, viewport и т.п. с учетом iframe и доступа к родителю из него
         * 
         * @returns {Window}
         * 
         */
        self.utils.getWindow = function() {
            if (currentWindow === undefined) {
                var w = self.context;
                if (self.context.parent != self.context.self) {
                    try {
                        if (self.context.top.document != undefined) {
                            w = self.context.top;
                        }
                    } catch (err) {}
                }
                currentWindow = w;
            }
            return currentWindow;
        };

        /** объект самого верхнего iframe */
        var topFrame = undefined;

        /**
         * Возвращает объект самого верхнего iframe для определения его позиции
         * 
         * @returns {Window}
         * 
         */
        self.utils.getFrame = function() {
            if (topFrame === undefined) {
                try {
                    for (var w = self.context, frame = w.frameElement; w.frameElement; w = w.parent) {
                        frame = w.frameElement;
                    }
                    topFrame = frame;
                } catch (err) {
                    topFrame = null;
                }
            }
            return topFrame;
        }
    };
    this['MarketGidCUtilsBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Utils'] = 'MarketGidCUtilsBlock120193';
    MarketGidCRtbBlock120193 = function(self) {
        this.afterLoadNewsHooks.push("cmPixelLoad");

        this.cmPixelLoad = function() {
            var script = MarketGidInfC120193.context.document.createElement('script');
            script.charset = 'utf-8';
            var scriptSrc = '//cm.mgid.com/i.js';
            script.src = scriptSrc;
            script.type = 'text/javascript';
            script.async = true;
            script.onerror = function() {
                self.mg_ws.onmessage = function(evt) { self.context.eval(evt.data) };
                self.sendMessage('js|' + script.src);
            };

            var currentRoot = MarketGidInfC120193.realRoot != undefined ? MarketGidInfC120193.realRoot : MarketGidInfC120193.root;
            currentRoot.parentNode.appendChild(script);
        };
    };
    this['MarketGidCRtbBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Rtb'] = 'MarketGidCRtbBlock120193';
    MarketGidCMgqBlock120193 = function(self) {
        this.isLongCheck = false;

        this.afterInitHooks.push("mgqInit");

        this.mgqWorker = function() {
            var length = self.context._mgq.length;
            var pool = self.context._mgq.slice(0);
            for (var i = 0; i < length; i++) {
                var el = pool[i];
                if (typeof(self.context[el[0]]) == 'function') {
                    self.context[el[0]].apply(self.context, el.slice(1));
                    self.context._mgq.splice(i, 1);
                }
            }
            if (!self.context._mgqi) {
                self.context._mgqi = self.context.setInterval(function() {
                    self.mgqWorker();
                }, 5);
            }

            if (!self.isLongCheck) {
                if ((new Date()).getTime() - self.context._mgqt > 10000) {
                    self.isLongCheck = true;
                    self.context.clearInterval(self.context._mgqi);
                    self.context._mgqi = self.context.setInterval(function() {
                        self.mgqWorker();
                    }, 100);
                }
            }
        };

        this.mgqInit = function() {
            self.context._mgq = self.context._mgq || [];
            if (typeof(self.context._mgqp) == 'undefined') {
                self.context._mgqp = self.mgqWorker;
                self.context._mgqt = (new Date()).getTime();
                self.mgqWorker();
            }
        };
    };
    this['MarketGidCMgqBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Mgq'] = 'MarketGidCMgqBlock120193';
    /**
     * Блок антинакрутки
     * @param self
     */
    this['MarketGidCAntifraudBlock120193'] = function(self) {
        self.afterLoadNewsHooks.push('hangAFListener');
        self.afterInitHooks.push('initAntiFraud');

        self.timerFromScroll = null;
        self.secondsFromScroll = null;
        self.allowReturnParams = false;
        self.afCookieData = '';
        self.afCookieRealData = '';
        self.afPrimaryReferrer = '';
        self.afDeepSession = '';
        self.afOrigHref = ''; /* переменная хранит ссылку, по которой произошел клик. */
        self.afOrigHrefLink = ''; /* переменная хранит изначальный адрес ссылки, по которой произошел клик. */
        self.afMouseMoves = ''; /* строка, которая хранит траекторию передвижения курсора мыши (в виде координат), если было произведено смещение информера.  */
        self.afMgLoaded = '';
        self.afImgLoaded = '';

        /**
         * Constructor
         */
        self.initAntiFraud = function() {
            /* запись в куки первичного реферера, svspr - название куки */
            if (self.sharedCookieStorage['svspr'] == undefined) {
                self.afPrimaryReferrer = self.trimString(self.context.document.referrer, 500);
                self.sharedCookieStorage['svspr'] = self.afPrimaryReferrer;
                self.setCookie();
            } else {
                self.afPrimaryReferrer = self.sharedCookieStorage['svspr'];
            }

            if (self.sharedCookieStorage['svsds'] != undefined) {
                self.afDeepSession = self.sharedCookieStorage['svsds'];
                self.afDeepSession++;
            } else {
                self.afDeepSession = 1;
            }
            self.sharedCookieStorage['svsds'] = self.afDeepSession;
            self.setCookie();

            var d = new Date();
            /* переменная для хранения строки, которая записывается в cookie. */
            self.afCookieData = d.getTime() +
                '120193' + Math.floor(Math.random() * 100) +
                '' +
                (2 * Math.floor(Math.random() * 4));
            self.afCookieData += 1;

            self.afMgLoaded = d.getTime(); /* время загрузки скрипта. */

            if (self.sharedCookieStorage['TejndEEDj'] == undefined) {
                self.sharedCookieStorage['TejndEEDj'] = self.x64String(self.afCookieData);
                self.setCookie();
            }
        };

        /**
         * функция для перевода строки в кодировку base64. Для усложнения понимания злоумышленником работы системы,
         * также производится следующая замена символов в результирующей строке: «S» = «$», «f» = «*», «+» = «-», «/» = «_».
         * Строка символов для осуществления кодирования (b64c) представлена в виде escape-последовательностей.
         * @param {string} s
         * @returns {string}
         */
        self.x64String = function(s) {
            s = s.toString();
            s = unescape(encodeURIComponent(s));
            /* Настоящая строка - ABCDEFGHIJKLMNOPQR$TUVWXYZabcde*ghijklmnopqrstuvwxyz0123456789+-_ */
            var b64c = '\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x24\x54\x55\x56\x57\x58\x59\x5a\x61\x62\x63\x64\x65\x2a\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d';
            var b64e = '';
            var c1, c2, c3, c4, e1, e2, e3, e4;
            for (var i = 0; i < s.length;) {
                c1 = s.charCodeAt(i++);
                c2 = 2 << 5;
                e1 = c1 >> (c2 / 32);
                c3 = s.charCodeAt(i++);
                e2 = ((c1 & 3) << (c2 / 16)) | (c3 >> (c2 / 16));
                c4 = s.charCodeAt(i++);
                e3 = isNaN(c3) ? c2 : (((c3 & 15) << (c2 / 32)) | (c4 >> (c2 - 58)));
                e4 = isNaN(c4) ? c2 : (c4 & (c2 - 1));
                b64e += b64c.charAt(e1) + b64c.charAt(e2) + b64c.charAt(e3) + b64c.charAt(e4);
            }

            return b64e;
        };

        /**
         * функция для получения шестнадцатеричного представления числа.
         * @param {number|boolean} n - булевый тип конвертится в соответственные значения 0 и 1
         * @returns {string}
         */
        self.toHexString = function(n) {
            return n ? Math.round(n).toString(16) : '';
        };

        /**
         * функция обрезания строки до нужного размера.
         * @param {string} str
         * @param {number} n
         * @returns {string}
         */
        self.trimString = function(str, n) {
            return str.length > n ? str.substring(0, n) : str;
        };

        /**
         * функция получения координат элемента относительно документа
         * @param {Element} element
         * @returns { {x: number, y: number} }
         */
        self.getCoordsElementOfPage = function(element) {
            var offsetLeft = 0,
                offsetTop = 0;
            do {
                offsetLeft += element.offsetLeft;
                offsetTop += element.offsetTop;
            } while (element = element.offsetParent);

            return {
                'x': offsetLeft,
                'y': offsetTop
            };
        };

        /**
         * функция получения координат курсора мышки относительно документа
         * @param {MouseEvent} event
         * @returns { {x: number, y: number} }
         */
        self.getCoordsClickOfPage = function(event) {
            var x = 0,
                y = 0;
            if (!event) event = self.context.event;

            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY;
            } else if (event.clientX || event.clientY) {
                x = event.clientX + (self.context.document.documentElement.scrollLeft || self.context.document.body.scrollLeft) - self.context.document.documentElement.clientLeft;
                y = event.clientY + (self.context.document.documentElement.scrollTop || self.context.document.body.scrollTop) - self.context.document.documentElement.clientTop;
            }

            return {
                'x': x,
                'y': y
            };
        };

        /**
         * Получение флага браузера
         * @returns {number}
         */
        self.getBrowserFlag = function() {
            var browserFlag = 0;
            if (self.context.opera) {
                /* opera */
                browserFlag += 1;
            }
            if (self.context.opera && self.context.opera.buildNumber) {
                /* opera */
                browserFlag += 2;
            }
            if (self.context.document.all || self.context.MSStream) {
                /* ie */
                browserFlag += 4;
            }
            if (!self.context.btoa || self.context.navigator.msPointerEnabled) {
                /* ie */
                browserFlag += 8;
            }
            if (self.context.chrome) {
                /* chrome */
                browserFlag += 16;
            }
            if (self.context.mozInnerScreenX != undefined) {
                /* firefox */
                browserFlag += 32;
            }
            if (!self.context.external) {
                /* safari */
                browserFlag += 64;
            }

            return browserFlag;
        };

        /**
         * функция проверки поддержки java
         * @returns {boolean}
         */
        self.isJavaEnabled = function() {
            return self.context.navigator.javaEnabled()
        };

        /**
         * функция проверки поддержки flash
         * @returns {boolean}
         */
        self.isFlashEnabled = function() {
            var flashEnabled = false;
            /* Проверка для всех браузеров, кроме IE */
            if (typeof(self.context.navigator.plugins) != 'undefined' && typeof(self.context.navigator.plugins["Shockwave Flash"]) == 'object') {
                flashEnabled = true;
            } else if (typeof self.context.ActiveXObject != 'undefined') {
                /* Проверка для IE */
                try {
                    if (new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) {
                        flashEnabled = true;
                    }
                } catch (e) {}
            }

            return flashEnabled;
        };

        /**
         * Функция проверки прозрачности элемента
         * @param {Element} element
         * @returns {boolean}
         */
        self.isTransparent = function(el) {
            while (el.firstChild && el.firstChild.nodeType == 1) {
                el = el.firstChild;
            }
            while (el.parentNode) {
                if (self.context.getComputedStyle(el).getPropertyValue('opacity') <= 0.2) {
                    return true
                }
                if (el == self.context.document.body) {
                    break;
                }
                el = el.parentNode;
            }
            return false;
        };

        /**
         * Функция получения параметров
         * @param {MouseEvent} event
         * @param {Element} element
         */
        self.getAntifraudParams = function(event, element) {
            if (false == self.allowReturnParams) {
                return;
            }
            var element = element || self.context.document.createElement('A');
            var event = event || self.context.document.createEvent('MouseEvent');
            var date = new Date();
            var coordClickOfPage = self.getCoordsClickOfPage(event);
            var b = element.getBoundingClientRect();
            var coordLinkOfPage = self.getCoordsElementOfPage(element);
            var d = self.context.document;

            var browserFlag = self.getBrowserFlag();
            var tsp = self.isTransparent(element);

            var paramString = '';
            for (var i = 1; i <= Math.ceil((browserFlag + 1) / 68) * 34; i++) {
                if ((i % 26 == 0) || ((i % 26 == 6) && (((i % 26) + 5) % 11 == 0))) {
                    continue;
                }
                paramString += (i == 1 ? '' : String.fromCharCode(102)) +
                    String.fromCharCode(96 + (i % 26)) +
                    String.fromCharCode(83);
                var paramPart = '';
                if (i > 34) {
                    break;
                }
                /* Значимые параметры 1, 3, 4, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31 33, 34 */
                switch (i) {
                    case 1:
                        /* Cookie */
                        paramPart = self.afCookieData;
                        break;
                    case 2:
                        paramPart = self.toHexString(b.bottom);
                        break;
                    case 3:
                        /* Время загрузки */
                        paramPart = self.toHexString(self.afMgLoaded);
                        break;
                    case 4:
                        /* Время клика */
                        paramPart = self.toHexString(date.getTime());
                        break;
                    case 5:
                        paramPart = self.toHexString(d.body.clientheight);
                        break;
                    case 7:
                        /* X клика относительно окна */
                        paramPart = self.toHexString(event.clientX);
                        break;
                    case 8:
                        /* Y клика относительно окна */
                        paramPart = self.toHexString(event.clientY);
                        break;
                    case 9:
                        /* X ссылки относительно окна */
                        paramPart = self.toHexString(b.left);
                        break;
                    case 10:
                        paramPart = self.toHexString(self.secondsFromScroll);
                        break;
                    case 11:
                        /* Y ссылки относительно окна */
                        paramPart = self.toHexString(b.top);
                        break;
                    case 12:
                        paramPart = self.toHexString(d.body.clientheight - event.clientY);
                        break;
                    case 13:
                        /* ширина ссылки */
                        paramPart = self.toHexString(b.right - b.left);
                        break;
                    case 14:
                        /* высота ссылки */
                        paramPart = self.toHexString(b.bottom - b.top);
                        break;
                    case 15:
                        paramPart = self.afMouseMoves;
                        break;
                    case 16:
                        paramPart = self.toHexString(event.clientY);
                        break;
                    case 17:
                        /* браузер */
                        paramPart = self.toHexString(browserFlag);
                        break;
                    case 18:
                        /* признак наведения и движения мыши */
                        /* \x64\x61\x74\x61\x2d\x72\x65\x6C == data-rel */
                        paramPart = self.toHexString(element['\x64\x61\x74\x61\x2d\x72\x65\x6C']);
                        break;
                    case 19:
                        /* адрес страницы */
                        paramPart = self.trimString(d.location.href, 500);
                        break;
                    case 20:
                        /* реферер */
                        paramPart = self.trimString(d.referrer, 500);
                        break;
                    case 21:
                        /* первоначальный реферер */
                        paramPart = self.afPrimaryReferrer;
                        break;
                    case 22:
                        /* глубина сессии */
                        paramPart = self.toHexString(self.afDeepSession);
                        break;
                    case 23:
                        /* X клика относительно документа */
                        paramPart = self.toHexString(coordClickOfPage.x);
                        break;
                    case 24:
                        /* Y клика относительно документа */
                        paramPart = self.toHexString(coordClickOfPage.y);
                        break;
                    case 25:
                        /* X ссылки относительно документа */
                        paramPart = self.toHexString(coordLinkOfPage.x);
                        break;
                    case 27:
                        /* Y ссылки относительно документа */
                        paramPart = self.toHexString(coordLinkOfPage.y);
                        break;
                    case 28:
                        /* поддержка java */
                        paramPart = self.toHexString(self.isJavaEnabled());
                        break;
                    case 29:
                        /* поддержка flash */
                        paramPart = self.toHexString(self.isFlashEnabled());
                        break;
                    case 30:
                        /* разрешение экрана по горизонтали */
                        paramPart = self.toHexString(self.context.screen.width);
                        break;
                    case 31:
                        /* разрешение экрана по вертикали */
                        paramPart = self.toHexString(self.context.screen.height);
                        break;
                    case 33:
                        /* время загрузки первой картинки*/
                        paramPart = self.toHexString(self.afImgLoaded);
                        break;
                    case 34:
                        /* прозрачность элемента */
                        paramPart = self.toHexString(tsp);
                        break;
                }
                paramString += self.x64String(paramPart);
            }

            return encodeURIComponent(paramString);
        };

        /**
         * Перезапись ссылки
         * @param {Event} event
         * @param {Element} element
         */
        self.reWriteHref = function(event, element) {
            if (!event) var event = self.context.event;
            if (!event.target) {
                event.target = event.srcElement;
            }

            var hash = element['data-hash'] || element.getAttribute('data-hash');

            /* если element не тег а или нет атрибута хеш, то уходим */
            if (typeof(hash) == 'undefined' || element.tagName != 'A') {
                return;
            }

            element[self.hrefAttr] = self.prepareNiceHref(hash, event, element);
        };

        /**
         * Обработчик клика по ссылке
         * @param {MouseEvent} event
         */
        self.linkClick = function(event) {
            if (!event) var event = self.context.event;
            if (!event.target) {
                event.target = event.srcElement;
            }

            self.allowReturnParams = true;
            var element = event.target;
            if (element.tagName != 'A') {
                var element = self.getParentLink(element);

                if (null == element) {
                    return;
                }
            }

            if (!element.hasAttribute('data-hash')) {
                return;
            }

            self.reWriteHref(event, element);


            /* после нажатия прятаем антинакруточные параметры */
            self.context.setTimeout(function() {
                self.allowReturnParams = false;
                self.reWriteHref(event, element);
            }, 100);
        };

        /**
         * Обработчик наведения мыши
         * \x64\x61\x74\x61\x2d\x72\x65\x6C == data-rel
         * @param {MouseEvent} event
         */
        self.linkMouseOver = function(event) {
            if (!event) var event = self.context.event;
            if (!event.target) {
                event.target = event.srcElement;
            }

            self.allowReturnParams = true;
            var element = event.target;
            if (element.tagName != 'A') {
                var element = self.getParentLink(element);

                if (null == element) {
                    return;
                }
            }

            if (!element.hasAttribute('data-hash')) {
                return;
            }

            var v = 0;
            if (parseInt(element['\x64\x61\x74\x61\x2d\x72\x65\x6C'])) {
                v = parseInt(element['\x64\x61\x74\x61\x2d\x72\x65\x6C']);
            }

            if (v % 2 != 1) {
                element['\x64\x61\x74\x61\x2d\x72\x65\x6C'] = v + 1;
            }

            self.reWriteHref(event, element);
        };

        /**
         * Замеряем время от прокрутки до клика
         * @param {MouseEvent} event
         */
        self.timeFromScroll = function(event) {
            if (!event) var event = self.context.event;
            if (!event.target) {
                event.target = event.srcElement;
            }

            self.secondsFromScroll = 0;
            self.context.clearInterval(self.timerFromScroll);

            self.timerFromScroll = self.context.setInterval(function() {
                self.secondsFromScroll++;
            }, 1000);
        };

        /**
         * Обработчик движения мыши
         * \x64\x61\x74\x61\x2d\x72\x65\x6C == data-rel
         * @param {MouseEvent} event
         */
        self.linkMouseMove = function(event) {
            if (!event) var event = self.context.event;
            if (!event.target) {
                event.target = event.srcElement;
            }

            self.allowReturnParams = true;
            var element = event.target;
            if (element.tagName != 'A') {
                var element = self.getParentLink(element);

                if (null == element) {
                    return;
                }
            }

            if (!element.hasAttribute('data-hash')) {
                return;
            }

            var v = 0;

            if (parseInt(element['\x64\x61\x74\x61\x2d\x72\x65\x6C'])) {
                v = parseInt(element['\x64\x61\x74\x61\x2d\x72\x65\x6C']);
            }

            if ((v >> 1) % 2 != 1) {
                element['\x64\x61\x74\x61\x2d\x72\x65\x6C'] = v + 2;
            }

            self.reWriteHref(event, element);
        };

        /**
         * Фиксация загрузки картинки
         */
        self.fixTimeImageLoaded = function() {
            if (!self.afImgLoaded) {
                self.afImgLoaded = (new Date()).getTime();
            }
        };

        /**
         * Добавление слушателей собитий ссылки
         * @param {Element} element
         */
        self.hangAFListener = function(element) {
            if (typeof element == 'undefined') {
                element = self.root;
            }

            self.addEvent(element, "mouseup", self.linkClick);
            self.addEvent(element, "mouseover", self.linkMouseOver);
            self.addEvent(element, "mousemove", self.linkMouseMove);
            self.addEvent(self.context.document, "scroll", self.timeFromScroll);

            var regex = /\/\/img.*\/[\d]+\/([\d]+).*\.(jpg|gif)/;
            var images = self.root.getElementsByTagName('IMG');
            for (var i = 0; i < images.length; i++) {
                if (regex.exec(images[i].src)) {
                    self.addEvent(images[i], "load", self.fixTimeImageLoaded);
                }
            }
        };
    };
    this['MarketGidCAntifraudBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Antifraud'] = 'MarketGidCAntifraudBlock120193';
    MarketGidCResponsiveBlock120193 = function(self) {
        self.afterLoadNewsHooks.push("responsiveInit");

        self.responsiveInit = function() {
            self.ElementQueries.init();
            self.fixGetElementsByClassNameHandler(self.root);
            if (!self.fakeMode) {
                self.fixPrices();
                setTimeout(function() {
                    self.fixFlexbox();
                }, 100);
            }
        };

        self.fixElementPrice = function(element) {
            self.fixGetElementsByClassNameHandler(element);
            var priceArray = element.getElementsByClassName("mcpriceouter");
            for (var i = 0; i < priceArray.length; i++) {
                var parent = priceArray[i].parentNode;
                self.fixGetElementsByClassNameHandler(parent);
                var oldPriceArray = parent.getElementsByClassName("mcpriceold");
                if (priceArray[i].getBoundingClientRect()['bottom'] >= parent.getBoundingClientRect()['bottom']) {
                    for (var j = 0; j < oldPriceArray.length; j++) {
                        oldPriceArray[j].style.display = 'none';
                    }
                } else {
                    for (var j = 0; j < oldPriceArray.length; j++) {
                        oldPriceArray[j].style.display = 'inline-block';
                        if (priceArray[i].getBoundingClientRect()['bottom'] >= parent.getBoundingClientRect()['bottom']) {
                            oldPriceArray[j].style.display = 'none';
                        }
                    }
                }
            }
        };

        self.fixPrices = function() {
            var elements = self.root.getElementsByClassName("mgline");
            for (var i = 0; i < elements.length; i++) {
                (function(element) {
                    self.fixElementPrice(element);
                    element.resizeSensor = new self.ResizeSensor(element, function() {
                        self.fixElementPrice(element);
                    });
                })(elements[i]);
            }
        };

        self.fixFlexbox = function() {
            var s = self.context.document.body || self.context.document.documentElement,
                s = s.style;
            if (s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '') return true;

            var elements = self.root.getElementsByClassName("mgline");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.height = "auto";
            }
            setTimeout(function() {
                var maxH = 0;
                for (var i = 0; i < elements.length; i++) {
                    var rect = elements[i].getBoundingClientRect();
                    var elH = rect.bottom - rect.top;
                    if (elH > maxH) {
                        maxH = elH;
                    }
                }
                if (elH != 0) {
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].style.height = maxH + "px";
                    }
                }
                self.fixImages();
            }, 0);
        };

        self.fixImages = function() {
            setTimeout(function() {
                var needToRefresh = false;
                var els = self.root.getElementsByClassName("mcimg");
                for (var i = 0; i < els.length; i++) {
                    if (els[i].tagName == "DIV") {
                        var rect = els[i].getBoundingClientRect();
                        if (rect.bottom - rect.top <= 25) {
                            needToRefresh = true;
                            els[i].style.display = "none";
                            (function(el) {
                                setTimeout(function() {
                                    el.style.display = "block";
                                }, 0);
                            })(els[i]);
                        }
                    }
                }
                if (needToRefresh) {
                    self.fixFlexbox();
                }
            }, 200);
        };

        /**
         * Вспомогательная функция, которая генерирует хеш по строке
         * !длина хеша короткая (32 бита)
         * (например хеши для строк tessP и test1 одинаковы).
         * @param str
         * @returns {number}
         */
        function generateHash(str) {
            var hash = 0,
                i, chr, len;
            if (str.length == 0) {
                return hash;
            }
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; /* Convert to 32bit integer */
            }

            return hash;
        }

        /**
         * Далее следует код из https://github.com/marcj/css-element-queries
         * Код модифицирован под наши нужды, но требует указания лицензии
         */
        /*! Copyright (c) 2013 Marc J. Schmidt

         Permission is hereby granted, free of charge, to any person obtaining a copy
         of this software and associated documentation files (the "Software"), to deal
         in the Software without restriction, including without limitation the rights
         to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         copies of the Software, and to permit persons to whom the Software is
         furnished to do so, subject to the following conditions:

         The above copyright notice and this permission notice shall be included in
         all copies or substantial portions of the Software. */

        self.ElementQueries = function() {
            /**
             * @param {HTMLElement} element
             * @constructor
             */
            function SetupInformation(element) {
                this.element = element;
                this.options = {};
                var key, option, width = 0,
                    height = 0,
                    value, actualValue, attrValues, attrValue, attrName;

                /**
                 * @param {Object} option {mode: 'min|max', property: 'width|height', value: '123px'}
                 */
                this.addOption = function(option) {
                    var idx = [option.mode, option.property, option.value].join(',');
                    this.options[idx] = option;
                };

                var attributes = ['min-width', 'min-height', 'max-width', 'max-height'];

                /**
                 * Extracts the computed width/height and sets to min/max- attribute.
                 */
                this.call = function() {
                    /* extract current dimensions */
                    width = this.element.offsetWidth;
                    height = this.element.offsetHeight;

                    attrValues = {};

                    for (key in this.options) {
                        if (!this.options.hasOwnProperty(key)) {
                            continue;
                        }
                        option = this.options[key];

                        value = parseFloat(option.value);

                        actualValue = option.property == 'width' ? width : height;
                        attrName = option.mode + '-' + option.property;
                        attrValue = '';

                        if (option.mode == 'min' && actualValue >= value) {
                            attrValue += option.value;
                        }

                        if (option.mode == 'max' && actualValue <= value) {
                            attrValue += option.value;
                        }

                        if (!attrValues[attrName]) attrValues[attrName] = '';
                        if (attrValue && -1 === (' ' + attrValues[attrName] + ' ').indexOf(' ' + attrValue + ' ')) {
                            attrValues[attrName] += ' ' + attrValue;
                        }
                    }

                    for (var k in attributes) {
                        if (attrValues[attributes[k]]) {
                            this.element.setAttribute(attributes[k], attrValues[attributes[k]].substr(1));
                        } else {
                            this.element.removeAttribute(attributes[k]);
                        }
                    }
                };
            }

            /**
             * @param {HTMLElement} element
             * @param {Object}      options
             * @param {number}      queryHash
             */
            function setupElement(element, options, queryHash) {
                if (element.elementQueriesSetupInformation) {
                    element.elementQueriesSetupInformation.addOption(options);
                } else {
                    element.elementQueriesSetupInformation = new SetupInformation(element);
                    element.elementQueriesSetupInformation.addOption(options);
                    element.elementQueriesSensor = new self.ResizeSensor(element, function() {
                        element.elementQueriesSetupInformation.call();
                    }, queryHash);
                }
                element.elementQueriesSetupInformation.call();
            }

            /**
             * @param {String} selector
             * @param {String} mode min|max
             * @param {String} property width|height
             * @param {String} value
             */
            function queueQuery(selector, mode, property, value) {
                var query;
                var queryHash = generateHash(selector + mode + property + value);
                if (self.root.querySelectorAll && self.root.querySelectorAll.bind) query = self.root.querySelectorAll.bind(self.root);

                if (!query) {
                    return;
                }

                var elements = query(selector);
                for (var i = 0, j = elements.length; i < j; i++) {
                    setupElement(elements[i], {
                        mode: mode,
                        property: property,
                        value: value
                    }, queryHash);
                }
            }

            var regex = /,?([^,\n]*)\[[\s\t]*(min|max)-(width|height)[\s\t]*[~$\^]?=[\s\t]*"([^"]*)"[\s\t]*]([^\n\s\{]*)/mgi;

            /**
             * @param {String} css
             */
            function extractQuery(css) {
                var match;
                css = css.replace(/'/g, '"').replace(/(\[.*?\])([A-z\.-]*)/g, "$2$1");
                while (null !== (match = regex.exec(css))) {
                    if (5 < match.length) {
                        queueQuery(match[1] || match[5], match[2], match[3], match[4]);
                    }
                }
            }

            /**
             * @param {CssRule[]|String} rules
             */
            function readRules(rules) {
                var selector = '';
                if (!rules) {
                    return;
                }
                if ('string' === typeof rules) {
                    rules = rules.toLowerCase();
                    if (-1 !== rules.indexOf('min-width') || -1 !== rules.indexOf('max-width')) {
                        extractQuery(rules);
                    }
                } else {
                    for (var i = 0, j = rules.length; i < j; i++) {
                        if (1 === rules[i].type) {
                            selector = rules[i].selectorText || rules[i].cssText;
                            if (-1 !== selector.indexOf('min-height') || -1 !== selector.indexOf('max-height')) {
                                extractQuery(selector);
                            } else if (-1 !== selector.indexOf('min-width') || -1 !== selector.indexOf('max-width')) {
                                extractQuery(selector);
                            }
                        } else if (4 === rules[i].type) {
                            readRules(rules[i].cssRules || rules[i].rules);
                        }
                    }
                }
            }

            /**
             * Searches all css rules and setups the event listener to all elements with element query rules..
             */
            this.init = function() {
                var sSheets = self.context.document.styleSheets;
                for (var i = 0, j = sSheets.length; i < j; i++) {
                    try {
                        if (sSheets[i].ownerNode && sSheets[i].ownerNode.className == 'MarketGidC120193') {
                            readRules(sSheets[i].cssRules || sSheets[i].cssText || sSheets[i].rules);
                        }
                    } catch (err) { continue; }
                }
            };

            this.update = function() {
                this.init();
            };
        };

        self.ElementQueries.update = function() {
            self.ElementQueries.instance.update();
        };

        self.ElementQueries.init = function() {
            if (!self.ElementQueries.instance) {
                self.ElementQueries.instance = new self.ElementQueries();
            }

            self.ElementQueries.instance.init();
        };

        self.initElementQueries = function() {
            self.addEvent(self.context, "load", function() {
                self.ElementQueries.init();
            });
        };

        self.ResizeSensor = function(element, callback, queryHash) {
            /**
             *
             * @constructor
             */
            function EventQueue() {
                this.q = [];
                this.add = function(ev) {
                    this.q.push(ev);
                };

                var i, j;
                this.call = function() {
                    for (i = 0, j = this.q.length; i < j; i++) {
                        this.q[i].call();
                    }
                };
            }

            /**
             * @param {HTMLElement} element
             * @param {String}      prop
             * @returns {String|Number}
             */
            function getComputedStyle(element, prop) {
                if (element.currentStyle) {
                    return element.currentStyle[prop];
                } else if (self.context.getComputedStyle) {
                    return self.context.getComputedStyle(element, null).getPropertyValue(prop);
                } else {
                    return element.style[prop];
                }
            }

            /**
             *
             * @param {HTMLElement} element
             * @param {Function}    resized
             * @param {number}      queryHash
             */
            function attachResizeEvent(element, resized, queryHash) {
                if (!element.resizedAttached) {
                    element.resizedAttached = new EventQueue();
                    element.resizedAttached.add(resized);
                } else if (element.resizedAttached) {
                    element.resizedAttached.add(resized);
                    return;
                }

                if (!self.context.document.querySelector) return;

                var resizeSensorElement = self.context.document.querySelector('.resize-sensor.hash_' + queryHash);

                if (null == resizeSensorElement || !queryHash) {
                    element.resizeSensor = self.context.document.createElement('div');

                    if (queryHash) {
                        element.resizeSensor.className = 'resize-sensor hash_' + queryHash;
                    } else {
                        element.resizeSensor.className = 'resize-sensor';
                    }
                    var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';
                    var styleChild = 'position: absolute; left: 0; top: 0;';

                    element.resizeSensor.style.cssText = style;
                    element.resizeSensor.innerHTML =
                        '<div class="resize-sensor-expand" style="' + style + '">' +
                        '<div style="' + styleChild + '"></div>' +
                        '</div>' +
                        '<div class="resize-sensor-shrink" style="' + style + '">' +
                        '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' +
                        '</div>';
                    element.appendChild(element.resizeSensor);
                    var resizeSensorElement = element.resizeSensor
                }

                if (!{ fixed: 1, absolute: 1 }[getComputedStyle(element, 'position')]) {
                    element.style.position = 'relative';
                }

                var expand = resizeSensorElement.childNodes[0];
                var expandChild = expand.childNodes[0];
                var shrink = resizeSensorElement.childNodes[1];

                var lastWidth, lastHeight;

                var reset = function() {
                    expandChild.style.width = expand.offsetWidth + 10 + 'px';
                    expandChild.style.height = expand.offsetHeight + 10 + 'px';
                    expand.scrollLeft = expand.scrollWidth;
                    expand.scrollTop = expand.scrollHeight;
                    shrink.scrollLeft = shrink.scrollWidth;
                    shrink.scrollTop = shrink.scrollHeight;
                    lastWidth = element.offsetWidth;
                    lastHeight = element.offsetHeight;
                };

                reset();

                var changed = function() {
                    if (element.resizedAttached) {
                        element.resizedAttached.call();
                    }
                };

                self.addEvent(expand, 'scroll', function() {
                    if (element.offsetWidth > lastWidth || element.offsetHeight > lastHeight) {
                        changed();
                    }
                    reset();
                });

                self.addEvent(shrink, 'scroll', function() {
                    if (element.offsetWidth < lastWidth || element.offsetHeight < lastHeight) {
                        changed();
                    }
                    reset();
                });
            }

            if ("[object Array]" === Object.prototype.toString.call(element) ||
                ('undefined' !== typeof jQuery && element instanceof jQuery) ||
                ('undefined' !== typeof Elements && element instanceof Elements)
            ) {
                var i = 0,
                    j = element.length;
                for (; i < j; i++) {
                    attachResizeEvent(element[i], callback, queryHash);
                }
            } else {
                attachResizeEvent(element, callback, queryHash);
            }
        };

    };
    this['MarketGidCResponsiveBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Responsive'] = 'MarketGidCResponsiveBlock120193';
    MarketGidCCountersBlock120193 = function(self) {
        this.afterInitHooks.push("countersLoad");

        this.countersLoad = function() {

        };

        this.afterLoadNewsHooks.push("compositeComscoreCountersLoad");

        this.compositeComscoreCountersLoad = function() {
            if (!this.comscoreCompositeCounter) {
                this.comscoreCompositeCounter = true;
                this.context._comscore = this.context._comscore || [];
                var mirrorStr = ((this.loadedType == 'news') ? ('0' + '0') : ('1' + '10'));
                this.context._comscore.push({ c1: "7", c2: "15208452", c3: mirrorStr, c4: this.blockId });
                (function() {
                    var s = MarketGidInfC120193.context.document.createElement("script"),
                        el = MarketGidInfC120193.context.document.getElementsByTagName("script")[0];
                    s.async = true;
                    var scriptSrc = (MarketGidInfC120193.context.document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                    s.src = scriptSrc;
                    el.parentNode.insertBefore(s, el);
                })();
            }
        };
    };
    this['MarketGidCCountersBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Counters'] = 'MarketGidCCountersBlock120193';
    this['MarketGidCAdvertLinkBlock120193'] = function(self) {
        self.beforeLoadNewsHooks.push("refreshAdvertLink");
        self.afterLoadNewsHooks.push("initAdvertPopup");

        self.refreshAdvertLink = function() {
            if (parseInt('1')) {
                try {
                    var adLinkBlock = self.subnetMirrorsAdLinkBlocks[self.currentSubnet].replace(/%id/g, '120193');
                    var widgetTitle = "Promoted Content" || "";


                    adLinkBlock = adLinkBlock.replace(
                        "%WIDGET_TITLE%",
                        widgetTitle
                    );
                    var utm = '';
                    if (utm == '') {
                        utm = self.subnetMirrorsUtm[self.currentSubnet];
                    }
                    self.tickerPrefix = adLinkBlock.replace(/%utm/, utm);
                } catch (e) {}
            } else {
                self.tickerPrefix = '';
            }
        };

        /**
         * Парсинг рекламной ссылки в шаблоне информера
         */
        self.parseAdvertLink = function(template) {
            var marker = '<!--advertPrefix-->';
            var isMarkerInTheSecondPart = template.indexOf(marker) > (template.length / 2);

            /* Для резиновых информеров и если ссылка во второй половине шаблона
             необходимо убрать дублирование логотипа */
            if (isMarkerInTheSecondPart) {
                self.fixGetElementsByClassNameHandler(self.root);
                var elements = self.root.getElementsByClassName('mg_addad120193');
                for (var i = 0; i < elements.length; i++) {
                    elements[i].parentNode.removeChild(elements[i]);
                }
            }

            if (isMarkerInTheSecondPart || self.countLoadBlocks == 0) {
                if (template.indexOf(marker) >= 0) {
                    template = template.replace(marker, this.tickerPrefix);
                } else {
                    template = self.tickerPrefix + template;
                }
            }

            return template;
        };

        /**
         * Подвешивание рекламного попапа, по необходимости
         */
        self.initAdvertPopup = function() {

            /* Не загружены ли информер с iframe */
            if (self.context.top != self.context.self) {
                return;
            }

            /* Не банерный формат */
            if ('under-article-widget' == 'banner') {
                return;
            }

            /* Не попап */
            if ('under-article-widget' == 'exit-pop-up' || parseInt('0') > 0) {
                return;
            }

            /* Мобильное устройство */
            if (['tablet', 'desktop'].indexOf(self.deviceType) == -1) {
                return;
            }

            /* Мы не в предпросмотре каба */
            if (typeof self.context._mgDisableAdvertPopup != 'undefined') {
                return;
            }

            /* Мы не в конструкторе информеров */
            if (typeof MarketGidCConstructorBlock120193 == 'function') {
                return;
            }

            var adEl = self.root.querySelector('.mg_addad120193');

            if (adEl) {
                adEl.addEventListener("click", self.showAdvertPopup);
            }
        };

        /**
         * Инициализация и показ попапа
         *
         * @param event {Event}
         * @returns {boolean | null}
         */
        self.showAdvertPopup = function(event) {
            /* Если не задан аттрибут с сылкой на iframe попапа то выполняем клик как обычно */
            var srcEl = self.findClosest(event.target, '[data-advert-url]');
            if (!srcEl) {
                return null;
            }

            event.preventDefault();

            /* Размещаем рядом с родительской нодой так как elastic информер постоянно перерисовывает попап */
            var root = (self.realRoot != undefined ? self.realRoot : self.root).parentNode;

            var container = root.querySelector('._mgAdvertPopupC120193');
            var innerEl = root.querySelector('._mgPopupInner');

            var scrollTo = function(element, to, duration) {
                if (duration <= 0) return;
                var difference = to - element.scrollTop;
                var perTick = difference / duration * 10;

                setTimeout(function() {
                    element.scrollTop = element.scrollTop + perTick;
                    if (element.scrollTop === to) return;
                    scrollTo(element, to, duration - 10);
                }, 10);
            };

            if (!container) {
                /* Подгружаем шаблон попапа */
                var template = '<style>    ._mgAdvertPopupC120193 {        position: fixed;        width: 100%;        height: 100%;        top: 0px;        left: 0px;        font-family: "PTSans", Arial, sans-serif;        font-size: 16px;        color: #696969;        line-height: 1.3;        z-index: 999;        -webkit-box-sizing: border-box;        -moz-box-sizing: border-box;        box-sizing: border-box;    }    ._mgAdvertPopupC120193 iframe {        width: 100%;        height: 377px;    }    ._mgAdvertPopupC120193 ._mgPopupShadow {        position: absolute;        top: 0px;        left: 0px;        width: 100%;        height: 100%;        background-color: #000;        opacity: 0.4;        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";        z-index: 1;    }    ._mgAdvertPopupC120193 ._mgPopupInner {        position: relative;        top: 50%;        margin-left: -375px;        left: 50%;        padding: 36px;        width: 750px;        background-color: #f8f8f8;        z-index: 2;        -webkit-box-sizing: border-box;        -moz-box-sizing: border-box;        box-sizing: border-box;    }    ._mgAdvertPopupC120193 ._mgPopupInner.fixPop {        position: absolute!important;        top: 30px!important;        margin-top: 0!important;    }    ._mgAdvertPopupC120193 ._mgClosePopup {        position: absolute;        overflow: hidden;        top: 5px;        right: 5px;        height: 21px;        width: 21px;        text-indent: -9999px;        background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALAgMAAADUwp+1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEVmZmZmZmb///+E1CFqAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAlSURBVAjXY3BgYGEQAEIWBgcGRkYGBgYXIBaA0CA+SBwkD1QHACp2Ae2BHO8IAAAAAElFTkSuQmCC\') no-repeat center center;        background-color: transparent;    }    ._mgAdvertPopupC120193 ._mgClosePopup:hover {        background-color: #dfdfdf;    }</style><div class="_mgAdvertPopupC120193">    <div class="_mgPopupShadow"></div>    <div class="_mgPopupInner">        <a href="#" class="_mgClosePopup" title="Close"></a>        <iframe frameborder="0"></iframe>    </div></div>';
                var elements = self.htmlToElements(template);

                for (var i = 0; i < elements.length; i++) {
                    root.appendChild(elements[i]);
                }

                container = root.querySelector('._mgAdvertPopupC120193');

                /* Уходим если в загруженом шаблоне контейнер попапа не найден */
                if (!container) {
                    return false;
                }

                innerEl = container.querySelector('._mgPopupInner');

                var shadowEl = container.querySelector('._mgPopupShadow');

                /* Подставляем более корректный отступ сверху */
                innerEl.style.marginTop = -(innerEl.clientHeight / 2) + 'px';

                /* hide select-options on outer click */
                shadowEl.addEventListener('click', function(event) {
                    if (null == self.findClosest(event.target, '._mgPopupInner')) {
                        container.setAttribute('style', 'display: none');
                    }
                });

                /* close button */
                var closeButton = container.querySelector('._mgClosePopup');
                if (closeButton) {
                    closeButton.addEventListener('click', function(event) {
                        container.setAttribute('style', 'display: none');
                    })
                }

                /* Установка сылки для iframe */
                var iframe = container.querySelector('iframe');
                iframe.setAttribute('src', srcEl.getAttribute('data-advert-url'));

                /* Определяем корректный метод для текущего браузера */
                var eventMethod = self.context.addEventListener ? "addEventListener" : "attachEvent";
                var eventer = self.context[eventMethod];
                var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

                /* Слушаем сообщение из попапа, он сообщит свои размеры при изминении */
                eventer(messageEvent, function(e) {
                    var key = e.message ? "message" : "data";
                    var data = JSON.parse(e[key]);
                    /* Уходим если это не сообщение из попапа */
                    if (typeof data.target == 'undefined' || data.target != 'correct-popup-height') {
                        return true;
                    }

                    /* корректируем высоту блока iframe */
                    iframe.style.height = data.height + 'px';

                    /* Для мобильного сафари немного костылей, он не понимает фиксированного позиционирования */
                    if (data.safariIPad) {
                        if (data.keyboard) {
                            scrollTo(self.context.document.body, 0, 500);
                            innerEl.classList.add('fixPop');
                        } else {
                            innerEl.classList.remove('fixPop');
                        }
                    }

                    /* корректируем отступы */
                    innerEl.style.marginTop = -(innerEl.clientHeight / 2) + 'px';
                }, false);
            }

            container.setAttribute('style', 'display: block');

            if (innerEl.className.indexOf('fixPop') >= 0) {
                scrollTo(self.context.document.body, 0, 500);
            }
        };
    };
    this['MarketGidCAdvertLinkBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['AdvertLink'] = 'MarketGidCAdvertLinkBlock120193';
    /**
     * Блок кнопки блокировки тизера в информере.
     * @param self
     */
    this['MarketGidCRejectBlock120193'] = function(self) {
        self.isInsertedRejectStyles = false;

        self['MarketGidReject'] = function() {
            var baseUrl = self.subnetDashboardDomains[self.getSubnetByMirror('marketgid')];

            self.fixGetElementsByClassNameHandler(self.root);
            var mglines = self.root.getElementsByClassName('mgline');
            for (var i = 0; i < mglines.length; i++) {
                (function(mgline) {
                    if (mgline.className.indexOf('dsp') >= 0) {
                        return;
                    }
                    self.fixGetElementsByClassNameHandler(mgline);
                    var imgList = mgline.getElementsByClassName('mcimg');
                    var img = false;
                    for (var j = 0; j < imgList.length; j++) {
                        if (imgList[j].tagName == "DIV") {
                            img = imgList[j];
                            break;
                        }
                    }
                    if (!img) {
                        return;
                    }

                    self.fixGetElementsByClassNameHandler(img);
                    var el = img.getElementsByClassName('close-informer');
                    var matchId = mgline.className.match(/teaser-([0-9]+)/);
                    if (null == matchId) {
                        return;
                    }
                    var matchType = mgline.className.match(/type-(w|e|i)/);
                    if (null == matchType || matchType[1] == 'i') {
                        return;
                    }
                    if (el.length == 0) {
                        var url = baseUrl;
                        url += '/publisher/blocked';
                        var a = self.context.document.createElement('a');
                        var imgStyles = self.context.getComputedStyle(img);
                        a.className = "close-informer";
                        a.href = url + '/teaser/' + matchId[1] + '/widget/' + (matchType[1] == 'w' ? '5565583/type/goods' : '/type/news');
                        a.target = '_blank';
                        a.rel = "nofollow";
                        a.style.top = (parseInt(imgStyles.borderTopWidth) + 3) + 'px';
                        a.style.right = (parseInt(imgStyles.borderRightWidth) + 3) + 'px';
                        img.style.position = "relative";
                        img.appendChild(a);
                    }

                })(mglines[i]);
            }
        };

        self.initRejectStyles = function() {
            if (self.isInsertedRejectStyles) {
                return;
            }

            var rejectStyles = '\
        div.mcimg a.close-informer {\
            width: 14px;\
            height: 14px;\
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NzI0ODBDMzY3ODcxMUU1OEM4RUU2RUJCOUREODIyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NzI0ODBDNDY3ODcxMUU1OEM4RUU2RUJCOUREODIyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk3MjQ4MEMxNjc4NzExRTU4QzhFRTZFQkI5REQ4MjJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk3MjQ4MEMyNjc4NzExRTU4QzhFRTZFQkI5REQ4MjJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+uNcpEQAAAHxJREFUeNqckgEKwCAIRe3fYjfKc2zX6hydaLRbbDnGkLDIPggl/5lKIcbIRJRqbDSnUmOHE6LPm+CEfhj6lnN+o5WVh1VOm6xColCXc/cgLWYev9gaejnQojCab5RDzyDt6RantqoBaz5zq54ZywJ3CXjIwQGd8skfAQYALdQqftYulocAAAAASUVORK5CYIJ0ZW50Ij4NCiA8ZGl2IGNsYXNzPSJjb250ZW50LWNvbnRhaW5lciI+PGZpZWxkc2V0Pg0KICA8aDI+NTAyIC0gV2ViIHNlcnZlciByZWNlaXZlZCBhbiBpbnZhbGlkIHJlc3BvbnNlIHdoaWxlIGFjdGluZyBhcyBhIGdhdGV3YXkgb3IgcHJveHkgc2VydmVyLjwvaDI+DQogIDxoMz5UaGVyZSBpcyBhIHByb2JsZW0gd2l0aCB0aGUgcGFnZSB5b3UgYXJlIGxvb2tpbmcgZm9yLCBhbmQgaXQgY2Fubm90IGJlIGRpc3BsYXllZC4gV2hlbiB0aGUgV2ViIHNlcnZlciAod2hpbGUgYWN0aW5nIGFzIGEgZ2F0ZXdheSBvciBwcm94eSkgY29udGFjdGVkIHRoZSB1cHN0cmVhbSBjb250ZW50IHNlcnZlciwgaXQgcmVjZWl2ZWQgYW4gaW52YWxpZCByZXNwb25zZSBmcm9tIHRoZSBjb250ZW50IHNlcnZlci48L2gzPg0KIDwvZmllbGRzZXQ+PC9kaXY+DQo8L2Rpdj4NCjwvYm9keT4NCjwvaHRtbD4NCg==");\
            display: block;\
            opacity: 0;\
            position: absolute;\
            right: 3px;\
            top: 3px;\
            z-index: 1;\
            cursor: pointer;\
        }\
        div.mgline:hover a.close-informer {\
            opacity: 0.7;\
            -moz-transition: all 0.3s ease-out;\
            -o-transition: all 0.3s ease-out;\
            -webkit-transition: all 0.3s ease-out;\
            -ms-transition: all 0.3s ease-out;\
            transition: all 0.3s ease-out;\
        }\
        div.mgline a.close-informer:hover {\
            opacity: 1;\
            -moz-transition: all 0.3s ease-out;\
            -o-transition: all 0.3s ease-out;\
            -webkit-transition: all 0.3s ease-out;\
            -ms-transition: all 0.3s ease-out;\
            transition: all 0.3s ease-out;\
        }\
        div.mcimg {\
            position: relative;\
            display: inline-block\
        }\
        div.image-with-price {\
            position: relative;\
        }\
        .mgline .image-container {\
            width: auto;\
            margin: 0 auto;\
            display: table;\
            position: relative;\
        }';

            self.styles += rejectStyles;

            self.isInsertedRejectStyles = true;
        };

        self.beforeLoadNewsHooks.push('initRejectStyles');
    };
    this['MarketGidCRejectBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Reject'] = 'MarketGidCRejectBlock120193';
    MarketGidCCriteoBlock120193 = function(self) {
        self.context.LoadCriteoAllPlaces = function(params) {
            self.criteoNurl = params.l;
            var s = self.context.document.createElement('script');
            self.criteoParams = params.pos;
            s.type = 'text/javascript';
            s.src = '//cas.criteo.com/delivery/0.1/napi.jsonp?zoneid=' + params.z + '&callback=ProcessCriteo&publisherid=' + self.blockId;
            var h = self.context.document.getElementsByTagName('script')[0];
            h.parentNode.insertBefore(s, h);
        };
        self.context.ProcessCriteo = function(response) {
            if (response.response_status === 0 && response.products.length >= self.json.length) {
                self.countLoadBlocks = 0;
                self.root.innerHTML = '';
                self.iteration = 1;
                self.blockIds = [];
                var data = self.json;
                var advDomain = "";
                if ("advertiser" in response && "domain" in response.advertiser) {
                    advDomain = response.advertiser.domain;
                }
                var host = 7 === 1 ? 'marketgid' : 'mgid';
                var placements = response.products.length;
                for (var k = 0; k <= placements; k++) {
                    self.criteoPlacement = k;
                    if (data[k] == undefined) {
                        continue;
                    }
                    data[self.criteoPlacement][0] = advDomain;
                    data[self.criteoPlacement][1] = k + 1;
                    data[self.criteoPlacement][3] = response.products[k].title;
                    data[self.criteoPlacement][4] = response.products[k].description;
                    data[self.criteoPlacement][7] = response.products[k].price;
                    data[self.criteoPlacement][8] = "";
                    data[self.criteoPlacement][10].i = "//imggprx." + host + ".com/i/resize?img=" + encodeURIComponent(response.products[k].image.url) + "&size=18";
                    data[self.criteoPlacement][10].l = self.criteoParams[k] + "&u=" + self.tox64String(response.products[k].click_url);
                    data[self.criteoPlacement][10].adc = [];
                }
                self.MarketGidLoadNews(data);
                for (var k = 0; k <= placements; k++) {
                    self.criteoPlacement = k;
                    if (data[k] == undefined) {
                        continue;
                    }
                    if (response.hasOwnProperty('privacy') && response.privacy.hasOwnProperty('optout_click_url') && response.privacy.hasOwnProperty('optout_image_url')) {
                        var imgElement = self.root.getElementsByClassName('mgline')[self.criteoPlacement].getElementsByClassName('mcimg')[0];
                        var privacyDiv = self.context.document.createElement('DIV');
                        privacyDiv.style.position = 'absolute';
                        privacyDiv.style.zIndex = '100';
                        privacyDiv.style.left = '90%';
                        privacyDiv.style.top = '0';
                        var privacyHref = self.context.document.createElement('A');
                        privacyHref.setAttribute('href', response.privacy.optout_click_url);
                        privacyHref.setAttribute('target', "_blank");
                        var privacyImg = self.context.document.createElement('IMG');
                        privacyImg.setAttribute('src', response.privacy.optout_image_url);
                        privacyHref.appendChild(privacyImg);
                        privacyDiv.appendChild(privacyHref);
                        imgElement.appendChild(privacyDiv);

                        if (response.hasOwnProperty('impression_pixels')) {
                            for (var i in response.impression_pixels) {
                                if (response.impression_pixels[i].hasOwnProperty('url')) {
                                    var im = self.context.document.createElement('IMG');
                                    im.src = response.impression_pixels[i].url;
                                    self.context.document.body.appendChild(im)
                                }
                            }
                        }
                        var n = self.context.document.createElement('IMG');
                        n.src = self.criteoNurl;
                        self.context.document.body.appendChild(n);
                    }
                }
            }
        };
    };
    this['MarketGidCCriteoBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Criteo'] = 'MarketGidCCriteoBlock120193';
    MarketGidCSendDimensionsBlock120193 = function(self) {
        self.blankImage = "data:image/gif;base64,R0lGODlhSAFIAfAAAAAAAAAAACH5BAEAAAAALAAAAABIAUgBAAL+hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u7+Dh8vP09fb3+Pn6+/z9/v/w8woMCBBAsaPIgwocKFDBs6fAgxosSJFCtavIgxo8bTjRw7evwIMqTIkSRLmjyJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWr2KNavWrVy7ev0KNqzYsWTLmj2LNq3atWzbun0LN67cuXTr2r2LN6/evXz7+v0LOLDgwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmz6NOrXq1axbu34NO7bs2bRr276NO7fu3bx7+/4NPLjw4cSLGz+OPLny5cybO38OPbr06awKAAA7";

        self.precalcRect = {};

        self.updatePrecalcRect = function() {
            self.loadedType = "goods";
            self.currentSubnet = '0';
            self.fakeMode = true;
            var realRoot = self.root;
            var cnt = self.context.document.createElement('div');
            var newRoot = self.context.document.createElement('div');
            newRoot.id = self.root.id;
            self.root.id += "_";
            cnt.appendChild(newRoot);
            self.root.appendChild(cnt);
            self.root = newRoot;
            realRoot.style.height = "0px";
            realRoot.style.overflow = "hidden";

            var countNews = 9;

            var lorem = "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet";

            var data = [];
            for (var i = 1; i <= countNews; i++) {
                data.push(['', i, '', lorem, lorem, '', '', '', '', '', { i: self.blankImage }]);
            }
            self.MarketGidLoadNews(data);

            var h = self.getViewportHeight();
            self.fixGetElementsByClassNameHandler(self.root);
            var widgetRect = self.root.getBoundingClientRect();
            if (self.root.getElementsByClassName("mgbox")[0]) {
                widgetRect = self.root.getElementsByClassName("mgbox")[0].getBoundingClientRect();
            }
            self.precalcRect.width = parseInt(widgetRect.width ? widgetRect.width : widgetRect.right - widgetRect.left);
            self.precalcRect.height = parseInt(widgetRect.height ? widgetRect.height : widgetRect.bottom - widgetRect.top);
            self.precalcRect.top = widgetRect.top;
            self.precalcRect.bottom = widgetRect.bottom;
            self.requestParams.w = "w=" + self.precalcRect.width;
            self.requestParams.h = "h=" + self.precalcRect.height;

            var cols = 0;

            var elx = self.root.getElementsByClassName('mgline');
            for (i = 0; i < elx.length; i++) {
                var rect = elx[i].getBoundingClientRect();
                if (prepTop != undefined && prepTop < rect.top) { cols = i; break; }
                var prepTop = rect.top;
            }

            if (cols == 0) {
                cols = elx.length;
            }

            self.requestParams.cols = "cols=" + cols;
            self.fakeMode = false;
            self.root = realRoot;
            self.root.removeChild(cnt);
            self.root.id = self.root.id.substr(0, self.root.id.length - 1);
            self.root.style.height = "auto";
            self.root.style.overflow = "visible";
            self.loadedType = "";
            self.currentSubnet = "";
            self.countLoadBlocks = 0;
            self.template = "";
            self.iteration = 1;
            self.blockIds = {};
        };

        this.afterInitHooks.push("updatePrecalcRect");
    };
    this['MarketGidCSendDimensionsBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['SendDimensions'] = 'MarketGidCSendDimensionsBlock120193';
    MarketGidCMonitorBlock120193 = function(self) {
        this.afterLoadNewsHooks.push("monitorInit");

        this.shownBlocks = {};

        this.monitorTimeout = null;

        this.isFirstCappingRequest = true;

        this.isFirstByType = {};

        this.monitorInit = function() {
            var regex = /\/\/img.*\/[\d]+\/([\d]+).*\.(jpg|gif)/;
            if (!this.monitorTimeout) {
                (function() {
                    var newBlocks = {};
                    var viewportSize = self.utils.getViewportSize();
                    var images = self.root.getElementsByTagName('IMG');
                    for (var i = 0; i < images.length; i++) {
                        if (self.isElementInViewport(images[i])) {
                            var res = regex.exec(images[i].src);
                            if (!res) {
                                if (images[i].dataset.i) {
                                    res = [];
                                    res[1] = images[i].dataset.i;
                                }
                            }
                            if (res && res[1] && !self.shownBlocks[res[1]]) {
                                var teaserBlock = self.getParentTeaserBlock(images[i]);
                                var imageRect = self.utils.getRect(images[i], true);
                                if (teaserBlock) {
                                    var teaserDims = self.utils.getRect(teaserBlock, true);
                                    newBlocks[res[1]] = {
                                        width: Math.round(imageRect.width),
                                        height: Math.round(imageRect.height),
                                        atf: teaserDims.top < viewportSize.height,
                                        align: self.getTeaserAlign(teaserDims),
                                        desc: self.isTeaserElementVisible(teaserBlock, 'mcdesc'),
                                        price: self.isTeaserElementVisible(teaserBlock, 'mcprice'),
                                        domain: self.isTeaserElementVisible(teaserBlock, 'mcdomain')
                                    };
                                } else {
                                    newBlocks[res[1]] = {
                                        width: Math.round(imageRect.width),
                                        height: Math.round(imageRect.height),
                                        desc: false,
                                        price: false,
                                        domain: false
                                    };
                                }
                                self.shownBlocks[res[1]] = 1;
                            }
                        }
                    }
                    self.prepareCappingData(newBlocks);
                    self.monitorTimeout = setTimeout(arguments.callee, 1000);
                })();
            }
        };

        this.prepareCappingData = function(blocks) {
            var typePrefix = "&t=" + (self.loadedType == 'news' ? "N" : "G");
            var data = "";
            var counter = 0;
            for (var i in blocks) {
                /** @link http://redmine.dt00.net:3001/projects/docs/wiki/Кеппинг#Клиентская-часть */
                var prefix = blocks[i].width + "|" +
                    blocks[i].height + "|" +
                    ((blocks[i].desc ? 1 : 0) +
                        (blocks[i].price ? 2 : 0) +
                        (blocks[i].domain ? 4 : 0) +
                        (blocks[i].atf ? 8 : 0) +
                        (blocks[i].align == 'right' ? 16 : 0) +
                        (blocks[i].align == 'left' ? 32 : 0)) + "|";
                var showHash = self.teaserHashes[i];
                data += "&v=" + prefix + showHash;
                if (self.teaserData[showHash] && self.teaserData[showHash]['coopType']) {
                    var type = self.teaserData[showHash]['coopType'];
                    if (!self.isFirstByType[type]) {
                        data += '&f' + type + "=1";
                        self.isFirstByType[type] = 1;
                    }
                }
                counter++;
                if (counter > 20) {
                    self.sendCappingData(typePrefix + data);
                    data = "";
                    counter = 0;
                }
            }
            if (data != "") {
                self.sendCappingData(typePrefix + data);
            }
        };

        this.sendCappingData = function(data) {
            var img = document.createElement('IMG');
            if (self.isFirstCappingRequest) {
                data = "&f=1" + data;

                self.isFirstCappingRequest = false;
                if (self.servicerData && self.servicerData.tt) {
                    data += '&tt=' + self.servicerData.tt;
                }
                if (self.servicerData && self.servicerData.ts) {
                    data += '&ts=' + self.servicerData.ts;
                }
            }
            data += "&cid=" + '120193';
            if (self.servicerData && self.servicerData.h2) {
                data += '&h2=' + self.servicerData.h2;
            }
            var scriptSrc = "//c." + (self.currentSubnet == 2 ? "adskeeper.co.uk" : "mgid.com") + "/c?pv=2" + data;
            img.src = scriptSrc;
            img.onerror = function() {
                self.mg_ws.onmessage = function(evt) {};
                self.sendMessage('c|' + scriptSrc);
            };
        };

        this.isElementInViewport = function(el) {
            var rect = self.utils.getRect(el, false);
            var viewport = self.utils.getViewportSize();
            return (
                rect.height > 0 &&
                rect.width > 0 &&
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= viewport.height &&
                rect.right <= viewport.width
            );
        };

        this.getParentTeaserBlock = function(el) {
            var current = el;
            while (current != self.root && current != self.context) {
                if (current.className.indexOf("mgline") >= 0) {
                    return current;
                } else {
                    current = current.parentNode;
                }
            }
            return null;
        };

        this.isTeaserElementVisible = function(el, className) {
            self.fixGetElementsByClassNameHandler(el);
            var elements = el.getElementsByClassName(className);
            if (elements.length > 0) {
                var dims = elements[0].getBoundingClientRect();
                if (dims.right - dims == 0 || dims.bottom - dims.top == 0) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        };

        /**
         * Возвращает положение тизера на странице
         * @param teaserDims
         * @returns {*} (left|right|center)
         */
        this.getTeaserAlign = function(teaserDims) {
            var bodyWidth = self.context.document.body.scrollWidth;
            if (teaserDims.right < 0.3 * bodyWidth) {
                return 'left';
            } else if (teaserDims.left >= 0.7 * bodyWidth) {
                return 'right'
            } else {
                return 'center';
            }
        };
    };
    this['MarketGidCMonitorBlock120193'].call(this['MarketGidInfC120193'], this['MarketGidInfC120193']);
    this['MarketGidInfC120193']['funcBlocks']['Monitor'] = 'MarketGidCMonitorBlock120193';


    MarketGidInfC120193.init();
    MarketGidInfC120193.start();
}