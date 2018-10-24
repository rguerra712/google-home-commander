import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { HtmlBuilder } from '../html-builder';
import { DeviceRepository } from '../devices/device-repository';

export const talkWebsite: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const htmlBuilder = new HtmlBuilder(new DeviceRepository());
    const homeUserId = process.env['HOME_USER_ID'];
    if (!homeUserId) {
        throw new Error('HOME_USER_ID needs to be configured');
    }
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: await htmlBuilder.buildHtml(homeUserId),
    };

    cb(null, response);
};