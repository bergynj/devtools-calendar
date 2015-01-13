// Slow implementation of getEventsForDate()
Calendar.getEventsForDate = function() {
  var events = Calendar.events();
  var eventsForDate = [];

  var start = new Date(date).setHours(0,0,0,0);
  var end = new Date(date).setHours(23, 59, 59, 999);

  for (var i = 0; i < events.length; i++) {
    var event_date = new Date(events[i].date).setHours(0,0,0,0);
    for (var time = start; time < end; time++){
      if(time == event_date) {
        eventsForDate.push(events[i]);
      }  
    }
  }
  return eventsForDate;
}

// Fast implementation of getEventsForDate()
/*
Calendar.getEventsForDate = function() {
  var events = Calendar.events();
  var eventsForDate = [];

  var start = new Date(date).setHours(0,0,0,0);

  for (var i = 0; i < events.length; i++) {
    var event_date = new Date(events[i].date).setHours(0,0,0,0);
    if(start == event_date) {
      eventsForDate.push(events[i]);
    }
  }
  return eventsForDate;
}
*/
;
