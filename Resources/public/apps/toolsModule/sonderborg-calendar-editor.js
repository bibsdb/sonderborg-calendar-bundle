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
          "dateheaders": null, 
          "displaytime": null, 
        };
      }
      resetInputEvent();

      /**
       * Add event to slide
       */
      scope.newEventItem = function newEventItem() {
        console.log("new");
        // Add event data to slide array.
        
        var event = scope.setCalcProp(angular.copy(scope.newEvent));
        scope.slide.options.eventitems.push(event);
        resetInputEvent();

      };

      /**
       * Remove event from slide.
       */
      scope.removeEventItem = function removeEventItem(event) {
        scope.slide.options.eventitems.splice(scope.slide.options.eventitems.indexOf(event), 1);
      };

      /**
       * Set default-value af newEvent.to to newEvent.from
       */
      scope.setDefaultDate = function setDefaultDate() {
        var from = angular.element('#new-event-from').val();
        var to = angular.element('#new-event-to').val();

        if (from) {
          angular.element('#new-event-to').datetimepicker({startDate: from, minDate: from});
        }
      };

      /**
       * Create the text that is shown in template to tell people when the event starts and stops.
       */
      scope.setCalcProp = function setCalcProp(event) {

        if (event.from && event.to) {          
          
          // Dateheaders contains alle the dates the event is covering as unix-timestamps
          event.dateheaders = [];
          // Throw away timepart
          var i = moment.unix(event.from).startOf('day');

          while(i <= moment.unix(event.to)) {
            //push the as unix-timestamp without the timepart
            event.dateheaders.push(i.unix());
            i.add(1, 'd');
          }

          event.displaytime = (moment.unix(event.from)).format('HH:mm') + (moment.unix(event.to)).format('[ - ] HH:mm');

          

        }
        else if (event.from) {
          event.displaytime = (moment.unix(event.from)).format('HH:mm');

          var i = (moment.unix(event.from)).startOf('day');
          //push the as unix-timestamp without the timepart
          event.dateheaders = [i.unix()];
        }
        console.log(event);
        return event;
      };

      /**
       * Create an array of date-headers that are used to group events by in template.
       */
      scope.createEventHeaders = function createEventHeaders() {
        var events = scope.slide.options.eventitems;
        var headers = [];
   
        for (var i = 0; i < events.length; i++) {  
          var event = events[i];
          if (event && event.dateheaders) {
            headers = headers.concat(event.dateheaders);
          }
        }

        // Remove duplicate dates
        var unique = headers.filter((v, i, a) => a.indexOf(v) === i);

        // Sort dates
        var sorted = unique.sort(function(a,b){return a-b;});      
        scope.slide.options.headers = sorted;
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
      //scope.sortEvents();
    },
    templateUrl: '/bundles/bibsdbsonderborgcalendar/apps/toolsModule/sonderborg-calendar-editor.html'
  };
});
