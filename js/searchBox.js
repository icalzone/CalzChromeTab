// Add other engines - Baidu, Yandex

  var makeSearchBox = function(engine) {
    var searchEngineUrl;
    var searchQuery;
    switch(engine) {
        case "google":
            searchEngineUrl = "https://www.google.com/search";
            searchQuery = "q";
            break;
        case "stackoverflow":
            searchEngineUrl = "https://www.stackoverflow.com/search";
            searchQuery = "q";
            break;
        case "github":
            searchEngineUrl = "https://www.github.com/search";
            searchQuery = "q";
            break;
        case "youtube":
            searchEngineUrl = "https://www.youtube.com/results";
            searchQuery = "q";
            break;
        case "hypertherm":
            searchEngineUrl = "https://www.hypertherm.com/en-US/search/";
            searchQuery = "search";
            break;
        default:
            searchEngineUrl = "https://www.google.com/search";
            searchQuery = "q";
    }

    $("#srchBx").html("<form id='formForm' method='get' action='" + searchEngineUrl + "'><input type='text' name='"+searchQuery+"' size='31' id='srchImg' /></form>");
    $("#srchImgBx i").fadeOut();
    $("#" + engine).fadeIn();
  };

$(function() {
  $("#srchImgBx i").on("click", function(e){
    var clickedSearchEngine = $(this).attr("id");
    var currentSearchEngine = getCookie("opSrchBx");

    if(clickedSearchEngine === currentSearchEngine){
      $("#srchImgBx i").not("#"+clickedSearchEngine).fadeToggle();
    } else {
      setCookie("opSrchBx", clickedSearchEngine, 365);
      makeSearchBox(clickedSearchEngine);
    }
  });
});




// case "bitbucket":
// t = "https://bitbucket.org/repo/all?name=";
// break;
// case "ddg":
// case "duckduckgo":
// t = "https://duckduckgo.com/?q=";
// break;
// case "facebook":
// t = "https://www.facebook.com/search/top/?q=";
// break;
// case "gcal":
// case "gcalendar":
// t = "https://www.google.com/calendar/render?q=";
// break;
// case "gdrive":
// t = "https://drive.google.com/drive/u/0/search?q=";
// break;
// case "gdocs":
// t = "https://docs.google.com/document/u/0/?q=";
// break;
// case "gforms":
// t = "https://docs.google.com/forms/?q=";
// break;
// case "gkeep":
// t = "https://keep.google.com/#search/text=";
// break;
// case "gmail":
// t = "https://mail.google.com/mail/u/0/#search/";
// break;
// case "gsheets":
// t = "https://docs.google.com/spreadsheets/u/0/?q=";
// break;
// case "gslides":
// t = "https://docs.google.com/presentation/u/0/?q=";
// break;
// case "github":
// t = "https://github.com/search?q=";
// break;
// case "pic":
// case "pics":
// case "picture":
// case "image":
// case "images":
// s += "&tbm=isch", t = "https://www.google.ca/search?q=";
// break;
// case "imdb":
// t = "http://www.imdb.com/find?q=";
// break;
// case "imgur":
// t = "http://imgur.com/search?q=";
// break;
// case "linkedin":
// t = "https://www.linkedin.com/vsearch/f?type=all&keywords=";
// break;
// case "map":
// case "maps":
// case "location":
// t = "https://www.google.ca/maps?q=";
// break;
// case "pinterest":
// t = "https://www.pinterest.com/search/?q=";
// break;
// case "quora":
// t = "https://www.quora.com/search?q=";
// break;
// case "r":
// t = "https://www.reddit.com/r/";
// break;
// case "reddit":
// t = "https://www.reddit.com/search?q=";
// break;
// case "stackoverflow":
// t = "http://stackoverflow.com/search?q=";
// break;
// case "tumblr":
// t = "https://www.tumblr.com/search/";
// break;
// case "twitch":
// t = "http://www.twitch.tv/search?query=";
// break;
// case "tweets":
// case "twitter":
// s += "&src=typd", t = "https://twitter.com/search?q=";
// break;
// case "wiki":
// case "wikipedia":
// t = "http://en.wikipedia.org/w/index.php?search=";
// break;
// case "wolfram":
// case "wolframalpha":
// t = "http://www.wolframalpha.com/input/?i=";
// break;
// case "vimeo":
// t = "https://vimeo.com/search?q=";
// break;
// case "vine":
// t = "https://vine.co/search/";
// break;
// case "video":
// case "youtube":
// t = "https://www.youtube.com/results?search_query=";
// break;
// case "google":
// t = "https://www.google.ca/search?q=";
// break;
// default:
// s = e.searchString, t = "https://www.google.ca/search?q="
// } else t = "https://www.google.ca/search?q=" + e.searchString;
// a.location.href = t + s