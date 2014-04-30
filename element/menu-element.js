(function () {
  xtag.register('x-menu', {
    lifecycle: {
      created: function () {
      },
      inserted: function () {

      },
      removed: function () {

      }
    },

    events: {

    },

    accessors: {

    },

    methods: {
      show: function () {
        this.setAttribute( 'open' );
      },

      hide: function () {
        this.removeAttribute( 'open' );
      },

      toggle: function () {
        if (this.hasAttribute( 'open' )) {
          this.hide();
        }
        else {
          this.show();
        }
      }
    }
  });
})();
