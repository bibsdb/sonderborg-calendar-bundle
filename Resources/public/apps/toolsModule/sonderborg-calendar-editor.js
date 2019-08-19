angular.module('toolsModule').directive('sonderborgCalendarEditor', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      slide:'=',
      close: '&'
    },
    link: function (scope) {
      function resetInputEvent() {
        scope.newEvent = {
          "title": null,
          "place": null,
          "from": null,
          "to": null,
          "groupbydate": null, 
          "displaytime": null, 
          "mFrom": null,
          "mTo": null
        };
      }
      resetInputEvent();

      /**
       * Add event to slide
       */
      scope.newEventItem = function newEventItem() {
        console.log(scope.slide.options.eventitems);
        // Add event data to slide array.
        scope.slide.options.eventitems.push(angular.copy(scope.newEvent));

        resetInputEvent();
      };

           /**
       * Add event to slide
       */
      scope.groupByHeader = function groupByHeader() {
        return "hello";
      };

      /**
       * Remove event from slide.
       */
      scope.removeEventItem = function removeEventItem(event) {
        scope.slide.options.eventitems.splice(scope.slide.options.eventitems.indexOf(event), 1);
      };

      /**
       * Sort events for slide.
       */
      scope.sortEvents = function sortEvents() {
        console.log("sort");
        if (scope.slide.options.eventitems.length > 0) {
          // Sort the events by from date.
          scope.slide.options.eventitems = $filter('orderBy')(scope.slide.options.eventitems, "from")
        }
      };

      /**
       * Is outdated for events on slide
       */
      scope.eventIsOutdated = function setOutdated(event) {
        var to = event.to;
        var from = event.from;
        var now = Date.now() / 1000;

        return (to && now > to) || (!to && now > from);
      };

      // Run sorting of events.
      scope.sortEvents();
    },
    templateUrl: '/bundles/bibsdbsonderborgcalendar/apps/toolsModule/sonderborg-calendar-editor.html'
  };
});
