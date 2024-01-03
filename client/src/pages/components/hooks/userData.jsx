import React from 'react'
import useAuth from './useAuth'
import axios from '../../../api/axios'

const userData = () => {

    const {email} = useAuth()

    
  return (
    <div>userData</div>
  )
}

export default userData