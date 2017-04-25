// var calz = calz || {};

RedditPhoto = function () {
    this.photo = "../images/initial_bg.jpg";
    this.subreddit = "/r/EarthPorn";
    this.sort = "top";
    this.period = "hour";
    this.nsfw = false;
    this.url = null;
};

RedditPhoto.prototype = function () {
    var getPhoto = function () {
            createUrl.call(this);
            var req = new XMLHttpRequest();
            req.onload = function () {
                if (req.readyState === 4 && req.status === 200) {
                    var photoData = getPost.call(this, JSON.parse(req.responseText));
                    this.photo = photoData.data.imgUrl;
                    // getBackground.call(this)

                }
            }
            req.open("GET", this.url, true);
            req.send();
        },
        getBackground = function(){
            return this.photo;
        },
        createUrl = function () {
            if (this.subreddit.charAt(0) !== "/") {
                this.subreddit = "/" + this.subreddit;
            }
            if ((this.subreddit.indexOf("/m/") === -1) &&
                (this.subreddit.indexOf("/r/") === -1)) {
                this.subreddit = "/r" + this.subreddit;
            }
            this.url = "http://www.reddit.com" + (this.subreddit) + "/" + (this.sort || "top") + ".json";
            if (this.sort === "top" || this.sort === "controversial") {
                this.url += "?t=" + (this.period || "day");
            }
        },
        getPost = function (data) {
            var posts = data.data.children;

            for (var i = 0; i < posts.length; i++) {
                if (this.nsfw === false && posts[i].data.over_18 === true) {
                    continue;
                }

                var type = getType.call(this, posts[i]);
                if (type === "unsupported") {
                    continue;
                } else if (type === "gif" || type === "noPreview") {
                    posts[i].data.imgUrl = posts[i].data.url;
                    return posts[i];
                } else if (type === "preview") {
                    var images = posts[i].data.preview.images;

                    for (var j = 0; j < images.length; j++) {
                        posts[i].data.imgUrl = images[j].source.url;
                        return posts[i];
                    }
                }
            }
            return {
                data: {
                    imgUrl: this.photo,
                    permalink: "",
                    title: "No image could be found in the top posts.",
                    warning: true
                }
            }
        },
        getType = function (post) {
            if (!/\.(jpg|png|gif)(?!v)/.test(post.data.url)) {
                return "unsupported";
            } else if (/\.gif/.test(post.data.url)) {
                return "gif";
            } else if (!post.data.preview) {
                return "noPreview";
            } else {
                return "preview";
            }
        };

    return {
        getPhoto: getPhoto
    };
}();