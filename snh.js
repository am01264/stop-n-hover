function StopNHover(domTarget, options) {
    /**
     * Simple toggle function between 2 classes based on scroll-positioning.
     * If the element is in the viewable area, it gets the class 'snh-stop' (options.classStop)
     * Otherwise, if it's even a pixel out of view, it gets the class 'snh-hover' (options.classHover)
     * 
     * Useful for mostly CSS designs that need a hovering menu, that starts fixed to the top.
     * 
     * Theoretically compatible back to IE5, although I'm unsure about the JSON type object instanciation.
     */

    this.options = {
        'classStop': 'snh-stop',
        'classHover': 'snh-hover' 
    };

    if (options) {
        for (var parameter in options) {
            if (options.hasOwnProperty(parameter)) {
                this.options[parameter] = options[parameter];
            }
        }
    }

    this.domTarget = domTarget;

    this.deltaTop = 0;
    this.deltaHeight = 0;

    function fnUpdateDeltas() {
        var rectTarget = domTarget.getBoundingClientRect();
        this.deltaTop = rectTarget.top;
        this.deltaHeight = rectTarget.height;
    }
    fnUpdateDeltas();

    this._currentScroll = null;

    function fnScrollDelegator() {
        // Exit fast if we're still waiting on the last event handler running
        if (this.currentScroll !== null) return;

        fnUpdateDeltas();
        if (window.scrollTop > (this.deltaHeight + this.deltaTop)) {
            this.hover();
        } else {
            this.stop();
        }
    }

    window.setTimeout(0, fnScrollDelegator);
    window.addEventListener('scroll', fnScrollDelegator);
}

StopNHover.prototype.hover = function snhHoverElement() {
    var $target = $(this.domTarget);
    $target.removeClass(this.options.classStop);
    $target.addClass(this.options.classHover);
};

StopNHover.prototype.stop = function snhStopElement() {
    var $target = $(this.domTarget);
    $target.removeClass(this.options.classHover);
    $target.addClass(this.options.classStop);
};
