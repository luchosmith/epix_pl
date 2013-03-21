var AppView = Backbone.View.extend({
  
  el : $("#body-content"),
  
  initialize : function(){
    this.listenTo(Movies, 'add', this.addOne);
    //this.lisenTo(Movies, 'all', this.render);
    this.fetchMovies();
  },
  
  fetchMovies : function(){
    Movies.fetch();
    if (!Movies.length) {
      //console.log("no movies in local storage");
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
      _id : data.id,
      title : data.title,
      href : data.href,
      img : data.img
    });
    Movies.add(movie);
  },
  
  addOne: function(movie) {
    var view = new MovieView({model: movie});
    $("#scrolling-ul").append(view.render().el);
  }
  
});


$(document).ready(function () {
  app = new AppView;
});

