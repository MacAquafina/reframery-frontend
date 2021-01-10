import React from "react";
import ListItem from "../components/ListItem";
import homeImage from "../img/home_img.jpg"
import { Link } from "react-router-dom";
import Footer from '../components/Footer'
import { useSelector } from "react-redux";

export default function Homepage() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div>
      <div className="home-container">
        {userInfo ? null :
          (
            <div className="upper" style={{ backgroundImage: `url(${homeImage})` }}>
              <div className="left">
              <Link to="/"><img className="logo" src="/images/logo.png" alt="logo" width="100"></img ></Link>
              </div>
              <div className="right">
                <div className="menu">
                  <div>
                    <span className="link"> About us </span>
                  </div>
                  <div>
                    <Link to="/register">
                      <span className="link">Register</span>
                    </Link>
                  </div>
                  <div>
                    <Link to="/cart">
                      <span className="link"> Cart </span>
                    </Link>
                  </div>
                </div>
                <div className="description">
                  One of the best community marketplaces to support your new business
               </div>
                <div className="signin-button">
                  <Link to="/signin"> <span className="link"> Sign In</span></Link>
                </div>
              </div>
            </div>
          )
        }
        <div className="list-products" >
          <ListItem mainCategory="products" />
          <div className="more"><Link to="/products" className="link">More Products</Link></div>
        </div>
        <div className="list-services" >
          <ListItem mainCategory="services" />
          <div className="more"><Link to="/services" className="link">More Services</Link></div>
        </div>
        <div className="list-expertises">
          <ListItem mainCategory="expertises" />
          <div className="more"><Link to="/expertises" className="link">More Expertises</Link></div>
        </div>
      </div>
      {userInfo ? null : <Footer />}
    </div>
  );
}
