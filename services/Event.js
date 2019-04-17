const moment = require('moment');

class Event {

    // get events array
    static getEvents() {
        const now = new Date();
        const events = [
            {
                id: 0,
                title: 'Meeting with Markus',
                allDay: true,
                start: moment(now).add(1, 'day'),
                end: moment(now).add(1, 'day'),
            },
            {
                id: 1,
                title: 'Discussion for new projects',
                start: new Date(2015, 3, 7),
                end: new Date(2015, 3, 10),
            },

            {
                id: 2,
                title: 'Attend conference in Flatiron',
                start: new Date(2016, 2, 13, 0, 0, 0),
                end: new Date(2016, 2, 20, 0, 0, 0),
            },

            {
                id: 3,
                title: 'Meeting with investors',
                start: new Date(2016, 10, 6, 0, 0, 0),
                end: new Date(2016, 10, 13, 0, 0, 0),
            },

            {
                id: 4,
                title: 'Birthday Party',
                start: new Date(2015, 3, 9, 0, 0, 0),
                end: new Date(2015, 3, 10, 0, 0, 0),
            },
        ];

        return events;
    }
}

export default Event;