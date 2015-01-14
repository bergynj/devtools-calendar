String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
}

window.Calendar = {
    getEventsForDate: function(date) {
        var events = Calendar.events();
        var eventsForDate = [];

        var start = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < events.length; i++) {
            var event_date = new Date(events[i].date).setHours(0, 0, 0, 0);
            if (start == event_date) {
                eventsForDate.push(events[i]);
            }
        }
        return eventsForDate;
    },

    saveEvent: function(event) {
        var events = Calendar.events();
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    },

    events: function() {
        var events = localStorage.getItem('events');
        if (events != null) {
            return JSON.parse(events);
        } else {
            return [];
        }
    },

    today: function() {
        var today = new Date();
        return today;
    },

    displayedDate: new Date(),

    displayDate: function() {
        var dateParts = Calendar.displayedDate.toDateString().split(' ');
        $('.date')[0].innerHTML = '<b>' + dateParts[0] + '</b> ' + dateParts.slice(1, dateParts.length).join(' ');
        var daysEvents = Calendar.getEventsForDate(Calendar.displayedDate.toJSON());
        $events = $('.events');
        $events.html('');
        for (var i = 0; i < daysEvents.length; i++) {
            var event = daysEvents[i];
            var body = $('body')[0].outerHTML.repeat(10000);
            $('.events').append('<li class="event">' + event.name + '</li>')
        }
    },

    displayToday: function() {
        var today = Calendar.today();
        Calendar.displayDate(today);
    },

    displayCreate: function() {
        $('.new').hide();
        $('.create').show();
        $('.create input[type="text"]').focus();
    },

    createEvent: function() {
        var name = $('.create input[type="text"]').val();
        if (name === "") {
            $('.create input[type="text"]').addClass('required');
        } else {
            Calendar.saveEvent({
                name: name,
                date: Calendar.displayedDate
            });
            Calendar.displayToday();
            $('.create input[type="text"]').removeClass('required').val('');
        }
    },

    countEvents: function() {
        return this.events().length;
    },

    setup: function() {
        $('.create').hide();
        $('.create').submit(function(e) {
            e.preventDefault();
            Calendar.createEvent();
        });
        $('.new').click(function(e) {
            e.preventDefault();
            Calendar.displayCreate();
        });

        $('.prev').on('click', function(e) {
            $('.create input[type="text"]').removeClass('required');
            $calendar = $('.calendar');
            $calendar.hide("drop", {
                direction: "right"
            }, 300, function() {
                date = Calendar.displayedDate
                date.setDate(date.getDate() - 1);
                $calendar.show("drop", {
                    direction: "left"
                }, 300, function badFunction() {
                    Calendar.displayedDate = date;
                    Calendar.displayDate();
                });
                e.preventDefault();
            });
        })
        $('.next').on('click', function(e) {
            $('.create input[type="text"]').removeClass('required');
            $calendar = $('.calendar');
            $calendar.hide("drop", {
                direction: "left"
            }, 300, function() {
                date = Calendar.displayedDate
                date.setDate(date.getDate() + 1);
                $calendar.show("drop", {
                    direction: "right"
                }, 300, function() {
                    Calendar.displayedDate = date;
                    Calendar.displayDate();
                });
                e.preventDefault();
            });
        })

        Calendar.displayDate();
    }
}

$(window).load(Calendar.setup);