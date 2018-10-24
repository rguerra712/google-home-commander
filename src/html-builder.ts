import { DeviceRepository } from './devices/device-repository';
export class HtmlBuilder {
  private deviceRepository: DeviceRepository;

  constructor(deviceRepository: DeviceRepository) {
      this.deviceRepository = deviceRepository;
  }

  async buildHtml(homeUserId: string) {
    const deviceOptions = await this.getDeviceOptions(homeUserId);
    return `
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <style>
      .flex-container {
        display: flex;
        flex-direction: column;
      }
      .input-text {
        background-color: #ffffff;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        line-height: 75px;
        font-size: 40px;
      }
      .input-button {
        background-color: #ffffff;
        position: absolute;
        right: 0px;
        line-height: 75px;
        text-align: center;
        font-size: 30px;
        background-color: LightBlue;
      }
    </style>
    <meta charset="UTF-8">
    <title>Chat with google</title>
  </head>
  <body>
    <form onsubmit="talk()" class="flex-container">
      <label>Choose your device:</label>
      <select id="device">
        ${deviceOptions}
      </select>
      <div>
        <input type="text" id="text-to-send" class="input-text" autofocus autocomplete="off"></input>
      </div>
      <div>
        <input type="submit" class="input-button">
      </div>
    </form>
  </body>
  <script>
    const talk = async () => {
    const textInput = document.getElementById('text-to-send');
    const text = textInput.value;
    let url = "${process.env['AWS_API_POST_URL']}?text=" + text;
    const device = document.getElementById('device');
    const deviceValue = device.value;
    if (deviceValue) {
      url = url + '&deviceId=' + deviceValue;
    }
    const response = await fetch(url, { method: 'POST' })
    console.log(response.status);
    textInput.clear();
    return false;
    }
  </script>
</html>`;
  }

  private async getDeviceOptions(homeUserId: string): Promise<string> {
    const devices = await this.deviceRepository.get(homeUserId);
    const options = devices.map(device => `<option value="${device.deviceId}">${device.deviceName}</option>`);
    return options.join('\n');
  }
}