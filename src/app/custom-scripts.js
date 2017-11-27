define(["dojo/topic"], function(topic) {
  /*
  * Custom Javascript to be executed while the application is initializing goes here
  */

  function strip(html)
  {
     var tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  }

  // The application is ready
  topic.subscribe("tpl-ready", function(){
    var gaTrackcode = app.data.getWebAppData().getAnalytics().gaTrackcode
	ga('create', gaTrackcode, 'auto');
	ga('send', 'pageview');

    /*
    * Custom Javascript to be executed when the application is ready goes here
    */
    var data = {
      hitType: 'event',
      eventCategory: 'storymap',
      eventAction: 'tpl-ready',
      eventLabel: strip(app.data.getStory().sections[0].title).trim()
    };
    console.log('Sending data to GA: ', data);
    ga('send', data);

  });

  topic.subscribe("story-load-section", function(index){
    console.log("The section", index, "is being loaded");
    var data = {
      hitType: 'event',
      eventCategory: 'section',
      eventAction: 'story-load-section',
      eventLabel: strip(app.data.getStory().sections[index].title).trim()
    };
    console.log('Sending data to GA: ', data);
    ga('send', data);
  });

  topic.subscribe("story-loaded-map", function(result){
    if ( result.index !== null ){
      console.log("The map", result.id, "has been loaded from the section", result.index);
    }else{
      console.log("The map", result.id, "has been loaded from a Main Stage Action");
    }
  });

  // When a main stage action that loads a new media or reconfigures the current media is performed
  // Note that this event is not fired for the "Locate an address or a place action"
  topic.subscribe("story-perform-action-media", function(media){
    console.log("A Main Stage action is performed:", media);
    var data = {
      hitType: 'event',
      eventCategory: media.type,
      eventAction: 'story-perform-action-media',
      eventLabel: strip(app.data.getStory().sections[app.data.getCurrentSectionIndex()].title).trim()
    };
    console.log('Sending data to GA: ', data);
    ga('send', data);
  });
});
