const moment = require('moment');

class Event {

    // get events array
    static getEvents() {
        const events = [
            {
                id: 0,
                title: 'Meeting with Markus',
                allDay: true,
                start: moment().add(1, 'day').hours(1).minutes(0).toDate(),
                end: moment().add(1, 'day').hours(1).minutes(30).toDate(),
            },
            {
                id: 1,
                title: 'Discussion for new projects',
                start: moment().add(2, 'day').hours(3).minutes(15).toDate(),
                end: moment().add(2, 'day').hours(3).minutes(45).toDate(),
            },
            {
                id: 2,
                title: 'Attend conference in Flatiron',
                start: moment().add(2, 'day').hours(4).minutes(0).toDate(),
                end: moment().add(2, 'day').hours(6).minutes(0).toDate(),
            },
            {
                id: 3,
                title: 'Meeting with investors',
                start: moment().add(3, 'day').hours(2).minutes(15).toDate(),
                end: moment().add(3, 'day').hours(4).minutes(15).toDate(),
            },
            {
                id: 4,
                title: 'Birthday Party',
                start: moment().add(4, 'day').hours(1).minutes(15).toDate(),
                end: moment().add(4, 'day').hours(3).minutes(30).toDate(),
            },
        ];

        return events;
    }
}

export default Event;