function copyDerpibooruTags(){
	var tags = [];
	var tagString = '';
	var id;

	try {
		id = window.location.href.match('/(\\d+)/*')[1];
	}
	catch(err) {
		console.log("Not an image!")
		return;
	}
	id = Number(id);


	$.getJSON("https://derpibooru.org/" + id + ".json", function(JSONObjects){
		$.each(JSONObjects, function(key, value){
			if(key === "tags"){
				tagString = value; 
				tags = tagString.split(", ");
			}
		});
	}).then(function(value) {
		addNamespaces(tags);
	});
}

function addNamespaces(tags) {
	$.getJSON('https://raw.githubusercontent.com/freedg/derptag/master/array.json', function(array) {
		var rating;
		var j = 0;
		while (array['rating'][j]){
			rating = array['rating'][j]
			for (i=0; i < tags.length; i++){
				if (rating === tags[i]){
					tags[i] = tags[i].replace(rating, 'rating:' + rating)					
				} 
			}
			j++;
		} 
	});
	$.getJSON('https://raw.githubusercontent.com/freedg/derptag/master/array.json', function(array) {
		var rating;
		var character
		var j = 0;
		while (array['character'][j]){
			character = array['character'][j]
			for (i=0; i < tags.length; i++){
				if (tags[i] === character){
					tags[i] = tags[i].replace(character, 'character:' + character)
				} 
			}
			j++;
		} console.log(tags);
		copyTagsToClipboard(tags);
	});
}
copyDerpibooruTags();