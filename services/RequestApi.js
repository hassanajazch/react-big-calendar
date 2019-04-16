import UserService from './UserService';

const url = 'http://localhost:4000';
import myConstantClass from './constant';

class RequestApi {
    static async saveMeeting(body) {
        body.token = await UserService.getCurrentUserToken();
        return await fetch(`${url}/meetingEvent`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    }

    static async getCalendars() {
        return await fetch(`${url}/googleCalendar`, {method: 'GET'});
    }

    static async getCalendarEvents(calendarID) {
        return await fetch(`${url}/googleCalendar/getEvents`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({calendarId: calendarID})
        });
    }

    static async requestService(url, type, postData) {
        let headers = {};

        if (type === 'POST' || type === 'PUT' || type === 'DELETE') {

            headers = {
                method: type,
                body: JSON.stringify(postData),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            }

        } else if (type === 'GET') {
            headers = {
                method: type,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            }
        }
        return new Promise(async function (resolve, reject) {
            await fetch(url, headers)
                .then(response => response.json())
                .then( (result) => {
                    if(result) {
                        return resolve(result.data);
                    }
                    return reject(false);
                })
                .catch((error) => {
                    console.log(error);
                    return reject(error);
                });
        });
    }
}

export default RequestApi