import { DeviceSchemaValidator } from './device-schema-validator';
import { Device } from './device';

export class DeviceAssembler
{
    assembleFrom(json: string): Device[] {
        const validator = new DeviceSchemaValidator();
        if (!validator.isValid(json)) {
            const errors = validator.getErrors(json);
            throw new Error(`invalid json provided to assemble: ${json}, errors: ${JSON.stringify(errors)}`);
        }
        const devices = JSON.parse(json);
        // tslint:disable-next-line:no-any
        return devices.map((device: any) => {
            return new Device(device.id, device.name);
        });
    }
}