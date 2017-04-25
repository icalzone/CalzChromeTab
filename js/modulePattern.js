var p = new RedditNew();
p.getPhoto();

var calzTab = calzTab || {};

var calzTab.RedditNew = function () {
    // private memebers
    var photo = "../images/initial_bg.jpg",
        subreddit = "/r/EarthPorn",
        sort = "top",
        period = "hour",
        nsfw = false,
        createUrl = function () {
            if (this.subreddit.charAt(0) !== "/") {
                this.subreddit = "/" + this.subreddit;
            }
            if ((this.subreddit.indexOf("/m/") === -1) &&
                (this.subreddit.indexOf("/r/") === -1)) {
                this.subreddit = "/r" + this.subreddit;
            }
            var url = "http://www.reddit.com" + (this.subreddit) + "/" + (this.sort || "top") + ".json";
            if (this.sort === "top" || this.sort === "controversial") {
                url += "?t=" + (this.period || "day");
            }
            return url;
        };

    return {
        // public
        getPhoto: function () {

        }
    };
};


var reddit = {
    photo: "../images/initial_bg.jpg",
    subreddit: "/r/EarthPorn",
    sort: "top",
    period: "hour",
    nsfw: false,
    createUrl: function () {
        if (this.subreddit.charAt(0) !== "/") {
            this.subreddit = "/" + this.subreddit;
        }
        if ((this.subreddit.indexOf("/m/") === -1) &&
            (this.subreddit.indexOf("/r/") === -1)) {
            this.subreddit = "/r" + this.subreddit;
        }
        var url = "http://www.reddit.com" + (this.subreddit) + "/" + (this.sort || "top") + ".json";
        if (this.sort === "top" || this.sort === "controversial") {
            url += "?t=" + (this.period || "day");
        }
        return url;
    },
    getPhoto: function () {
        var url = this.createUrl();
        var req = new XMLHttpRequest();
        req.onload = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    this.photo = this.getPost(JSON.parse(this.responseText));
                } else {
                    return this.photo;
                }
            }
        }
        req.open("GET", url, true);
        req.send();
    },
    getPost: function (data) {
        var posts = data.data.children;

        for (var i = 0; i < posts.length; i++) {
            if (this.nsfw === false && posts[i].data.over_18 === true) {
                continue;
            }

            var type = this.getType(posts[i]);
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
    getType: function (post) {
        if (!/\.(jpg|png|gif)(?!v)/.test(post.data.url)) {
            return "unsupported";
        } else if (/\.gif/.test(post.data.url)) {
            return "gif";
        } else if (!post.data.preview) {
            return "noPreview";
        } else {
            return "preview";
        }
    }
}