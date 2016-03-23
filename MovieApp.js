$(document).ready(function(){

	var imagePath;
	var baseURL = 'https://api.themoviedb.org/3/';
	var apiKey = '?api_key=48bf4a3fe9092e9030ced03151c835c4';
	var configURL = baseURL + 'configuration' + apiKey;

	$.getJSON(configURL, function(configData){
	 	imagePath = configData.images.base_url;
	});

	var nowPlaying = baseURL + 'movie/now_playing' + apiKey;

	$.getJSON(nowPlaying, function(movieData){
		// console.log(movieData);
		var newHTML = '';
		for(i=0; i<movieData.results.length; i++){
			var currPoster = imagePath + 'w300' + movieData.results[i].poster_path;
			newHTML += '<div class="col-sm-3">';
			newHTML += '<img src="' + currPoster + '">';
			newHTML += '</div>';		
		}
		$('#poster-grid').html(newHTML);
		
	});
	
	$('#movie-form').submit(function(){
	var movieInput = $('#filter').val();
	var searchMovie = 'http://api.themoviedb.org/3/search/movie' + apiKey + '&query=' + movieInput;
	
	$.getJSON(searchMovie, function(searchData){
		var newHTML = '';
		for(i=0; i<searchData.results.length; i++){
			console.log(searchData.results[i]);
			var currPoster = imagePath + 'w300' + searchData.results[i].poster_path;
			newHTML += '<div class="col-sm-3">';
			newHTML += '<img src="' + currPoster + '">';
			newHTML += '</div>';
		}
		
			
		});
			event.preventDefault();
		});
});

