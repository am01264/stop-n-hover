'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Simple toggle function between 2 classes based on scroll-positioning.
 * If the element is in the viewable area, it gets the class `options.classStop` (defaults to `snh-stop`)
 * Otherwise, if it's even a pixel out of view, it gets the class `options.classHover` (defaults to `snh-hover`)
 *
 * Useful for mostly CSS designs that need a hovering menu, that starts fixed to the top.
 *
 * Theoretically compatible back to IE5, although I'm unsure about the JSON type object instanciation.
 */
var StopNHover = function () {

  /**
   * Sets up the element with scroll-handlers and initial classes.
   *
   * @param {Element|NodeList|Array} domTarget DOM Element(s) to be affected
   * @param {Object} oOptions                  Key-Value hash of option-names and values
   */
  function StopNHover(domTarget) {
    var oOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, StopNHover);

    // If an array is passed, run this constructor for all of them
    if (domTarget instanceof NodeList || domTarget instanceof Array) {
      return [].concat(_toConsumableArray(domTarget)).map(function (dom) {
        return new StopNHover(dom, oOptions);
      });
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

    var fnScrollDelegator = this._scrollDelegator.bind(this);
    window.setTimeout(0, fnScrollDelegator);
    window.addEventListener('scroll', fnScrollDelegator);
  }

  /**
   * @private
   * Update the scrolled top of the document & the height of our target element.
   * Used internally as a convenience function. It does not trigger any further actions.
   */


  _createClass(StopNHover, [{
    key: '_updateDeltas',
    value: function _updateDeltas() {
      var rectTarget = this.domTarget.getBoundingClientRect();
      this.deltaTop = rectTarget.top;
      this.deltaHeight = rectTarget.height;
    }

    /**
     * @private
     * Launched internally on a scroll event or initial setup. It triggers either [hover]{@link #StopNHover.hover} or [stop]{@link #StopNHover.stop} depending on the scrolled top of the document.
     */

  }, {
    key: '_scrollDelegator',
    value: function _scrollDelegator() {
      this._updateDeltas();

      if (window.scrollTop > this.deltaHeight + this.deltaTop) {
        this.hover();
      } else {
        this.stop();
      }
    }

    /**
     * Triggers the element to hover.
     * Removes the `oOptions.classStop` class (default `snh-stop`) and replaces it with `oOptions.classHover` (default `snh-hover`).
     */

  }, {
    key: 'hover',
    value: function hover() {
      var domTarget = this.domTarget;
      var rClassReplace = new RegExp('([^|s])' + this.oOptions.classStop + '[s|$]', 'g');
      var sClassNames = domTarget.className;

      domTarget.className = sClassNames.replace(rClassReplace, '$1') + (' ' + this.oOptions.classHover);
    }

    /**
     * Triggers the element to stop.
     * Replace the `oOptions.classHover` class (default `snh-hover`) with the `oOptions.classStop` (default `snh-stop`)
     */

  }, {
    key: 'stop',
    value: function stop() {
      var domTarget = this.domTarget;
      var rClassReplace = new RegExp('([^|s])' + this.oOptions.classHover + '[s|$]', 'g');
      var sClassNames = domTarget.className;

      domTarget.className = sClassNames.replace(rClassReplace, '$1') + (' ' + this.oOptions.classStop);
    }
  }]);

  return StopNHover;
}();
//# sourceMappingURL=snh.js.map
