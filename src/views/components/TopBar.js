import React from "react";
import Navbar from "react-bootstrap/Navbar";

export default function TopBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">SocialList</Navbar.Brand>
    </Navbar>
  );
}
