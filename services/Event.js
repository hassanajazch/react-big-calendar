const moment = require('moment');

class Event {
    /*
    * get events array
    * events which already exists - oldEvent
    */
    static getEvents() {
        const events = [
            {
                id: 1,
                title: 'Discussion for new projects',
                start: moment().add(1, 'day').hours(1).minutes(15).toDate(),
                end: moment().add(1, 'day').hours(3).minutes(45).toDate(),
                oldEvent: true,
                slotAvailable: true
            },
            {
                id: 1,
                title: 'Lunch and team bonding',
                start: moment().add(2, 'day').hours(2).minutes(15).toDate(),
                end: moment().add(2, 'day').hours(4).minutes(45).toDate(),
                oldEvent: true,
                slotAvailable: true
            },
            {
                id: 2,
                title: 'Attend conference in Flatiron',
                start: moment().add(2, 'day').hours(6).minutes(0).toDate(),
                end: moment().add(2, 'day').hours(8).minutes(0).toDate(),
                oldEvent: true,
                slotAvailable: true
            },
            {
                id: 3,
                title: 'Calendar with investors',
                start: moment().add(4, 'day').hours(3).minutes(15).toDate(),
                end: moment().add(4, 'day').hours(5).minutes(15).toDate(),
                oldEvent: false,
                slotAvailable: true
            },
            {
                id: 4,
                title: 'Birthday Party',
                start: moment().add(5, 'day').hours(4).minutes(15).toDate(),
                end: moment().add(5, 'day').hours(7).minutes(30).toDate(),
                oldEvent: false,
                slotAvailable: true
            },
        ];

        return events;
    }
}

export default Event;