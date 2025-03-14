import React from 'react'
import Layout from '../../layout/Layout'

const Students = () => {
  
  return (
   <Layout>
    <div className='students'>
    <div className="cards" style={{ width: "18rem" }}>
          <div>
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Card image"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Full Name</h5>
            <pre>Unique ID:</pre>
            <pre>Gender:</pre>
            <pre>Class:</pre>
            <pre>Address:</pre>
          </div>
        </div>
        <div className="cards" style={{ width: "18rem" }}>
          <div>
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Card image"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Full Name</h5>
            <pre>Unique ID:</pre>
            <pre>Gender:</pre>
            <pre>Class:</pre>
            <pre>Address:</pre>
          </div>
        </div>
        <div className="cards" style={{ width: "18rem" }}>
          <div>
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Card image"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Full Name</h5>
            <pre>Unique ID:</pre>
            <pre>Gender:</pre>
            <pre>Class:</pre>
            <pre>Address:</pre>
          </div>
        </div>
        <div className="cards" style={{ width: "18rem" }}>
          <div>
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Card image"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Full Name</h5>
            <pre>Unique ID:</pre>
            <pre>Gender:</pre>
            <pre>Class:</pre>
            <pre>Address:</pre>
          </div>
        </div>
    </div>
   </Layout>
  )
}

export default Students
