var AppView = Backbone.View.extend({
  
  el : $("#body-content"),
  
  initialize : function(){
    this.listenTo(Movies, 'add', this.addOne);
    this.fetchMovies();
  },
  
  fetchMovies : function(){
    Movies.fetch();
    if (!Movies.length) {
      this.fetchRemoteMovies();
    }
  },
  
  fetchRemoteMovies : function(){
    var url = "js/data/movie-data-1.json";
    
    $.ajax(url, {
      success: function(data){
        $.each(data.movies, function(index, value){
          app.createMovieObject(value);
        });
      },
      dataType: 'json'
    });
  },
  
  createMovieObject : function (data){
    var movie = new Movie({
      _id        : data.id,
      title      : data.title,
      href       : data.href,
      img        : data.img,
      synopsis   : data.synopsis,
      rating     : data.rating,
      userRating : data.userRating,
      runtime    : data.runtime,
      year       : data.year,
      tags       : data.tags,
      
    });
    Movies.add(movie);
  },
  
  addOne: function(movie) {
    console.log(Movies.length);
    var view = new MovieView({model: movie});
    $("#scrolling-ul").append(view.render().el);
  }
  
});


$(document).ready(function () {
  app = new AppView;
});

