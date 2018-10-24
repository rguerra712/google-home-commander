import { DeviceAssembler } from "../device-assembler";

test('should map multiple devices', () => {
    // Arrange
    const classUnderTest = new DeviceAssembler();
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
    const devices = classUnderTest.assembleFrom(json);

    // Assert
    expect(devices.length).toBe(2);
    expect(devices[0].deviceId).toBe('12341232412345afdasdf');
    expect(devices[0].deviceName).toBe('GoogleHome');
    expect(devices[1].deviceId).toBe('12341232412345afdasdf123');
    expect(devices[1].deviceName).toBe('GoogleHome2');
});

test('should map single device', () => {
    // Arrange
    const classUnderTest = new DeviceAssembler();
    const json = `[
        {
            "id": "12341232412345afdasdf123",
            "name": "GoogleHome2"
        }
    ]`;

    // Act
    const devices = classUnderTest.assembleFrom(json);

    // Assert
    expect(devices.length).toBe(1);
    expect(devices[0].deviceId).toBe('12341232412345afdasdf123');
    expect(devices[0].deviceName).toBe('GoogleHome2');
});