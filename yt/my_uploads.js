// Define some variables used to remember state.
var playlistId, nextPageToken, prevPageToken;


var videosToSave = [];

// After the API loads, call a function to get the uploads playlist ID.
function handleAPILoaded() {
    requestUserUploadsPlaylistId();
}

// Call the Data API to retrieve the playlist ID that uniquely identifies the
// list of videos uploaded to the currently authenticated user's channel.
function requestUserUploadsPlaylistId() {
    // See https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.channels.list({
        mine: true,
        part: 'contentDetails'
    });
    request.execute(function (response) {



        playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
        requestVideoPlaylist(playlistId);
    });
    videosListById('snippet', '{someId}');
}
// Retrieve the next page of videos in the playlist.
function nextPage() {
    requestVideoPlaylist(playlistId, nextPageToken);
}

// Retrieve the previous page of videos in the playlist.
function previousPage() {
    requestVideoPlaylist(playlistId, prevPageToken);
}

// Retrieve the list of videos in the specified playlist.
function requestVideoPlaylist(playlistId, pageToken) {
    $('#video-container').html('');
    var requestOptions = {
        playlistId: playlistId,
        part: 'snippet',
        maxResults: 4
    };
    if (pageToken) {
        requestOptions.pageToken = pageToken;
    }
    var request = gapi.client.youtube.playlistItems.list(requestOptions);
    request.execute(function (response) {
        nextPageToken = response.result.nextPageToken;
        var nextVis = nextPageToken ? 'visible' : 'hidden';
        $('#next-button').css('visibility', nextVis);
        prevPageToken = response.result.prevPageToken
        var prevVis = prevPageToken ? 'visible' : 'hidden';
        $('#prev-button').css('visibility', prevVis);

        var playlistItems = response.result.items;
        if (playlistItems) {
            $.fn.openAnySocialDialog("#video-container");
            $(this).removeClass('ui-state-focus ui-state-hover ui-state-active');
            $.each(playlistItems, function (index, item) {
                displayResult(item.snippet);
            });
            $('#video-container').append('<button type="button" class="youtubeVideoToChoose" id="youtubeVideosAreChosen">Click here when you are done choosing videos</button>');
        } else {
            $('#youtubeVideos').html('Sorry you have no uploaded videos');
        }
    });
}

// Create a listing for a video.
function displayResult(videoSnippet) {

    var title = videoSnippet.title;
    var videoId = videoSnippet.resourceId.videoId;
    // console.log ('<iframe id="ytplayer" type="text/html" width="480" height="360" src="http://www.youtube.com/embed/' + videoId + '" frameborder="0"/>');
    var sclUrl = "<input type=\"checkbox\"" + " id = " + videoId + " class = \"youtubeCheckbox\">";
    $('#video-container').append('<iframe id="ytplayer" type="text/html" width="360" height="240" src="http://www.youtube.com/embed/' + videoId + '" frameborder="0"/>'
	+ sclUrl);
    if (jQuery.inArray(videoId, videosToSave) != -1) {
        console.log("Huy v lico");
        $("#" + videoId).prop("checked", true);
    }
}

// Retrieve the next page of videos in the playlist.
function nextPage() {
    requestVideoPlaylist(playlistId, nextPageToken);
}

// Retrieve the previous page of videos in the playlist.
function previousPage() {
    requestVideoPlaylist(playlistId, prevPageToken);
}