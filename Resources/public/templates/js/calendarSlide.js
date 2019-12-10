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

      // Set slide headers
      slide.headers = [];

      var headers = slide.options.headers;
      var events = slide.options.eventitems;

      var now = new Date();
      var today = (new Date()).setHours(0,0,0,0);

      for (var i = 0; i < headers.length; i++) { 
        var header = (new Date(headers[i] * 1000)) 
 
        // It's in the future - push it
        if (header > today) {
          slide.headers.push(headers[i]);
        }
        // Header is today - do we have an active event or is it too late?
        else if (header == today) {
          for (var i = 0; i < events.length; i++) {
            event = events[i];

            //Is this event running today? If header is in dateheaders - then yes.
            if (event.dateheaders.indexOf(headers[i])) {

              // Has event occurred?
              if (event.from && event.to) {
                var to = new Date(event.to * 1000);
                var toStart = (new Date(event.to * 1000)).setHours(0,0,0,0);
                if ((now - today) < (to - toStart)) {
                  slide.headers.push(headers[i]);
                  break;
                }
              }
              else if (event.from) {
                var from = new Date(event.from * 1000);
                var fromStart = (new Date(event.from * 1000)).setHours(0,0,0,0);
                if ((now - today) < (from - fromStart)) {
                  slide.headers.push(headers[i]);
                  break;
                }

              }
            }
          }
        }  
      }   

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