define(['dojo/topic'],
  function(topic) {
    require(['maptiks'], function(mapWrapper) {
      topic.subscribe('story-loaded-map', function(response) {
        var curMap = app.maps[response.id].response.map;
        var secTitle = $.parseHTML(app.data.getStorySections()[response.index].title)[0].innerText;
        if (app.data.getWebAppData().getAnalytics().maptiksTrackcode) { // maptiks have been set in builder
          var id = app.data.getWebAppData().getAnalytics().maptiksId + ":" + secTitle; // from Builder Maptiks settings, ID:sectiontitle
          if (!curMap.maptiks) {
            var container = curMap.container; // the current map div
            var maptiksMapOptions = {
              maptiks_trackcode: app.data.getWebAppData().getAnalytics().maptiksTrackcode, // from Builder Maptiks settings
              maptiks_id: id
            };
            mapWrapper(container, maptiksMapOptions, curMap);
          } else {
            curMap.maptiks._id = id;
          }
        }
        topic.publish('maptiks-ready', mapWrapper, response, secTitle);
      });
    });
  }
);
