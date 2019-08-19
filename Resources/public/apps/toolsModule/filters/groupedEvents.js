/**
 * @file
 * Contains the groupedEvents filter.
 * A filter to display only events that have not yet bypassed their end date.
 */

/**
 * Add an grouped events filter to eventlist.
 */
angular.module('toolsModule').filter('groupedEvents', function () {
  'use strict';

  return function (items) {
    // Return if event array empty.
    if (!angular.isArray(items)) {
      return false
    }
     console.log('hej');
    // Get current time.
    var currentTime = parseInt(Date.now() / 1000);

    var dates = [];
    var ref = [];
    dates.push(moment().startOf('day')); // Push today to be sure it is there

    // Loop through event items to find the range of date headers
    // Also filter out outdated events
    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      // Calculate event duration.
      if (item.from && item.to && item.to >= currentTime) {
        item.mFrom = moment.unix(item.from);
        item.mTo = moment.unix(item.to);
        dates.push(item.mTo);
        ref.push(item);
      }
      else if (item.from && item.from >= currentTime) {
        item.mFrom = moment.unix(item.from);
        dates.push(item.mFrom);
        ref.push(item);
      }
    }



    // Find min and max dates i dataset
    var d = moment.min(dates);
    var max = moment.max(dates);
    var events = [];

    
    console.log(max.format('DD-MM-YYYY'));


     // Loop through the range from min to max adding one day at the time
    while(d < max) {
      

      var header = d.calendar(null,{
          lastDay : '[I går]',
          sameDay : '[I dag]',
          nextDay : '[I morgen]',
          lastWeek : 'ddd [d.] Do MMMM',
          nextWeek : 'ddd [d.] Do MMMM',
          sameElse : 'ddd [d.] Do MMMM'
      })

      // Find events that are active on the date d. and add them to eventsarr
      // Events kan be added multiple times with different groupbydate header
      for (var i = 0; i < ref.length; i++) {
        var item = ref[i];
        item.groupbydate = header;


        // Calculate event duration.
        if (item.from && item.to && d.isBetween(item.mFrom, item.mTo)) {
          console.log(item.title);
          console.log(d.format('DD-MM-YYYY'));
          console.log(item.mFrom.format('DD-MM-YYYY'));
          console.log(item.mTo.format('DD-MM-YYYY'));
          item.displaytime = item.mFrom.format('HH:mm') + item.mTo.format('[ - ] HH:mm');
          events.push(item);
        }
        else if (item.from && d.isSame(item.mFrom, 'day')) {
          //console.log(item.title);
          //console.log(d.format('DD-MM-YYYY'));
          //console.log(item.mFrom.format('DD-MM-YYYY'));
          //console.log(item.mTo.format('DD-MM-YYYY'));
          item.displaytime = item.mFrom.format('HH:mm');
          events.push(item);
        }
      }
      d.add(1, 'd');

    }

    console.log(events);
    return events;
  };
});