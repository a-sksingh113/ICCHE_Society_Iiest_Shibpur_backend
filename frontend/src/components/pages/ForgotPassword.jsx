import React from "react";
import Layout from "../layout/Layout";
import Style from '../../cssFiles/login.module.css'


const ForgotPassword = () => {
  return( 
  <Layout>
   <div className={`${Style.container}`}>
    <form>
        <label>Email</label>
        <input type='text'></input>
        <button type='submit'>Submit</button>
    </form>
   </div>
  </Layout>);
  
};

export default ForgotPassword;
