import { PubSub, Topic } from '@google-cloud/pubsub'

import { EmailSender, EmailSenderInput } from '../../data/contracts/email-sender'

export class EmailAdapter implements EmailSender {
  private readonly topic: Topic

  constructor(topicName: string) {
    this.topic = new PubSub().topic(topicName);
  }

  async send(data: EmailSenderInput): Promise<void> {
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

    await this.topic.publish(messageBuffer);
  }
}