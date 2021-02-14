import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../assets/css/carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priceFormat } from "./NumberFormat";
class TrendingCarCard extends Component {
  state = {};
  render() {
    const data = this.props.data;
    const iconsStyle = {
      color: "#009688",
      marginRight: "10px",
    };

    const imageStyle = {
      width: "100%",
      height: "11rem",
      objectFit: "cover",
    };
    return (
      <div>
        {data.length > 0 ? (
          <div>
            <hr />
            <div className="col-sm text-center" style={{ marginTop: "30px" }}>
              <div class="card" style={{ width: "18rem;" }}>
                <img class="card-img-top" src="..." alt="Card image cap" />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                <div class="card-body">
                  <a href="#" class="card-link">
                    Card link
                  </a>
                  <a href="#" class="card-link">
                    Another link
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TrendingCarCard;
