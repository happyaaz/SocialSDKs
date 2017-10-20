//  leave the first argument as is, second - id of the video
videosListById('snippet', 'ZfuierUvx1A');



function videosListById(part, id) {
    var request = gapi.client.youtube.videos.list(
        {
            id: id,
            part: part
        });
    //executeRequest(request);
    request.execute(function (response) {
        console.log(response.items[0].snippet.thumbnails);

        var thumbnails = response.items[0].snippet.thumbnails;
        var thumbnailUrl;
        if (("maxres" in thumbnails)) {
            console.log("HERE, b0ss");
            thumbnailUrl = thumbnails["maxres"].url;
            console.log(thumbnailUrl);
        }
        else if (("standard" in thumbnails)) {
            console.log("HERE, b0ss");
            thumbnailUrl = thumbnails["standard"].url;
            console.log(thumbnailUrl);
        }
        else if (("high" in thumbnails)) {
            console.log("HERE, b0ss");
            thumbnailUrl = thumbnails["high"].url;
            console.log(thumbnailUrl);
        }
        else if (("medium" in thumbnails)) {
            console.log("HERE, b0ss");
            thumbnailUrl = thumbnails["medium"].url;
            console.log(thumbnailUrl);
        }
        else if (("default" in thumbnails)) {
            console.log("HERE, b0ss");
            thumbnailUrl = thumbnails["default"].url;
            console.log(thumbnailUrl);
        }
    });
}