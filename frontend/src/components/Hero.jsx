import { Container, Card, Button } from "react-bootstrap";

import React from "react";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-iteams-center hero-card bg-light w-75">
          <h1 className="'text-center mb-4">MERN Autheration</h1>

          <div className="d-flex">
            <Button variant="primary" href="" className="'me-3">
              sign in
            </Button>
            <Button variant="secondary" href="" className="'me-3">
              sign Up
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
