angular.module('toolsModule').directive('sonderborgCalendarDisplayitems', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      slide:'=',
      close: '&'
    },
    templateUrl: '/bundles/bibsdbsonderborgcalendar/apps/toolsModule/sonderborg-calendar-displayitems.html'
  };
});