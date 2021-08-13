import axios, { AxiosInstance } from 'axios'

import { EmailSender, EmailSenderInput } from '../../data/contracts/email-sender'

export class EmailAdapter implements EmailSender {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL })
  }

  async send(data: EmailSenderInput): Promise<void> {
    await this.client.post('/send-email',
      {
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
    )
  }
}