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
		
		copyTagsToClipboard(tags);
	});
}
copyDerpibooruTags();