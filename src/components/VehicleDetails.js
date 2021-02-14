import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ImageGallery from "react-image-gallery";

import { numberFormat, priceFormat } from "./NumberFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import CarCard from "./CarCard";


import {FacebookShareButton, WhatsappShareButton, TwitterShareButton} from "react-share"
import {FacebookIcon, WhatsappIcon, TwitterIcon} from "react-share"

class VehicleDetails extends Component {
  state = {
    loading: true,
    sellerNumber: "Show Contact",
    sellerJoinedAt: null,
    cars: this.props.carsList,
    carId :this.props.match.params.vehicleId
  };

  componentDidUpdate(prevProps, prevState){
    if (prevState.carId !== this.props.match.params.vehicleId) {
      console.log("Car Id Param cahnged")
      window.location.reload();
    }
  }
  componentDidMount = async () => {
    await this.props.getCar(this.props.match.params.vehicleId);
    await this.props.getCarsList();
    var dateString = this.props.carSeller.sellerAvailableSince;
    dateString = new Date(dateString).toUTCString();
    dateString = dateString.split(' ').slice(0, 4).join(' ')

    this.setState({
      loading: false,
      cars: this.props.carsList,
      sellerJoinedAt: dateString
      });
    
  };



  

  showSellerNumber(sellerNumber) {
    this.setState({
      sellerNumber: "0" + sellerNumber,
    });
  }
  render() {
    const rowStyle = {
      backgroundColor: "#00bfa5",
      color: "#fff",
      padding: "5px",
    };
    const priceStyle = {
      color: "#fff",
    };
    const featureStyle = {
      backgroundColor: "#00bfa5",
      color: "#fff",
    };
    const myStyle = {
      color: "#009688",
    };

    const iconsStyle = {
      color: "#00544C",
      marginLeft: "10px",
      marginRight: "10px",
    };

    const socialMediaIconsStyle = {
      marginTop: "10px",
    };

    const featureiconsStyle = {
      color: "#ffff",
      marginLeft: "10px",
      marginRight: "10px",
    };

    const svgImageStyle = {
      width: "30px",
      marginRight: "5px",
      color: "#fff",
    };

    var id = this.props.carDetails._id
    let filteredCars = this.state.cars;
    var index = filteredCars.map(car => {
      return car._id;
    }).indexOf(id);

    filteredCars.splice(index, 1)

    if (filteredCars.length > 0) {
      filteredCars = filteredCars.filter((myCar) =>
        myCar.body.includes(this.props.carDetails.body)
      );
    }

    const compare = ( a, b ) => {
      if ( a.model < b.model ){
        return -1;
      }
      if ( a.model > b.model ){
        return 1;
      }
      return 0;
    }

    filteredCars.sort(compare)
   
    // const carDetails = this.props.carDetails;
    // const carImages = this.props.carImages;
    // const carFeatures = this.props.carFeatures;
    // const carSeller = this.props.carSeller;
     const shareUrl = this.props.carImages[0];
    // const appId = this.props.carImages[0];

    var sliderImages = [];
    if(this.props.carImages && this.props.carImages.length > 0){
      this.props.carImages.map((imageItem) =>
      sliderImages.push({
        original: imageItem,
        thumbnail: imageItem,
      })
    );
    }
    
    
    
    return (
      <div className="container">
        <nav aria-label="breadcrumb" style={{ marginTop: "70px" }}>
          <ol
            className="breadcrumb arr-right"
            style={{ backgroundColor: "#00bfa5" }}
          >
            <li className="breadcrumb-item ">
              <Link to={`/`} className="text-light">
                Home
              </Link>
            </li>
            
            <li className="breadcrumb-item ">
              <Link to={`/listcars/${this.props.carDetails.make}`} className="text-light">
                {this.props.carDetails.make}
              </Link>
            </li>


            <li className="breadcrumb-item ">
              <Link
                to={`/listcars/${this.props.carDetails.make}/${this.props.carDetails.model}`}
                className="text-light"
              >
                {this.props.carDetails.model}
              </Link>
            </li>
            <li className="breadcrumb-item text-light">{this.props.carDetails.name}</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-9">
            {this.state.loading ? <Spinner/> : null}
            <div className="row mx-auto shadow-lg" style={rowStyle}>
              <div className="col">
                <h6 className="font-weight-bold" style={{ color: "white" }}>
                  {this.props.carDetails.name}
                </h6>
              </div>

              <div className="col">
                <div className="row">
                  <h6
                    className="font-weight-bold text-center"
                    style={priceStyle}
                  >
                    {" "}
                    {priceFormat(this.props.carDetails.price)}{" "}
                  </h6>
                  <div>
                    {" "}
                    {this.props.carDetails.priceNegotiable ? (
                      <h6 className="font-weight-bold text-warning">
                        NEGOTIABLE
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <h6 className="font-weight-bold">
                  {" "}
                  <FontAwesomeIcon
                    icon="map-marker-alt"
                    style={iconsStyle}
                  />{" "}
                  {this.props.carDetails.location}
                </h6>
              </div>
            </div>

            <div>
              <ImageGallery items={sliderImages} />
            </div>

            <hr />
            <h6 className="blog-post-title font-weight-bold" style={myStyle}>
              Description
            </h6>
            <div className="row mx-auto">
              <p>{this.props.carDetails.description}</p>
            </div>
            <hr />

            <h6 className="blog-post-title font-weight-bold" style={myStyle}>
              Overview
            </h6>

            <div className="row mx-auto">
              <table className="table  table-condensed rounded alert-dark">
                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/gear_box.svg")}
                      />
                      {this.props.carDetails.transmission}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/gauge.svg")}
                      />
                      {numberFormat(this.props.carDetails.mileage)} Km
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/fuel.svg")}
                      />
                      {this.props.carDetails.fuel}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/engine.svg")}
                      />
                      {numberFormat(this.props.carDetails.engineSize)} cc
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/brand.svg")}
                      />
                      {this.props.carDetails.make}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/gear_box.svg")}
                      />
                      {this.props.carDetails.model}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/calendar.svg")}
                      />
                      {this.props.carDetails.year}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/car_type.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.body}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/tax.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.duty}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/color.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.color}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/furnitures.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.interior}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/new-product.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.condition}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />

            <h6 className="blog-post-title font-weight-bold" style={myStyle}>
              Features
            </h6>
            
            <div> 
              {this.props.carFeatures && this.props.carFeatures.length > 0 ?
            <div className="row mx-auto">
              {this.props.carFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="list-group-item flex-fill"
                  style={featureStyle}
                >
                  {" "}
                  <FontAwesomeIcon
                    icon="check-square"
                    style={featureiconsStyle}
                  />
                  {feature}
                </li>
              ))}
            </div> : null}
            </div>

            <div style={socialMediaIconsStyle}>
            { <FacebookShareButton
              url= {shareUrl}
              quote={this.props.carDetails.name  + "   " + this.props.carDetails.description}
              hashtag={this.props.carDetails.model}
            >
              <FacebookIcon size={36} round={true} />
            </FacebookShareButton> }

            { <WhatsappShareButton
              title= {shareUrl}
              url={this.props.carDetails.name  + "   " + this.props.carDetails.description}
            >
              <WhatsappIcon size={36} round={true} />
            </WhatsappShareButton> }

            { <TwitterShareButton
           
               //imageURL={shareUrl}
              title= {this.props.carDetails.name}
              url={"https://www.motikenya.co.ke/vehicle/"+this.props.match.params.vehicleId}
            >
              <TwitterIcon size={36} round={true} />
            </TwitterShareButton> }
            </div>

            <hr />

            <h6 className="blog-post-title font-weight-bold" style={myStyle}>
              Similar Adverts
            </h6>

            <div>
                  {this.state.loading ? <Spinner/> : null}
                  {filteredCars.map((car) => (
                    <div key={car._id}>
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>
          </div>

          <aside className="col-md-3 blog-sidebar">
            {/* <h6 className="blog-post-title font-weight-bold" style={myStyle}>
              Contact Seller
            </h6>
            <hr /> */}


            <div className="card">
            <Link to={`/userList/${this.props.carSeller.sellerID}`} className="text-decoration-none text-dark">
              {this.props.carSeller.sellerPhoto === "" ? 
              (<img src="https://img.icons8.com/bubbles/100/000000/user.png" className="rounded-circle mx-auto d-block" alt="..."
              width="120" height="120" style={{marginTop : "20px"}}/>) : 
              <img src={this.props.carSeller.sellerPhoto} className="rounded-circle mx-auto d-block" alt="..."
            width="120" height="120" style={{marginTop : "20px"}}/>}
            </Link>
            
              <div className="card-body text-dark text-centre">
                <h5 className="card-title text-centre font-weight-bold">{this.props.carSeller.sellerName}</h5>
              </div>
              <ul className="text-dark list-group list-group-flush">
                <li className="list-group-item">Joined : {this.state.sellerJoinedAt}</li>
                <li className="list-group-item"> <FontAwesomeIcon icon="eye" style={iconsStyle} />Views : {this.props.carDetails.views}</li>
              </ul>
              <div className="card-body">
              { <a
              href={`https://wa.me/254${this.props.carSeller.sellerNumber}?text=Hello...%20I'm%20interested%20in%20your%20${this.props.carDetails.name}%20Listed%20for%20sale%20In%20Motii%20Cars%20Kenya`}
              target="_blank"
              rel="noreferrer noopener"
              role="button"
              className="btn btn-whatsApp btn-block text-dark text-centre font-weight-bold"
              type="submit"
            >
              <FontAwesomeIcon icon={["fab", "whatsapp"]} style={iconsStyle} />
              Start Chat{" "}
            </a> }
                

            { <button
              className="btn btn-custom btn-block text-dark text-centre font-weight-bold"
              type="submit"
              onClick={this.showSellerNumber.bind(this, this.props.carSeller.sellerNumber)}
            >
              <FontAwesomeIcon icon="phone" style={iconsStyle} />
              {this.state.sellerNumber}
            </button>}
              </div>
            </div>


            <div className="p-3 mb-3 bg-light text-light rounded">
              <h6 className="font-italic">Ad Section</h6>
              <p className="mb-0">
                Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                mattis consectetur purus sit amet fermentum. Aenean lacinia
                bibendum nulla sed consectetur.
              </p>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carDetails: state.carDetails.carDetails,
    carImages: state.carDetails.carImages,
    carFeatures: state.carDetails.carFeatures,
    carSeller: state.carDetails.carSeller,
    carsList: state.carsList.carsList,
  };
}

export default connect(mapStateToProps, actions)(VehicleDetails);
