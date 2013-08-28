var AppView = Backbone.View.extend({
  
  el : $("#all-movies-page"),
  
  viewCount : 12,
  
  initialize : function(){
    this.listenTo(Movies, 'add', this.addOne);
    this.fetchMovies();
  },
  
  // load movies from local source
  fetchMovies : function(){
	console.log('fetch movies()');
    Movies.fetch();
    if (!Movies.length) {
      this.loadRemoteMovies();
    }
  },
  
  // load movies from data source or service
  loadRemoteMovies : function(){
    var url = "js/data/all-movies.json";
    console.log('loading remote movies...');
    $.ajax(url, {
      success: function(data){
        $.each(data.movies, function(index, value){
          app.createMovieObject(value);
        });
        console.log('done loading movie objects');
      },
      dataType: 'json'
    });
  },
  
  // initialize a new Movie objects
  createMovieObject : function (data){
    var movie = new Movie({
      _id          : data.id,
      title        : data.title,
      href         : data.href,
      img          : data.img,
      rating       : data.rating,
      releaseYear  : data.releaeYear,
      genres       : data.genres,
      
    });
    Movies.add(movie);
  },
  
  addOne: function(movie) {
    //console.log(Movies.length);
    var view = new MovieView({model: movie});
    $("#scrolling-ul").append(view.render().el);
  },
  
  initializeView: function() {
	console.log('initializeView()');
	for (var i=0; i<app.viewCount; i++){
		var movie = Movies.at(i);
	    var view = new MovieView({model: movie});
	    $("#scrolling-ul").append(view.render().el);		
	}

  },
  
  searchController: function(query){
	  console.log(query);
  }
  
});


$(document).ready(function () {
	
  window.app = new AppView;
  
  //search widgets
  $('body').simplicityState();
  $('#initialReleaseYearMin,#initialReleaseYearMax').simplicityInputs();
  var currentYear = new Date().getFullYear();
  $('#initialReleaseYearSlider').simplicitySlider({
      input: ['#initialReleaseYearMin', '#initialReleaseYearMax'],
      min: 1887,
      max: currentYear,
      any:[1887, currentYear],
      range: true
  }).bind('slide slidechange', function (evt, ui) {
      var min = ui.values[0] === 1887 ? '' : ui.values[0];
      var max = ui.values[1] === (currentYear + 1) ? '' : ui.values[1];
      var message = 'Released ';
      if (min === '' && max === '') {
          message += 'in any year';
      } else if (min === '') {
          message += 'through ' + max;
      } else if (max === '') {
          message += 'after ' + min;
      } else {
          message += '' + min + ' - ' + max;
      }
      $('#initialReleaseYearCriteriaDesc').text(message);
      
  }).slider('values', [ 1887, currentYear] );
  //$('#genre').simplicityFacetedSelect().hide();
  //$('#genre,#rating').simplicityFacetedSelect().hide();
  $('#genreFancy').simplicityFancySelect({
    select: '#genre',
    template: ''
  });
  $('body')
  .simplicityState('mergeQueryParams')
  .simplicityDiscoverySearch({
      url: '#',
      controllerCallback: app.searchController
  });
  
//  $('body').bind('simplicityStateChange', function (state) {
//	  console.log(state);
//  });
  
  
});

