import React from "react";
import "./App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IpoDetails from "./pages/IpoDetails";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const Wrrapper = styled.div`
  padding: 20px 0;
  width: 100%;
  @media only screen and (min-width: 1366px){
    width: 1366px;
  }
`;

function App() {
  return (
    <Container>
      <Wrrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ipoDetails/:ipoId" element={<IpoDetails />} />
        </Routes>
      </Wrrapper>
    </Container>
  );
}

export default App;
