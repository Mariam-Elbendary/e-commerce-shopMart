import React from 'react'
import {RiseLoader} from 'react-spinners'
export default function loading() {
  return (
      <div className='h-screen bg-gray-100 flex items-center justify-center '>
          <RiseLoader color="#432DD7" />
    </div>
  )
}
