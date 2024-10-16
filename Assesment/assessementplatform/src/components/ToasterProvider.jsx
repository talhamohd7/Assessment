import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        style: {
          minWidth: "300px",
          maxWidth: "350px",
          height: "65px",
          fontSize: "16px",
          fontFamily: "Nunito",
        },
        success: {
          style: {
            borderLeft: "10px solid #61d345",
          }
        },
        error: {
          style: {
            borderLeft: "10px solid #ff4b4b",
          }
        },
      }}
    />
  )
}

export default ToasterProvider

// toast.error(
//   <div>
//     <span style={{ fontWeight: 'bold' }}>Successfully toasted!</span>
//     <br />
//     <span style={{ fontWeight: 'lighter' }}>Second line of the message.</span>
//   </div>,
//   {
//     duration: 600000
//   }
// )