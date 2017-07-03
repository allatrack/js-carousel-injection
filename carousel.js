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

    function MGCarousel() {

        this.mgboxWidth = 0;
        this.currentFirstVisibleIndex = 0;
        this.currentLastVisibleIndex = 0;
        this.currentCarouselShift = 0;
        this.lastSlidePartialVisible = true;
        this.firstSlidePartialVisible = false;
        this.slides = [];

        this.transitionalMoving = false;

        this.init = function() {
            document.getElementById("MarketGidComposite").innerHTML = tmpl("tmpl-carousel", _mgq[0][1]);
            document.getElementById("MPreload").style = "display: none;";
            document.getElementById("MPreload").innerHTML = '';
            this.mgboxWidth = document.getElementById("MarketGidComposite").clientWidth - 2; // Borders
            this.slides = document.getElementsByClassName("mgline");

            var that = this;

            // Listeners when moving is done
            document.getElementById("slider").addEventListener('webkitTransitionEnd', function() { that.decorateSlider(); }, false);
            document.getElementById("slider").addEventListener('oTransitionEnd', function() { that.decorateSlider(); }, false);
            document.getElementById("slider").addEventListener('transitionend', function() { that.decorateSlider(); }, false);
            document.getElementById("slider").addEventListener('msTransitionEnd', function() { that.decorateSlider(); }, false);

            // Listeners and hover for images
            for (var i = 0; i < this.slides.length; i++) {
                (function(i) {
                    that.slides[i].addEventListener('click', function() {
                        if (that.slides[i].getAttribute('data-opacity') < 1) {
                            that.move((that.slides[i].offsetLeft + that.currentCarouselShift < 0) ? 'right' : 'left');
                        }
                    });

                    that.slides[i].addEventListener('mouseover', function() {
                        if (that.slides[i].getAttribute('data-opacity') < 1) {
                            that.slides[i].style.opacity = '0.6';
                        }
                    });

                    that.slides[i].addEventListener('mouseout', function() {
                        that.slides[i].style.opacity = '1';
                    });
                })(i)
            }

            // Hover listener

            // Prevent links
            [].forEach.call(document.getElementsByClassName("mgline-link"), function(a) {
                a.addEventListener('click', function() {
                    if (closest(a, '.mgline').getAttribute('data-opacity') < 1) {
                        event.preventDefault();
                        return false;
                    }
                });
            });
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
            }

            var lastSlideRightBorder = this.slides[this.currentLastVisibleIndex].offsetLeft + this.slides[this.currentLastVisibleIndex].clientWidth + this.currentCarouselShift;

            this.lastSlidePartialVisible = lastSlideRightBorder > this.mgboxWidth;
            this.firstSlidePartialVisible = this.slides[this.currentFirstVisibleIndex].offsetLeft + this.currentCarouselShift < 0;

            // Very "left" position of the carousel
            if ((!this.firstSlidePartialVisible) && (this.currentFirstVisibleIndex < 1)) {
                document.getElementById("slider-prev").style.display = 'none';
            } else {
                this.slides[this.currentFirstVisibleIndex].setAttribute('data-opacity', '0.6');
                document.getElementById("slider-prev").style.display = 'block';
            }

            // Very "right" position of the carousel
            if ((!this.lastSlidePartialVisible) && (this.currentLastVisibleIndex > this.slides.length - 2)) {
                document.getElementById("slider-next").style.display = 'none';
            } else {
                this.slides[this.currentLastVisibleIndex].setAttribute('data-opacity', '0.6');
                document.getElementById("slider-next").style.display = 'block';
            }

            this.transitionalMoving = false;
        }

        this.move = function(side) {
            if (!this.transitionalMoving) {
                if (side == 'left') {
                    // Prevent redundant move
                    if ((!this.lastSlidePartialVisible) && (this.currentLastVisibleIndex > this.slides.length - 2)) {
                        return;
                    }

                    // Very "left" position of the carousel
                    if ((!this.firstSlidePartialVisible) && (this.currentFirstVisibleIndex < 1)) {
                        var shift = (233 - this.mgboxWidth % 233) / 2;
                        if (shift < 5) { // Slides exactly fit container
                            shift = 116
                        }
                        this.currentCarouselShift -= shift;
                    } else if (this.currentLastVisibleIndex > this.slides.length - 2) { // Most "right" position of the carousel
                        var lastSlideRightBorder = this.slides[this.currentLastVisibleIndex].offsetLeft + this.slides[this.currentLastVisibleIndex].clientWidth + this.currentCarouselShift;
                        this.currentCarouselShift -= lastSlideRightBorder - this.mgboxWidth + 6; // Margin + Border
                    } else {
                        this.currentCarouselShift -= 233;
                    }
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
                        var shift = (233 - this.mgboxWidth % 233) / 2;
                        if (shift < 5) { // Slides exactly fit container
                            shift = 116
                        }
                        this.currentCarouselShift += shift;
                    } else {
                        this.currentCarouselShift += 233;
                    }
                }

                this.transitionalMoving = true;
                document.getElementById("slider").style.left = this.currentCarouselShift + 'px';
            }
        }

        this.slideNextPrevClick = function(element) {

        }
    }

    var mGCarousel = new MGCarousel();
    mGCarousel.init();
    mGCarousel.decorateSlider();

    document.getElementById("slider-prev").addEventListener('click',
        function() {
            mGCarousel.move('right')
        });
    document.getElementById("slider-next").addEventListener('click',
        function() {
            mGCarousel.move('left')
        });

    var hammerOn = new Hammer(document.getElementById("slider"));

    hammerOn.on('swipeleft', function() { mGCarousel.move('left') });
    hammerOn.on('swiperight', function() { mGCarousel.move('right') });

})();