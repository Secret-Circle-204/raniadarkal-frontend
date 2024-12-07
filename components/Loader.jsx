'use client'
import React, { useState, useEffect } from 'react'
export default function Loader ({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  return (
    <div id='mainpreloader'>
      {loading ? (
        <div className='preloader fadeOut'>
          <div className='mainpreloader'>
            <span className=' '></span>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
