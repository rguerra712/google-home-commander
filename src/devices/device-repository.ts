import { config, DynamoDB, AWSError } from 'aws-sdk';
import { Device } from './device';
import { DeviceSchemaValidator } from './device-schema-validator';
import { DeviceAssembler } from './device-assembler';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
config.update({
    region: process.env['region'],
});
export class DeviceRepository
{
    constructor() {
        if (!process.env.DYNAMODB_TABLE) {
            throw new Error('Cannot initialize repository without env variable DYNAMODB_TABLE');
        }
    }

    async get(userId: string) : Promise<Device[]> {
        return new Promise<Device[]>((resolve, reject) => {
            const dynamoDb = new DynamoDB.DocumentClient();
            const params = {
                TableName: process.env.DYNAMODB_TABLE || '',
                Key: {
                    UserId: userId,
                },
            };
            dynamoDb.get(params, (error: AWSError, data: GetItemOutput) => {
                if (error) {
                    reject(error);
                }
                // tslint:disable-next-line:no-any
                const item:any = data.Item || '';
                if (!item) {
                    reject(`no items found with user id ${userId}`);
                }
                const devices = item['Devices'];
                if (!devices) {
                    reject(`user as no items with user id ${userId}`);
                }
                const deviceAssembler = new DeviceAssembler();
                const devicesToReturn = deviceAssembler.assembleFrom(devices);
                resolve(devicesToReturn);
            });
        });
    }

    async getByDevice(userId: string, deviceId: string): Promise<Device | null> {
        const devices = await this.get(userId);
        const matches = devices.filter(device => device.deviceId === deviceId);
        if (matches.length > 0) {
            return matches[0];
        }
        return null;
    }

    save(userId: string, json: string) {
        const validator = new DeviceSchemaValidator();
        if (!validator.isValid(json)) {
            throw new Error('JSON should be valid');
        }
        const dynamoDb = new DynamoDB.DocumentClient();
        const params = {
            TableName: process.env.DYNAMODB_TABLE || '',
            Item: {
                UserId: userId,
                Devices: json
            },
        };
        dynamoDb.put(params, error => {
            if (error) {
                console.error(`Error updating device for user ${userId} with json ${json}, error: ${error}`);
            }
        });
    }
}
