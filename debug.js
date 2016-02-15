var compiledTags;

function copyDerpibooruTags(){
	var tags;
	var tagString;
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
	compiledTags = tags.join('\n');
	compiledTags = compiledTags.replace("artist:", "creator:");
	console.log("Fullfilled!");
	}, function(reason) {
		console.log("Reject!");
	});
}

copyDerpibooruTags().then(function(value) {
	console.log(compiledTags);
}, function(reason) {
	console.log("Didn't Work!")
});

