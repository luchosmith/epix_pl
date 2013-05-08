var MovieView = Backbone.View.extend({

    tagName     :  "li",
    
    className   : "movie-item",
    
    template    : _.template($('#movie-item-template').html()),

    timeout     : 0,
    
    events: {
      "mouseenter"      : "mouseentered",
      "mouseleave"      : "mouseleft"
      /*"click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"*/
    },
    
    mouseentered: function() {
      var me = this.el;
      this.timeout = window.setTimeout(function(){
        $(me).find('div').popover('show');
      },1000);
      
    },

    mouseleft: function(){
      window.clearTimeout(this.timeout);
      $(this.el).find('div').popover('hide');
    },
      
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      $(this.el).find('div').popover({
        'trigger':'manual'
      });
    },
    
    render: function() {
      //console.log("rendering movie object");
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    clear: function() {
      this.model.destroy();
    }

  });