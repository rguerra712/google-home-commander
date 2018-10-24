import { DeviceSchemaValidator } from './../device-schema-validator';

test('should be valid for device with id and name', () => {
    // Arrange
    const deviceSchemaValidator = new DeviceSchemaValidator();
    const json = `[
        {
            "id": "12341232412345afdasdf",
            "name": "GoogleHome",
            "connection": "disconnected",
            "address": {
                "host": "192.168.1.1",
                "port": 1234
            },
            "status": {
                "volume": 0,
                "muted": false,
                "application": "",
                "status": "",
                "title": "",
                "subtitle": "",
                "image": ""
            }
        }
    ]`;

    // Act
    const isValid = deviceSchemaValidator.isValid(json);

    // Arrange
    expect(isValid).toBe(true);
});

test('should be valid for device with id and name for two entries', () => {
    // Arrange
    const deviceSchemaValidator = new DeviceSchemaValidator();
    const json = `[
        {
            "id": "12341232412345afdasdf",
            "name": "GoogleHome",
            "connection": "disconnected",
            "address": {
                "host": "192.168.1.1",
                "port": 1234
            },
            "status": {
                "volume": 0,
                "muted": false,
                "application": "",
                "status": "",
                "title": "",
                "subtitle": "",
                "image": ""
            }
        },
        {
            "id": "12341232412345afdasdf123",
            "name": "GoogleHome2"
        }
    ]`;

    // Act
    const isValid = deviceSchemaValidator.isValid(json);

    // Arrange
    expect(isValid).toBe(true);
});

test('should be invalid if missing id', () => {
    // Arrange
    const deviceSchemaValidator = new DeviceSchemaValidator();
    const json = `[
        {
            "name": "12341232412345afdasdf"
        }
    ]`;

    // Act
    const isValid = deviceSchemaValidator.isValid(json);

    // Arrange
    expect(isValid).toBe(false);
});

test('should be invalid if missing name', () => {
    // Arrange
    const deviceSchemaValidator = new DeviceSchemaValidator();
    const json = `[
        {
            "id": "12341232412345afdasdf"
        }
    ]`;

    // Act
    const isValid = deviceSchemaValidator.isValid(json);

    // Arrange
    expect(isValid).toBe(false);
});

test('should be invalid if bad json', () => {
    // Arrange
    const deviceSchemaValidator = new DeviceSchemaValidator();
    const json = `[
        {
            "id": "12341232412345afdasdf",
            "name": "12341232412345afdasdf"
    ]`;

    // Act
    const isValid = deviceSchemaValidator.isValid(json);

    // Arrange
    expect(isValid).toBe(false);
});
