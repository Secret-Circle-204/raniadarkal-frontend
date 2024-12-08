// api/mailer/route.js
import { NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'

export async function POST(request) {
  const username = process.env.EMAIL_USERNAME
  const password = process.env.EMAIL_PASSWORD
  const recipientEmail = process.env.RECIPIENT_EMAIL
  // const recipientEmail2 = process.env.RECIPIENT_EMAIL_2

  const formData = await request.formData()
  const name = formData.get('name')
  const address = formData.get('address')
  const phone = formData.get('phone')
  const email = formData.get('email')
  const message = formData.get('message')

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: { user: username, pass: password },
    tls: { rejectUnauthorized: false }
  })

  const mailOptions = {
    from: username,
    replyTo: email,
    subject: `Website activity from ${email}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-bottom: 20px">
       <h1 style="font-size: 20px; margin-bottom: 20px;">Elia-Youssef-Design-Website-Request</h1>
       <p style="margin-bottom: 10px; font-size:13px;"><span style="font-size:16px; color:#bd9060;">User Name: </span>${name}</p>
       <p style="margin-bottom: 10px; font-size:13px;"><span style="font-size:16px; color:#bd9060;">User Address: </span>${address}</p>
       <p style="margin-bottom: 10px; font-size:13px;"><span style="font-size:16px; color:#bd9060;">User Phone: </span>${phone}</p>
       <p style="margin-bottom: 10px; font-size:13px;"><span style="font-size:16px; color:#bd9060;">User Email: </span>${email}</p>
       <p style="margin-bottom: 10px; font-size:13px;"><span style="font-size:16px; color:#bd9060;">User Message: </span>${message}</p>
      </div>
    `
  }

  try {
    await transporter.sendMail({ ...mailOptions, to: recipientEmail })
    // await transporter.sendMail({ ...mailOptions, to: recipientEmail2 })
    return NextResponse.json({ message: 'Success: email was sent' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ message: 'COULD NOT SEND MESSAGE' }, { status: 500 })
  }
}