import { Schema, Validator, ValidationError } from 'jsonschema';

export class DeviceSchemaValidator
{
    isValid(json: string): boolean {
        const validator = new Validator();
        try {
            const obj = JSON.parse(json);
            return validator.validate(obj, this.getSchemaDefinition()).valid;
        } catch {
            return false;
        }
    }

    getErrors(json: string): ValidationError[] {
        const validator = new Validator();
        const obj = JSON.parse(json);
        return validator.validate(obj, this.getSchemaDefinition()).errors;
    }

    private getSchemaDefinition(): Schema {
        return {
            "id": "/Devices",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": { "type": "string" },
                        "name": { "type": "string" },
                    },
                    "required": ["id", "name"]
                }
        };
    }
}