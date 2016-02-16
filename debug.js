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
		tags = tags.replace("artist:", "creator:");
		addRating(tags);
		// copyTagsToClipboard(tags);
	});
}

function addRating(tags) {
	$.getJSON("https://raw.githubusercontent.com/freedg/derptag/master/array.json", function(data){
		$.each(data, function(key, value){
			if(key === "rating"){
				for (var i=0; i < 7; i++) {
					if(tags == value[i]) {tags = tags.replace(tags, value[i]+":") }			// this will definetly have to be reworked, but it's the gist of what i want. 
				}
			}
		});
	});
}
addRating();

copyDerpibooruTags();