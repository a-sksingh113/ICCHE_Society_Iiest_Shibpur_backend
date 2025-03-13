import React from "react";
import Layout from "../../layout/Layout";

import { Link } from "react-router-dom";
const Activities = () => {
  return (
    <Layout>
      <div class="activities">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://via.placeholder.com/150"
            className="card-img-top"
            alt="Card image"
          />
          <div className="card-body">
            <h5 className="card-title">Sports</h5>
            <p className="card-text">
              "Sports teach us teamwork, discipline, and never giving up! 🏆
              Many great athletes started with nothing but a dream. Keep
              playing, keep believing—your passion can take you anywhere!" 💪🔥
            </p>
            <button type="button" class="btn btn-primary">
              <Link to="/sports">More info</Link>
            </button>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://via.placeholder.com/150"
            className="card-img-top"
            alt="Card image"
          />
          <div className="card-body">
            <h5 className="card-title">Drawing Competition</h5>
            <p className="card-text">
            "Every great artist starts with a single stroke! 🎨✨ Your creativity has no limits—let your imagination shine and paint a world full of possibilities!" 🖌️💖
            </p>
            <button type="button" class="btn btn-primary">
              <Link to="/drawing">More info</Link>
            </button>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://via.placeholder.com/150"
            className="card-img-top"
            alt="Card image"
          />
          <div className="card-body">
            <h5 className="card-title">Origami</h5>
            <p className="card-text">
            "A simple fold can create something amazing! 🦋✨ Origami teaches patience, creativity, and the magic of transformation. Keep folding, keep creating!" 📄💡
            </p>
            <button type="button" class="btn btn-primary">
              <Link to="/origami">More info</Link>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Activities;
