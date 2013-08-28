var Movie = Backbone.Model.extend({
    
  //use the epix db id
  idAttribute: "_id",
    
  defaults: function(){
    return {
      shortName        : "",
      href             : "#",  // the movie landing page
      img              : "" ,   // thumbnail url
      title            : "",
      genres           : [],
      releaseYear      : ""
    }
  },
    
  initialize: function(){
    //initialization code
  },
    
  doSomething: function(){
    //define a function
  }
    
});


