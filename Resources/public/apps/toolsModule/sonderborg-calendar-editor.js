angular.module('toolsModule').directive('sonderborgCalendarEditor', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      slide:'=',
      close: '&'
    },
    templateUrl: '/bundles/bibsdbsonderborgcalendar/apps/toolsModule/sonderborg-calendar-editor.html'
  };
});