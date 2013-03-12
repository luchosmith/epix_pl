var MovieList = Backbone.Collection.extend({
   
   model: Movie,

   localStorage: new Backbone.LocalStorage("movies-backbone"),

   comparator: function(item) {
     //return todo.get('order');
   }

 });

var Movies = new MovieList;