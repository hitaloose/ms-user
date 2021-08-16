import {PubSub} from '@google-cloud/pubsub'

import { EmailSender, EmailSenderInput } from '../../data/contracts/email-sender'

export class EmailAdapter implements EmailSender {
  private pubsub: PubSub

  constructor(baseURL: string) {
    this.pubsub = new PubSub();
  }

  async send(data: EmailSenderInput): Promise<void> {
    const topic = this.pubsub.topic('SEND_EMAIL');

    const payload = {
      to: {
        name: data.to.name,
        email: data.to.email
      },
      from: {
        name: "Default send email",
        email: "noreply@email.com"
      },
      subject: data.subject,
      content: data.content
    }

    const messageBuffer = Buffer.from(JSON.stringify(payload), 'utf8');

    await topic.publish(messageBuffer);
  }
}