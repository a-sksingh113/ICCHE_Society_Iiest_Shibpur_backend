import React from 'react'
import Layout from "../../layout/Layout";
import "./Farewell.css"
const Farewell = () => {
  return (
    <Layout>
      <div className='farewell'>
         <div className="cardv" style={{ width: "18rem" }}>
          <div>
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Card image"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Title</h5>
            <pre>Description</pre>
            <pre>Date</pre>
            <pre>Venue</pre>
          </div>
        </div>
        <div className="cardv" style={{ width: "18rem" }}>
          <div>
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Card image"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Title</h5>
            <pre>Description</pre>
            <pre>Date</pre>
            <pre>Venue</pre>
          </div>
        </div>
        <div className="cardv" style={{ width: "18rem" }}>
          <div>
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Card image"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Title</h5>
            <pre>Description</pre>
            <pre>Date</pre>
            <pre>Venue</pre>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Farewell
