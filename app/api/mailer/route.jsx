import { NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'

// Handles POST requests to /api
export async function POST(request) {
  // const username = process.env.NEXT_PUBLIC_BURNER_USERNAME || 'info@raniadarkal.com'
  const username = 'info@raniadarkal.com'
  const password = 'Elia@raniadarkal'
  const recipientEmail = 'info@raniadarkal.com'
  // const recipientEmail2 = 'test@gmail.com'
  const myEmail = 'info@raniadarkal.com'
  // const myEmail2 = 'test@gmail.com'

  console.log('dealing with request' + recipientEmail)
  // console.log('dealing with request' + recipientEmail + recipientEmail2)
  const formData = await request.formData()
  const senderName = formData.get('name')
  const senderAddress = formData.get('address')
  const senderPhone = formData.get('phone')
  const senderEmail = formData.get('email')
  const senderMessage = formData.get('message')
  // const email = formData.get('email')
  // const name = formData.get('name')
  // const address = formData.get('address')
  // const phone = formData.get('phone')
  // const message = formData.get('message')
  console.log('**>>>>>>' + formData.get('name') + formData.get('phone') + formData.get('address') + senderEmail + ' ' + senderMessage + myEmail + ' ' + username + ' ' + password)
  // create transporter object
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com", //'smtpout.secureserver.net',// 'smtp.office365.com', //'smtpout.secureserver.net',
    port: 587, //587, //465
    // secure: false, // Not recommended for production
    auth: {
      user: username,
      pass: password
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // send mail with defined transport object


  try {
    const mail = await transporter.sendMail({
      from: username,
      to: recipientEmail,
      replyTo: senderEmail,
      subject: `Website activity from ${senderEmail}`,
      to: myEmail,  
      // replyTo: email,
      // subject: `Website activity from ${email}`,
      html: ` 
        
        <div style=" font-family: Arial, sans-serif; flex-direction: column; align-items: left; justify-content: space-between; text-align: left; padding: 20px; background-color: #f5f5f5; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-bottom: 20px  ">
         <h1 style="font-size: 20px; margin-bottom: 20px;"> Elia-Youssef-Design-Website-Request </h1>
         <div> <p style="margin-bottom: 10px; font-size:13px;"> <span style="font-size:16px; color:#bd9060;"> User Name:   </span> ${senderName}  </p></div>
         <div> <p style="margin-bottom: 10px; font-size:13px;"> <span style="font-size:16px; color:#bd9060;"> User Address: </span>  ${senderAddress} </p></div>
         <div> <p style="margin-bottom: 10px; font-size:13px;"> <span style="font-size:16px; color:#bd9060;"> User Phone:   </span> ${senderPhone}  </p></div>
         <div> <p style="margin-bottom: 10px; font-size:13px;"> <span style="font-size:16px; color:#bd9060;"> User Email:   </span> ${senderEmail}   </p></div>
         <div> <p style="margin-bottom: 10px; font-size:13px;"> <span style="font-size:16px; color:#bd9060;"> User Message: </span>  ${senderMessage}   </p></div>   
        </div>
                `
    })
    // const mail2 = await transporter.sendMail({
    //   from: username,
    //   to: myEmail2,
    //   replyTo: email,
    //   subject: `Website activity from ${email}`,
    //   html: `
    //             <p>Name: ${name} </p>
    //             <p>Address: ${address} </p>
    //             <p>Phone: ${phone} </p>
    //             <p>Email: ${email} </p>
    //             <p>Message: ${message} </p>

    //             <p>Phone: ${senderPhone} </p>
    //             <p>Email: ${senderEmail} </p>
    //             <p>Message: ${senderMessage} </p>
    //             `
    // })

    console.log('mail :', mail)
    // console.log('mail :', mail, ' mail2 :', mail2)
    return NextResponse.json({ message: 'Success: email was sent' })
  } catch (error) {
    console.log(error)
    NextResponse.status(500).json({ message: 'COULD NOT SEND MESSAGE' })
  }
}

