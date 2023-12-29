import React from "react";
import noni from "./img/noni.jpg";
import Usman from "./img/Usman.jpg";
import Umer from "./img/Umer.jpg";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./img/style.css";
import Footer from "./footer";
import banner1 from "./img/banner1.png";
import { Col, Container, Row, Image, Button } from 'react-bootstrap';

const Aboutus = () => {
  return (
    <>
      <div class="wrapper">
        <div class="banner flex inner">
          <div class="right">
            <h1>Discover</h1>
            <h2>The New</h2>
            <h3>Recpies Here!</h3>
            <h4>
              Aloso Providing Ingredients <br /> Grab Your Discount &nbsp;
              <span class="code">NewUser@</span>
            </h4>
            <p>
              At Zaika Recipes, we understand the joy of sharing your culinary
              creations with others. Our platform fosters a vibrant community of
              food enthusiasts who can not only access recipes but also share
              their own. Join the community, share your unique recipes, and
              connect with fellow food lovers.
            </p>
            <button class="btn1 btn">
              {" "}
              <a class="txtd" href="/login">
                Become User
              </a>{" "}
            </button>
            <button class="btn1 btn">
              <a class="txta" href="/aboutUS">
                Read More
              </a>
            </button>
          </div>
          <div class="left">
            <img src={banner1} alt="" srcset="" />
          </div>
        </div>
        <hr />
      </div>
      <br />
      <br />
      <div class="alert alert-success" role="success" style={{width:"70%",marginLeft:"15%"}}>
        <h4 class="alert-success">Welcome to About Us of Zaika</h4>
        <p>
          Zaika is more than just a food platform. We are passionate about
          bringing people together through the love of food. Our journey began
          with a simple idea: to create a space where food enthusiasts from
          around the world can share their culinary creations, connect with one
          another, and embark on a gastronomic adventure.
        </p>
        <hr></hr>
        <p class="mb-0">
          At Zaika, we believe that food is a universal language that transcends
          borders and cultures. Whether you're a seasoned chef or an amateur
          cook, Zaika welcomes you to explore, experiment, and share your unique
          flavors with the world. Join us in celebrating the diversity of
          cuisines, the joy of cooking, and the delight of savoring every bite.
          Bon appétit!
        </p>
      </div>
      <Container>
      <h2 className="text-center">Our Team</h2>
      <Row>
        <Col md={4}>
          <div className="d-flex flex-column align-items-center team-member">
            <Image src={Umer} alt="Jane" fluid />
            <div className="text-center">
              <h2>Muhammad Umer Mukhtiar</h2>
              <p className="title">CEO & Founder</p>
              <p>SP20-BSE-055</p>
              <p>omerjh5004@gmail.com</p>
              <Button variant="primary">Contact</Button>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-column align-items-center team-member">
            <Image src={Usman} alt="Mike" fluid />
            <div className="text-center">
              <h2>Usman Toufique</h2>
              <p className="title">Art Director</p>
              <p>SP20-BSE-046</p>
              <p>linuxkal3434@gmail.com</p>
              <Button variant="primary">Contact</Button>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-column align-items-center team-member">
            <Image src={noni} alt="John" fluid />
            <div className="text-center">
              <h2>Adnan Noni</h2>
              <p className="title">Designer</p>
              <p>SP20-BSE-037</p>
              <p>noni@gmail.com</p>
              <Button variant="primary">Contact</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

      <Footer />
    </>
  );
};

export default Aboutus;
