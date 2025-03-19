import React from 'react'
import Header from './Header'
// import Footer from './Footer'
import FooterDemo from './FooterDemo'
const Layout = (props) => {
  return (
    <div>
      <Header/>
      <main style={{minHeight:'80vh'}}>
      {props.children}
      </main>
      <FooterDemo/>
    </div>
  )
}

export default Layout
