/**
 * Base slide, that just displays for slide.duration, then calls the callback.
 */

// Register the function, if it does not already exist.
if (!window.slideFunctions['calendar']) {
  window.slideFunctions['calendar'] = {
    /**
     * Setup the slide for rendering.
     * @param scope
     *   The slide scope.
     */
    setup: function setupCalendarSlide(scope) {
      var slide = scope.ikSlide;

      // Only show first image in array.
      if (slide.media_type === 'image' && slide.media.length > 0) {
        slide.currentImage = slide.media[0].image;
      }

      // Set currentLogo.
      slide.currentLogo = slide.logo;
    

      // Setup the inline styling
      scope.theStyle = {
        width: "100%",
        height: "100%",
        fontsize: slide.options.fontsize * (scope.scale ? scope.scale : 1.0)+ "px"
      };

      // Set the responsive font size if it is needed.
      if (slide.options.responsive_fontsize) {
        scope.theStyle.responsiveFontsize = slide.options.responsive_fontsize * (scope.scale ? scope.scale : 1.0)+ "vw";
      }
    },

    /**
     * Run the slide.
     *
     * @param slide
     *   The slide.
     * @param region
     *   The region object.
     */
    run: function runCalendarSlide(slide, region) {
      region.itkLog.info("Running calendar slide: " + slide.title);      

      var duration = slide.duration !== null ? slide.duration : 15;

      // The headers array iterated by the view template. (Not available in edit-template)
      slide.headers = [];

      /**
       * Helper function to tjek events occuring today
       * Has today event occured?
       *
       *
       * @param when
       *   Unix-timestamp.
       */
      var hasOccured = function hasOccured(when) {
        var now = new Date();
        var today = (new Date()).setHours(0,0,0,0);
        var jWhen = new Date(when * 1000);
        var jWhenStart = (new Date(when * 1000)).setHours(0,0,0,0);
        if ((now - today) < (jWhen - jWhenStart)) {
          return false;
        }
      };

      /**
       * Filter out past header dates.
       * We have to take current time af day into account.
       *
       *
       * @param headers
       *   All the dates that have events. Array of unix-timestamps with time set to 00:00.
       * @param events
       *   All the event-items of the slide. Array.
       */
      var filterEventHeaders = function filterEventHeaders(headers, events) {
        var now = new Date();
        var today = (new Date()).setHours(0,0,0,0);
        
        for (var i = 0; i < headers.length; i++) { 
          var header = headers[i] * 1000;

          // It's in the future - push it
          if (header > today) {
            slide.headers.push(headers[i]);
          }
          // Header is today - do we have an active event or is it too late?
          else if (header == today) {
            for (var j = 0; j < events.length; j++) {
              event = events[j];
  
              //Is this event running today? If header is in dateheaders - then yes.
              if (event.dateheaders && event.dateheaders.indexOf(headers[i])) {
  
                // Has event occurred?
                if (event.from && event.to) {
                  if (!hasOccured(event.to)) {
                    slide.headers.push(headers[i]);
                    break;
                  }
                }
                else if (event.from) {
                  if (!hasOccured(event.from)) {
                    slide.headers.push(headers[i]);
                    break;
                  }
                }
              }
            }
          }  
        }   
      };

      filterEventHeaders(slide.options.headers, slide.options.eventitems)

      // Wait fadeTime before start to account for fade in.
      region.$timeout(function () {
        // Set the progress bar animation.
        region.progressBar.start(duration);

        // Wait for slide duration, then show next slide.
        // + fadeTime to account for fade out.
        region.$timeout(function () {
          region.nextSlide();
        }, duration * 1000 + region.fadeTime);
      }, region.fadeTime);
    }
  };
}