import { create, ProducerMessage } from 'sqs-producer';
import { v1 } from 'uuid';

// tslint:disable-next-line:no-any
export function publish(url: string, method: string, body?:any) {
    const options = {
        queueUrl: process.env['HOME_NETWORK_QUEUE_URL'] || '',
        region: 'us-east-1', // TODO, make a parameter option on deploy
    };
    const producer = create(options);
    const messageBody = {
        url,
        method,
        body: JSON.stringify(body)
    };
    const message: ProducerMessage = {
        id: v1(),
        body: JSON.stringify(messageBody),
    };

    producer.send([message], err => {
        if (err) {
            console.error(err);
        }
    });
}