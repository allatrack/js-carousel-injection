'use strict';

(function() {

    function MGInjector(rootId, mainDOM) {

        this.rootId = rootId;
        this.mainDOM = mainDOM;
        this.mgRoot = this.mainDOM.getElementById("MScriptRootС" + rootId);

        this.template =
            '<div class="mgbox"> \
                <div class="mgheader"><span class="mghead">Promoted Content</span> \
                    <div class="mg_addad"><a href="https://www.mgid.com/" target="_blank" rel="nofollow">by<img src="img/mgid_logo_mini_43x20.png" alt="Mgid" title="Mgid"></a></div> \
                </div> \
                <div class="slider-box"> \
                    <ul class="slider" id="slider"> \
                        {% for (var i=0; i<o.length; i++) { %} \
                            <li class="mgline teaser-{%=o[i][1]%} type-{%=o[i][10].type%}"> \
                                <div class="image-with-text"> \
                                    <div class="mcimg"> \
                                        <a href="{%=encodeURI(o[i][10].l)%}" data-hash="{%#o[i][9]%}" target="_blank" rel="nofollow"> \
                                            <div class="image-container"><img class="mcimg" data-i="{%=o[i][1]%}" src="{%=encodeURI(o[i][10].i)%}"></div> \
                                        </a> \
                                    </div> \
                                    <div class="text-elements"> \
                                        <div class="text-on-hover"> \
                                            <div class="mctitle"><a href="{%=encodeURI(o[i][10].l)%}" data-hash="{%#o[i][9]%}" target="_blank" rel="nofollow">{%=o[i][3]%}</a></div> \
                                            <div class="fake"> \
                                                <div class="mcdomain"> \
                                                    <a target="_blank" href="{%=encodeURI(o[i][10].dl)%}" data-hash="{%#o[i][9]%}" rel="nofollow">{%=o[i][0]%}</a> \
                                                </div> \
                                            </div> \
                                            <div class="mgtobottom"> \
                                                <div class="mcdomain"><a href="{%=encodeURI(o[i][10].l)%}" data-hash="{%#o[i][9]%}" target="_blank" rel="nofollow">{%=o[i][0]%}</a></div> \
                                            </div> \
                                        </div> \
                                    </div> \
                                </div> \
                            </li> \
                        {% } %} \
                    </ul> \
                    <div class="slider-prev" id="slider-prev"><img src="img/scroll-arrow-to-left.svg"></div> \
                    <div class="slider-next" id="slider-next"><img src="img/scroll-arrow-to-right.svg"></div> \
                </div> \
            </div>';

        this.styles = '#MarketGidComposite{display:block}#MarketGidComposite .mgbox{height:321px;min-width:90px;line-height:100%;margin:0 auto;position:relative;overflow:hidden;vertical-align:top;text-align:center;padding:0;border:1px solid #bfbfbf}#MarketGidComposite .mgheader{width:100%;display:block}#MarketGidComposite .mghead{color:#2f3b82;font:normal 700 14px "Open sans",sans-serif;text-transform:uppercase;text-align:left;display:block;margin:8px 0 0 15px;float:left}#MarketGidComposite .mg_addad{text-align:right;opacity:.5;margin:6px 15px 0 0;float:right}#MarketGidComposite .mg_addad:hover{opacity:.8}#MarketGidComposite .mg_addad a{color:#000;font:normal normal normal 10px "Open sans",sans-serif;text-decoration:none}#MarketGidComposite .mg_addad a img{display:inline-block;padding-bottom:0;width:auto;border:none;margin:0 -5px -4px 0}#MarketGidComposite .slider{width:2100px;height:450px;position:absolute;left:0;top:10px;list-style:none;padding-left:0;-webkit-transition:top 1s ease-out .5s;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out}#MarketGidComposite .mgline{float:left;display:block;border:1px solid #bfbfbf;margin:10px 5px;min-width:90px;width:10.5111%;max-width:10.5111%;padding:0;opacity:1;;-webkit-transition:top 1s ease-out .5s;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out}#MarketGidComposite .image-with-text{display:block;width:100%;max-width:328px;min-height:1px;margin:0 auto}#MarketGidComposite .mcimg{width:100%;height:auto;display:block;max-width:328px;max-height:328px}#MarketGidComposite .mcimg .image-container{width:auto;margin:0 auto}#MarketGidComposite .text-elements{display:block}#MarketGidComposite .text-elements .mctitle{margin:2px 15px 0 10px;display:block;height:39px;overflow:hidden;text-align:left}#MarketGidComposite .text-elements .mctitle a{text-decoration:none;color:#4f81bd;font:normal 700 13px/110% "Open sans",sans-serif}#MarketGidComposite .text-elements .fake{display:block;visibility:hidden;height:2px}#MarketGidComposite .text-elements .fake .mcdomain{display:block;overflow:hidden;padding:0 4px 4px;text-align:left}#MarketGidComposite .text-elements .fake .mcdomain a{padding:0 0 2px 6px;color:#bbb;text-decoration:none;font:normal normal 10px/10px "Open sans",sans-serif}#MarketGidComposite .text-elements .mgtobottom{display:block;width:100%;max-width:328px;margin:0 auto;text-align:left}#MarketGidComposite .text-elements .mgtobottom .mcdomain{display:block;overflow:hidden;padding:0 4px 4px;text-align:left}#MarketGidComposite .text-elements .mgtobottom .mcdomain a{padding:0 0 2px 6px;color:#bbb;text-decoration:none;font:normal normal 10px/10px "Open sans",sans-serif}#MarketGidComposite .slider-next,#MarketGidComposite .slider-prev{display:block;cursor:pointer;position:absolute;top:45%;width:40px;height:40px;background-color:#fff;border-right:1px solid #bfbfbf;border-top:1px solid #bfbfbf;border-bottom:1px solid #bfbfbf;-webkit-transition:top 1s ease-out .5s;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out}#MarketGidComposite .slider-next img,#MarketGidComposite .slider-prev img{width:20px;height:40px}#MarketGidComposite .slider-next:hover,#MarketGidComposite .slider-prev:hover{opacity:.8}#MarketGidComposite .slider-next{right:0}'

        this.appendJS = function(src) {
            var script = this.mainDOM.createElement('script');
            script.type = 'text/javascript';
            script.charset = 'utf-8';
            script.src = src;
            this.mgRoot.appendChild(script);
        }

        this.appendTemplate = function() {
            var script = this.mainDOM.createElement('script');
            script.type = 'text/x-tmpl';
            script.id = 'tmpl-carousel';
            script.text = this.template;
            this.mgRoot.appendChild(script);
        }

        this.appendStyles = function() {
            var style = this.mainDOM.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = this.styles;
            } else {
                style.appendChild(document.createTextNode(this.styles));
            }
            this.mgRoot.appendChild(style);
        }

        this.run = function() {
            var div = this.mainDOM.createElement('div');
            div.id = "MarketGidComposite";
            this.mgRoot.appendChild(div);
            this.appendJS("hammer.min.js");
            this.appendJS("hammer-time.min.js");
            this.appendJS("tmpl.min.js");
            this.appendJS("data.js");
            this.appendJS("visibility.js");
            this.appendTemplate();
            this.appendStyles();

            this.appendJS("carousel.js");
        }
    }

    var mGInjector = new MGInjector(document.getElementById("MG_ID").innerHTML, parent.window.document);
    mGInjector.run();

})();