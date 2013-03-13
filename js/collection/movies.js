var MovieList = Backbone.Collection.extend({
   
   model: Movie,

   localStorage: new Backbone.LocalStorage("movies-backbone"),

 });

var Movies = new MovieList;