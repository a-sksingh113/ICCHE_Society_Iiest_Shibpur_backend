import React from 'react'
import Layout from '../../layout/Layout'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  return (
    <Layout>
        <Link to='/signup' className='btn btn-primary ms-3'>Signup</Link>
        <Link to='/login' className='btn btn-primary ms-3'>Login</Link>
    </Layout>
  )
}

export default UserProfile
