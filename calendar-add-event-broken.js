Calendar.createEvent = function() {
    var field = $('.createForm input[type="text"]')[0];
    var name = field.value;
    if (name == "") {
        $(field).addClass('required');
    } else {
        Calendar.saveEvent({
            name: name,
            date: Calendar.displayedDate
        });
        Calendar.displayToday();
        $(field).removeClass('required').val('');
    }
};