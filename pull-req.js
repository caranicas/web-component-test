'use strict';

(function () {

  Polymer({
    is: 'pull-req',

    properties: {
      /**
       * A  test property to show off the docs.
       */
      prop1: {
        type: String,
        value: 'TEST'
      }
    },

    /**
     * Life cycle function that gets called when the element is
     * first attached to the DOM
     */
    attached: function attached() {},

    /**
     * A public function  that doesnt do anything
     *
     * Just demonstating how to document methods
     *
     * @param {object} takes a baz object
     * @return {null}
     */
    foo: function foo(baz) {
      return this._bar();
    },

    /**
     * A private that doesnt do anything
     *
     * Just demonstating how to document private methods
     *
     * @return {null}
     */
    _bar: function _bar() {
      return null;
    }

    /**
     * ### Events
     */

    /**
     * Fired when pull-req does something
     *
     * @event pull-req-action
     */

  });
})();