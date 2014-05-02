(function () {
  xtag.register('x-menu', {
    lifecycle: {
      created: function () {
        (this.position || (this.position = "left"));
      }
    },

    events: {

    },

    accessors: {
      open: {
        attribute: { boolean: true }
      },

      position: {
        attribute: {}
      },

      effect: {
        attribute: {}
      }
    },

    methods: {
      show: function () {
        this.open = true;
      },

      hide: function () {
        this.open = false;
      },

      toggle: function () {
        if (this.open) {
          this.hide();
        }
        else {
          this.show();
        }
      }
    }
  });
})();
