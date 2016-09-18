/**
 * Simple toggle function between 2 classes based on scroll-positioning.
 * If the element is in the viewable area, it gets the class `options.classStop` (defaults to `snh-stop`)
 * Otherwise, if it's even a pixel out of view, it gets the class `options.classHover` (defaults to `snh-hover`)
 *
 * Useful for mostly CSS designs that need a hovering menu, that starts fixed to the top.
 *
 * Theoretically compatible back to IE5, although I'm unsure about the JSON type object instanciation.
 */
class StopNHover {


  /**
   * Sets up the element with scroll-handlers and initial classes.
   *
   * @param {Element|NodeList|Array} domTarget DOM Element(s) to be affected
   * @param {Object} oOptions                  Key-Value hash of option-names and values
   */
  constructor(domTarget, oOptions = {}) {

    // If an array is passed, run this constructor for all of them
    if (domTarget instanceof NodeList || domTarget instanceof Array) {
      return [...domTarget].map(dom => new StopNHover(dom, oOptions));
    }

    this.domTarget = domTarget;
    this.oOptions = {
      'classStop': 'snh-stop',
      'classHover': 'snh-hover'
    };

    for (var sName in oOptions) {
      if (oOptions.hasOwnProperty(sName)) {
        this.oOptions[sName] = oOptions[sName];
      }
    }

    this._updateDeltas();

    const fnScrollDelegator = this._scrollDelegator.bind(this);
    window.setTimeout(0, fnScrollDelegator);
    window.addEventListener('scroll', fnScrollDelegator);
  }

  /**
   * @private
   * Update the scrolled top of the document & the height of our target element.
   * Used internally as a convenience function. It does not trigger any further actions.
   */
  _updateDeltas() {
    const rectTarget = this.domTarget.getBoundingClientRect();
    this.deltaTop = rectTarget.top;
    this.deltaHeight = rectTarget.height;
  }

  /**
   * @private
   * Launched internally on a scroll event or initial setup. It triggers either [hover]{@link #StopNHover.hover} or [stop]{@link #StopNHover.stop} depending on the scrolled top of the document.
   */
  _scrollDelegator() {
    this._updateDeltas();

    if (window.scrollTop > (this.deltaHeight + this.deltaTop)) {
      this.hover();
    } else {
      this.stop();
    }
  }

  /**
   * Triggers the element to hover.
   * Removes the `oOptions.classStop` class (default `snh-stop`) and replaces it with `oOptions.classHover` (default `snh-hover`).
   */
  hover() {
    const domTarget = this.domTarget;
    const rClassReplace = new RegExp(`([^|\s])${this.oOptions.classStop}[\s|$]`, 'g');
    const sClassNames = domTarget.className;

    domTarget.className = sClassNames.replace(rClassReplace, '$1')
      + ` ${this.oOptions.classHover}`;
  }

  /**
   * Triggers the element to stop.
   * Replace the `oOptions.classHover` class (default `snh-hover`) with the `oOptions.classStop` (default `snh-stop`)
   */
  stop() {
    const domTarget = this.domTarget;
    const rClassReplace = new RegExp(`([^|\s])${this.oOptions.classHover}[\s|$]`, 'g');
    const sClassNames = domTarget.className;

    domTarget.className = sClassNames.replace(rClassReplace, '$1')
      + ` ${this.oOptions.classStop}`;
  }

}
