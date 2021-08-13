export type EmailSenderInput = {
  to: {
    name: string,
    email: string
  }
  subject: string
  content: string
} 

export interface EmailSender {
  send(data: EmailSenderInput): Promise<void>
}