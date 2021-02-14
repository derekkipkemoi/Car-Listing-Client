import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../assets/css/carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priceFormat } from "./NumberFormat";

class Carousel extends Component {
  state = {};

  componentDidMount() {
    window.$("#recipeCarousel").carousel({
      interval: 10000,
    });

    window.$(".carousel .carousel-item").each(function () {
      var minPerSlide = 4;
      var next = window.$(this).next();
      if (!next.length) {
        next = window.$(this).siblings(":first");
      }
      next.children(":first-child").clone().appendTo(window.$(this));

      for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
          next = window.$(this).siblings(":first");
        }

        next.children(":first-child").clone().appendTo(window.$(this));
      }
    });
  }

  imageToClass = (imagePosition) => {
    var imageClass = "";
    if (imagePosition === 0) {
      imageClass = "carousel-item active";
    } else {
      imageClass = "carousel-item";
    }
    return imageClass;
  };

  render() {
    const data = this.props.data;
    //console.log(data.indexOf(data[0]))
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
          <div className="row justify-content-center">
            <p className="text-centre font-weight-bold">Featured Vehicles</p>
            <div
              id="recipeCarousel"
              className="carousel slide w-100"
              data-ride="carousel"
            >
              <div className="carousel-inner w-100">
                {data.map((car, i) => (
                  <div key={i} className={this.imageToClass(data.indexOf(car))}>
                    <div className="col-md-4">
                      <Link
                        to={`/vehicle/${car._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="shadow card h-100">
                          <img
                            src={car.images[0]}
                            className="card-img-top"
                            style={imageStyle}
                            alt="..."
                          />

                          <div className="card-body">
                            <h6 className="card-titlel font-weight-bold">
                              {car.name}
                            </h6>

                            <p className="card-text">
                              {" "}
                              <FontAwesomeIcon
                                icon="map-marker-alt"
                                style={iconsStyle}
                              />
                              {car.location}
                            </p>
                          </div>

                          <ul className="list-group list-group-flush">
                            <li
                              className="list-group-item"
                              style={{ color: "#009688" }}
                            >
                              {priceFormat(car.price)}
                            </li>
                          </ul>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev w-auto"
                href="#recipeCarousel"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-dark border border-dark rounded-circle"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next w-auto"
                href="#recipeCarousel"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-dark border border-dark rounded-circle"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Carousel;
