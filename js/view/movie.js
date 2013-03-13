var MovieView = Backbone.View.extend({

    tagName:  "li",
    
    //template: _.template($('#movie-item-template').html()),
    
    events: {
      "click"           : "clicked"
      /*"click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"*/
    },
    
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      //this.listenTo(this.model, "destroy", this.remove);
    },
    
    render: function() {
      //this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    clicked : function(){
      console.log("movie item clicked");
    },
    
    clear: function() {
      //this.model.destroy();
    }

  });