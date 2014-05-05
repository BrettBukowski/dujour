(function () {

  function getStyle ( el, property ) {
    return window.getComputedStyle( el ).getPropertyValue( property );
  }

  function applyTransform ( el, value ) {
    ['-webkit-', '-moz-', ''].some( function (prefix) {
      if ( prefix + 'transform' in el.style ) {
        el.style[ prefix + 'transform'] = value;
        return true;
      }
    });
  }

  function translate ( el, coord, dimension ) {
    applyTransform( el, 'translate' + dimension.toUpperCase() + '(' + coord + ')' );
  }

  function untranslate ( el ) {
    applyTransform( el, '' );
  }

  var operations = {
    left: { prop: 'width', direction: -1, dimension: 'x' },
    right: { prop: 'width', direction: 1, dimension: 'x' },
    top: { prop: 'height', direction: -1, dimension: 'y' },
    bottom: { prop: 'height', direction: 1, dimension: 'y' }
  }

  function moveEl ( el ) {
    if ( this.effect != 'push' && this.effect != 'slide' ) {
      untranslate( this );
      return;
    }

    var operation = operations[ this.position ];

    if ( this.open ) {
      untranslate( this );
    }
    else {
      translate( this, operation.direction * parseInt(getStyle( this, operation.prop ), 10) + 'px', operation.dimension );
    }
  }

  var pushDirection = {
    'left': 'left',
    'right': 'left',
    'top': 'top',
    'bottom': 'top'
  };

  function moveDoc () {
    if ( this.effect != 'push' || !this.open ) {
      document.body.style[ pushDirection[ this.position ] ] = 0;
    }
    else {
      var operation = operations[ this.position ];

      document.body.style[ pushDirection[ this.position ] ] = -1 * operation.direction * parseInt(getStyle( this, operation.prop ), 10) + 'px';
    }

    for ( var direction in pushDirections ) {
      if ( pushDirections.hasOwnProperty( direction ) && direction != this.position ) {
        document.body.style[ direction ] = 0;
      }
    }
  }

  xtag.register('x-menu', {
    lifecycle: {
      created: function () {
        ( this.position || ( this.position = "left" ) );
      }
    },

    events: {

    },

    accessors: {
      open: {
        attribute: { boolean: true },
        set: function () {
          this.setAttribute( 'aria-hidden', !this.open );

          if ( this.open ) {
            this.removeAttribute( 'style' );
          }
          else {
            moveEl.call( this );
          }

          moveDoc.call( this );
        }
      },

      position: {
        attribute: {},
        set: function () {
          moveEl.call( this );
          moveDoc.call( this );
        }
      },

      effect: {
        attribute: {},
        set: function () {
          moveEl.call( this );
          if ( this.effect == 'push' ) {
            document.body.classList.add( 'menu-push' );
          }
          else {
            document.body.classList.remove( 'menu-push' );
          }
        }
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
        if ( this.open ) {
          this.hide();
        }
        else {
          this.show();
        }
      }
    }
  });
})();
