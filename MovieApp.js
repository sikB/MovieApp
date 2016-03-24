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
		console.log(movieData);
		var newHTML = '';
		for(i=0; i<movieData.results.length; i++){
			var currPoster = imagePath + 'w300' + movieData.results[i].poster_path;
			newHTML += '<div class="col-sm-3">';
			newHTML += '<img src="' + currPoster + '">';
			newHTML += '</div>';		
		}
		$('#poster-grid').html(newHTML);
		
	});
	
	$('#movie-form').submit(function(event){
		// var userSearch = $('.typeahead').val();
		var userSearch = $('#searchText').val();
		var searchFilter = $('#searchFilter').val();
		var searchURL = baseURL + 'search/' + searchFilter + apiKey + '&query=' + encodeURI(userSearch);
		$.getJSON(searchURL, function(movieData){
		var newHTML = '';
			for(i=0; i<movieData.results.length; i++){
				if((searchFilter == 'person')||((searchFilter == 'multi') && (movieData.results[i].media_type == 'person'))){
					var currPoster = imagePath + 'w300' + movieData.results[i].profile_path;
				}else{
					var currPoster = imagePath + 'w300' + movieData.results[i].poster_path;
				}
				newHTML += '<div class="col-sm-3">';
				newHTML += '<img src="' + currPoster + '">';
				newHTML += '</div>';		
			}
		$('#poster-grid').html(newHTML);
		
		});
		event.preventDefault();
	});
});

var substringMatcher = function(strs){
	return function findMatches (q, cb){
		var matches, substringRegex;
		matches= [];
		substringRegex = new RegExp(q, 'i');
		$.each(strs, function(i, str){
			if(substringRegex.test(str)){
				matches.push(str);
			}
		});
		 cb(matches);
	};
};

var actors = [
	'Brad Pitt',
	'Michael Douglas',
	'Al Pacino'
	];

$('#movie-form .typeahead').typeahead({
	hint: true,
	highlight: true,
	minLength: 1
},
{
	name: 'actors',
	source: substringMatcher(actors)
});








// var movieInput = $('#filter').val();
// 	var res = encodeURI(movieInput);
// 	var searchKeyWord = 'http://api.themoviedb.org/3/search/multi' + apiKey + '&query=' + res;
// 	console.log(searchKeyWord);
// 	$.getJSON(searchKeyWord, function(searchData){
// 		var newHTML = '';
// 		for(i=0; i<searchData.results.length; i++){
// 			// console.log(searchData.results[i]);
// 			var currPoster = imagePath + 'w300' + searchData.results[i].poster_path;
// 			newHTML += '<div class="col-sm-3">';
// 			newHTML += '<img src="' + currPoster + '">';
// 			newHTML += '</div>';
// 			console.log(currPoster);
// 		}
// 		$('#poster-grid').html(newHTML);
			
// 		});
// 			event.preventDefault();
// 		});
// 	// Search By person

// 	$('#movie').select(function(){
// 		var movieInput = $('#filter').val();
// 		var res = encodeURI(movieInput);
// 		var searchMovie = 'http://api.themoviedb.org/3/search/movie' + apiKey + '&query=' + res;
// 		$.getJSON(searchKeyWord, function(movieData){
// 		var newHTML = '';
// 		for(i=0; i<movieData.results.length; i++){
// 			var currPoster = imagePath + 'w300' + movieData.results[i].poster_path;
// 			newHTML += '<div class="col-sm-3">';
// 			newHTML += '<img src="' + currPoster + '">';
// 			newHTML += '</div>';
// 			}
// 			$('#poster-grid').html(newHTML);
// 		});
// 		event.preventDefault();
// 	});
