var MovieView = Backbone.View.extend({

    tagName     :  "li",
    
    className   : "movie-item",
    
    template    : _.template($('#movie-item-template').html()),

    timeout     : 0,
    
    events: {
      "mouseenter"      : "mouseentered",
      "mouseleave"      : "mouseleft"
    },
    
    mouseentered: function() {
      var me = this.el;
      this.timeout = window.setTimeout(function(){
        //$(me).find('div').popover('show');
      },1000);
      
    },

    mouseleft: function(){
      window.clearTimeout(this.timeout);
      //$(this.el).find('div').popover('hide');
    },
      
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    clear: function() {
      this.model.destroy();
    }

  });