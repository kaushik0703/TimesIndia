import React, { Component } from 'react'
import loading from './loading.gif'

const Spinner = () => {
  return (
    <div className='text-center'>
      <img style={{width: "6rem"}} src={loading} alt="loading" />
    </div>
  )
}

export default Spinner
