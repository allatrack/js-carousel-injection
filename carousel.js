(function() {
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

    function MGCarousel() {

        this.rootId = '';
        this.mgboxWidth = 0;
        this.currentFirstVisibleIndex = 0;
        this.currentLastVisibleIndex = 0;
        this.currentCarouselShift = 0;
        this.lastSlidePartialVisible = true;
        this.firstSlidePartialVisible = false;
        this.slides = [];

        this.transitionalMoving = false;
        this.movingSide = 'none';

        this.mouseXCoord = 0;

        this.init = function(rootId) {
            this.rootId = rootId;
            var currentGoodsIndex = _mgq[0].findIndex(function(el) {
                return el == "MarketGidLoadGoods" + rootId
            });
            document.getElementById("MarketGidComposite" + this.rootId).innerHTML = tmpl("tmpl-carousel-" + this.rootId, _mgq[0][currentGoodsIndex + 1]);
            document.getElementById("MPreload" + this.rootId).style = "display: none;";
            document.getElementById("MPreload" + this.rootId).innerHTML = '';
            this.mgboxWidth = document.getElementById("MarketGidComposite" + this.rootId).clientWidth - 2; // Borders
            this.slides = document.getElementsByClassName("mgline-" + this.rootId);

            var that = this;

            // Listeners when moving is done
            ['webkitTransitionEnd', 'oTransitionEnd', 'transitionend', 'msTransitionEnd'].forEach(function(event) { // vendor events
                document.getElementById("mgslider-" + that.rootId).addEventListener(event, function() {
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
                        if (that.slides[i].getAttribute('data-opacity') < 1) {
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
            [].forEach.call(document.getElementsByClassName("mgline-link-" + this.rootId), function(a) {
                a.addEventListener('click', function(event) {
                    if (closest(a, '.mgline-' + that.rootId).getAttribute('data-opacity') < 1) {
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

            document.querySelector('#MarketGidComposite' + this.rootId + ' .mgbox').style.height = (imageWidth + 100) + "px";;

            return;
        }

        this.decorateSlider = function() {
            this.currentFirstVisibleIndex = null;
            this.currentLastVisibleIndex = 0;

            for (var i = 0; i < this.slides.length; i++) {
                this.slides[i].setAttribute('data-opacity', '1');
                if (this.slides[i].isVisible()) {
                    if (this.currentFirstVisibleIndex === null) {
                        this.currentFirstVisibleIndex = i;
                    }
                    this.currentLastVisibleIndex = i;
                }
            };

            var lastSlideRightBorder = this.slides[this.currentLastVisibleIndex].offsetLeft + this.slides[this.currentLastVisibleIndex].clientWidth + this.currentCarouselShift;

            this.lastSlidePartialVisible = lastSlideRightBorder > this.mgboxWidth;
            this.firstSlidePartialVisible = this.slides[this.currentFirstVisibleIndex].offsetLeft + this.currentCarouselShift < 0;

            // Very "left" position of the carousel
            if ((!this.firstSlidePartialVisible) && (this.currentFirstVisibleIndex < 1)) {
                document.getElementById("mgslider-prev-" + this.rootId).style.display = 'none';
            } else {
                this.slides[this.currentFirstVisibleIndex].setAttribute('data-opacity', '0.6');
                document.getElementById("mgslider-prev-" + this.rootId).style.display = 'block';
                var mousePosition = this.mouseXCoord - this.slides[this.currentFirstVisibleIndex].offsetLeft - this.currentCarouselShift;
                if ((this.movingSide == 'right') && (!ismobile()) &&
                    (mousePosition < this.slides[this.currentFirstVisibleIndex].clientWidth)) {
                    this.slides[this.currentFirstVisibleIndex].style.opacity = '0.6';
                }
            }

            // Very "right" position of the carousel
            if ((!this.lastSlidePartialVisible) && (this.currentLastVisibleIndex > this.slides.length - 2)) {
                document.getElementById("mgslider-next-" + this.rootId).style.display = 'none';
            } else {
                this.slides[this.currentLastVisibleIndex].setAttribute('data-opacity', '0.6');
                document.getElementById("mgslider-next-" + this.rootId).style.display = 'block';
                var mousePosition = this.mouseXCoord - this.slides[this.currentLastVisibleIndex].offsetLeft - this.currentCarouselShift;
                if ((this.movingSide == 'left') && (!ismobile()) && (mousePosition > 0)) {
                    this.slides[this.currentLastVisibleIndex].style.opacity = '0.6';
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
            });

            if (side == 'left') {
                // Prevent redundant move
                if ((!this.lastSlidePartialVisible) && (this.currentLastVisibleIndex > this.slides.length - 2)) {
                    return;
                }

                if ((!this.firstSlidePartialVisible) && (this.currentFirstVisibleIndex < 1)) {
                    this.currentCarouselShift -= 0.7 * (this.slides[this.currentLastVisibleIndex - 1].clientWidth + 2 + 10);
                } else if (this.currentLastVisibleIndex > this.slides.length - 2) { // Most "right" position of the carousel
                    var lastSlideRightBorder = this.slides[this.currentLastVisibleIndex].offsetLeft + this.slides[this.currentLastVisibleIndex].clientWidth + this.currentCarouselShift;
                    this.currentCarouselShift -= lastSlideRightBorder - this.mgboxWidth + 6; // Margin + Border
                } else {
                    this.currentCarouselShift -= this.slides[this.currentLastVisibleIndex - 1].clientWidth + 2 + 10; // Margins + Borders
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
            document.getElementById("mgslider-" + this.rootId).style.left = this.currentCarouselShift + 'px';
        }
    }

    var mGCarousel = new MGCarousel();
    mGCarousel.init(document.mgRootId);
    mGCarousel.calculateHeight();
    mGCarousel.decorateSlider();
    document.getElementById("mgslider-prev-" + document.mgRootId).addEventListener('click',
        function() {
            mGCarousel.move('right')
        });
    document.getElementById("mgslider-next-" + document.mgRootId).addEventListener('click',
        function() {
            mGCarousel.move('left')
        });

    // Dirty parent hover on arrows
    document.getElementById("mgslider-next-" + document.mgRootId).addEventListener('mouseover', function() {
        if (mGCarousel.slides[mGCarousel.currentLastVisibleIndex].getAttribute('data-opacity') < 1) {
            mGCarousel.slides[mGCarousel.currentLastVisibleIndex].style.opacity = '0.6';
        }
    });

    document.getElementById("mgslider-prev-" + document.mgRootId).addEventListener('mouseover', function() {
        if (mGCarousel.slides[mGCarousel.currentFirstVisibleIndex].getAttribute('data-opacity') < 1) {
            mGCarousel.slides[mGCarousel.currentFirstVisibleIndex].style.opacity = '0.6';
        }
    });

    document.getElementById("mgslider-next-" + document.mgRootId).addEventListener('mouseout', function() {
        mGCarousel.slides[mGCarousel.currentLastVisibleIndex].style.opacity = '1';
    });


    document.getElementById("mgslider-prev-" + document.mgRootId).addEventListener('mouseout', function() {
        mGCarousel.slides[mGCarousel.currentFirstVisibleIndex].style.opacity = '1';
    });

    // Mobile
    var hammerOn = new Hammer(document.getElementById("mgslider-" + document.mgRootId));
    hammerOn.on('swipeleft', function() {
        mGCarousel.move('left')
    });
    hammerOn.on('swiperight', function() {
        mGCarousel.move('right')
    });
})();