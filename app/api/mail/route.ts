import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer'
import DOMPurify from 'dompurify'
import { CustomError, CustomTransporter } from '@interfaces'

// type CustomTransporter = Transporter<SentMessageInfo>;

export const POST = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = await req.json();

    // Sanitize HTML content using DOMPurify
    // const sanitizedMessage = DOMPurify.sanitize(message)

    // Create a nodemailer transporter
    const transporterOptions = {
      host: process.env.SMTP_HOST || 'localhost',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: true, // Use SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }
    const transporter: CustomTransporter = nodemailer.createTransport(transporterOptions);
    // Setup email data
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      // Use sanitized content in the email text
      text: `Hello ${name},\n\n${message}`,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // res.status(200).json({ success: true, messageInfo: info });
    return new Response(
      JSON.stringify(info),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (err) {
    console.error(err)
    const error = err as CustomError;
    return new Response("Error sending email", { status: error.status });
  }
}