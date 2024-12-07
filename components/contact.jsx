import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useCallback, useRef } from 'react'
// import { STRAPI_API_URL } from '@/utils/urls'
import { toast } from 'react-toastify'
import { sendRenderResult } from 'next/dist/server/send-payload'

export default function Contact () {
  const router = useRouter()
  //Displaying Loading State on the page for 3 seconds before redirecting to the services page
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(true)
  const [err, setErr] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const axios = require('axios')

  const handleSubmit = async e => {
    const formData = new FormData(e.target)

    e.preventDefault()

    const data = JSON.stringify({
      data: {
        name: name,
        email: email,
        phone: phone,
        message: message
      }
    })

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `localhost:8055/items/inbox`,
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // timeout: 2000,
      data: data
    }

    const config2 = await fetch('/api/mailer', {
      method: 'post',
      body: formData
    })
    const res = await axios(config)
      .then(() => {
        // toast the success message

        setSuccess(true)

        toast.success('Your Message is sent successfully.', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })

        setTimeout(() => {
          return sendRenderResult({ pa })
          setLoading(false)
          router.reload()
        }, 2000)
      })
      .catch(err => {
        // toast the error message
        setErr(err)
        toast.error('Something went wrong, please try again.', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      })
  }

  return (
    <div>
      <div className=' max-w-[1300px] mx-auto pt-52 pb-16 lg:pb-30 lg:flex  p-3 lg:flex-row  '>
        {/* start-googel-map */}
        <div className='w-full mx-auto lg:px-28 lg:pb-16 lg:flex lg:flex-row lg:gap-x-6 sm:flex-col max-sm:space-y-6 '>
          <div className='  w-[50%] max-sm:w-full  bg-blue1 h-full  '>
            <form onSubmit={handleSubmit} className=' p-8 space-y-8'>
              <h2 className='text-white'>Send Us a Message</h2>
              <div className='shadow-md shadow-blue1/20 rounded-lg'>
                <label className='sr-only' htmlFor='name'>
                  Name
                </label>
                <input
                  className={` w-full rounded-lg border-blue2  p-3 text-sm `}
                  placeholder='Name'
                  type='text'
                  id='name'
                  name='name'
                  onChange={e => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>

              <div className='grid grid-cols-1  gap-4 sm:grid-cols-2'>
                <div className='shadow-md shadow-blue1/20 rounded-lg '>
                  <label className='sr-only' htmlFor='email'>
                    Email
                  </label>
                  <input
                    className='w-full rounded-lg border-blue2  p-3 text-sm'
                    placeholder='Email'
                    type='email'
                    id='email'
                    name='email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>

                <div className='shadow-md shadow-blue1/20 rounded-lg '>
                  <label className='sr-only' htmlFor='phone'>
                    Phone
                  </label>
                  <input
                    className='w-full rounded-lg border-blue2  p-3 text-sm'
                    placeholder='Phone'
                    type='tel'
                    id='phone'
                    name='phone'
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    required
                  />
                </div>
              </div>

              <div className='shadow-md shadow-blue1/20  rounded-lg'>
                <label className='sr-only' htmlFor='message'>
                  Message
                </label>

                <textarea
                  className='w-full rounded-lg border-blue2  p-3 text-sm'
                  placeholder='Message'
                  name='message'
                  rows='8'
                  id='message'
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  required
                ></textarea>
              </div>

              <div className='mt-4'>
                <button
                  type='submit'
                  disabled={setErr}
                  value='submit'
                  onClick={handleSubmit}
                  className='inline-block w-full rounded-lg bg-blue1 hover:bg-blue2 px-5 py-3 font-medium text-white sm:w-auto'
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
          <div className=' w-[50%] max-sm:w-full max-sm:h-[450px]  h-full'>
            <iframe
              className=' '
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5180.405439589398!2d55.3815486103978!3d25.183563586105393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f67201721f425%3A0xb19cd58d88cd20aa!2sNadd%20Al%20Hamar%20-%20Dubai!5e0!3m2!1sen!2sae!4v1694455037505!5m2!1sen!2sae" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
        {/* end-googel-map */}
      </div>
    </div>
  )
}
