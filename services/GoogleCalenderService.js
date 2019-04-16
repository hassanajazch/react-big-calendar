import UserService from './UserService';


const url = 'http://localhost:4000';

class GoogleCalenderService {

    static async getUserCalenders() {
        const userToken = await UserService.getCurrentUserToken();
        const result = await fetch(`${url}/googleCalendar`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: userToken})
        });
        return await result.json();
    }

    static async getUserCalenderEvent(calendarID) {
        const userToken = await UserService.getCurrentUserToken();
        const result = await fetch(`${url}/googleCalendar/getEvents`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({calendarId: calendarID, token: userToken})
        });
        return await result.json();
    }

}

export default GoogleCalenderService;