import React from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {userInfo ? (
            <h1 className="text-center mb-4">Welcome {userInfo.name}</h1>
          ) : (
            <h1 className="text-center mb-4">MERN Authentication</h1>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
