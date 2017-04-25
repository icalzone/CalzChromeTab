// Loop through the user's first 6 bookmark folders
function fetchBookmarks() {
	var count = 6;
	chrome.bookmarks.getTree(function(itemTree){                // gets list of bookmarks
		itemTree.forEach(function(item){                        // loops through them all
			item.children[0].children.forEach(function(child) { // filters to only bookmarks in the bookmarks bar
				if (child.children && count >= 1) {             // filters to folders on bookmarks bar and limits to 6
					console.log(child.title + ' ' + child.title.charAt(0).toLowerCase()); // get folder title and first letter
					child.children.forEach(function(bookmark) {
						var matches = bookmark.title.match(/\[(.*?)\]/); // fetch character between [] for keyboard shortcut
						if (matches)
							console.log(bookmark.title + ' ' + bookmark.url + ' ' + bookmark.title.match(matches[1]));
					});
					console.log('');
					count--;
				}
			});
		});
	});

	var left = document.createElement('div');
	left.className = 'left';
	document.getElementById('box').appendChild(left);
	var right = document.createElement('div');
	right.className = 'right';
	document.getElementById('box').appendChild(right);
}