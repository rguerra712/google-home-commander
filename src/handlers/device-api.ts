import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { DeviceRepository } from '../devices/device-repository';
import { DeviceSchemaValidator } from '../devices/device-schema-validator';

export const getDevice: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const params = event.pathParameters || {};
    const userId = params['userId'];
    if (!userId) {
        const response = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'userId is required!',
            }),
        };

        cb(null, response);
        return;
    }
    const deviceRepository = new DeviceRepository();
    const devices = await deviceRepository.get(userId);
    const response = {
        statusCode: 200,
        body: JSON.stringify(devices, null, 2),
    };

    cb(null, response);
};

export const getDeviceById: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const params = event.pathParameters || {};
    const userId = params['userId'];
    const deviceId = params['deviceId'];
    if (!userId) {
        const response = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'userId and deviceId are required!',
            }),
        };

        cb(null, response);
        return;
    }

    const deviceRepository = new DeviceRepository();
    const device = await deviceRepository.getByDevice(userId, deviceId);
    if (!device) {
        const response = {
            statusCode: 404,
            body: JSON.stringify({
                message: 'Device not found!',
            }),
        };

        cb(null, response);
        return;
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(device, null, 2),
    };

    cb(null, response);
};

export const postDevice: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const {pathParameters} = event;
    const userId = pathParameters && pathParameters['userId'];
    if (!userId) {
        const response = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'userId is required!',
            }),
        };

        cb(null, response);
        return;
    }
    const body = event.body || '';
    const deviceSchemaValidator = new DeviceSchemaValidator();
    if (!deviceSchemaValidator.isValid(body)) {
        const response = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'invalid body provided, does not match expected cast api body!',
            }),
        };

        cb(null, response);    
    }
    const deviceRepository = new DeviceRepository();
    deviceRepository.save(userId, body);

    const response = {
        statusCode: 201,
    };
    cb(null, response);
};