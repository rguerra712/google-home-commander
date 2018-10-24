import { GoogleCommander } from '../google-commander';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

export const talk: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const googleCommander = new GoogleCommander();
  const query = event.queryStringParameters || {};
  const text = query['text'];
  if (!text) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'text query string is required!',
      }),
    };

    cb(null, response);
    return;  
  }
  let deviceId = query && query['deviceId'];
  if (!deviceId) {
    deviceId = process.env['DEFAULT_HOME_DEVICE_ID'] || '';
  }
  googleCommander.talk(text, deviceId);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Message sent!',
    }),
  };

  cb(null, response);
};