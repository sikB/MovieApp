$(document).ready(function(){

	var baseURL = 'https://api.themoviedb.org/3/';
	var apiKey = '48bf4a3fe9092e9030ced03151c835c4';

	var nowPlaying = baseURL + 'movie/now_playing' + '?api_key=' + apiKey;
	console.log(nowPlaying);

	$.getJSON(nowPlaying, function(movieData){
		console.log(movieData);
	});

});