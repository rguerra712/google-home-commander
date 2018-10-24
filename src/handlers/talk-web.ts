import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { buildHtml } from '../html-builder';

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