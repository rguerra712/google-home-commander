import { publish } from './message-publisher';

export class GoogleCommander
{
    talk = (text: string): void => {
        const baseUrl = process.env['HOME_NETWORK_COMMUNICATOR_BASE_URL'];
        const deviceId = process.env['DEFAULT_HOME_DEVICE_ID']; // TODO, more dynamic
        const url = `${baseUrl}/device/${deviceId}/playMedia`;
        const body = [
            {
                mediaTitle: text,
                googleTTS: "en-US",
            }
        ];
        publish(url, 'POST', body);
    }
}