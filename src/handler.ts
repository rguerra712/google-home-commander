import { GoogleCommander } from './google-commander';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { buildHtml } from './html-builder';

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
  googleCommander.talk(text);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Message sent!',
    }),
  };

  cb(null, response);
};

export const talkWebsite: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: buildHtml(),
  };

  cb(null, response);
};