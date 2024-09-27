import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import IpoDetails from './pages/IpoDetails';

const Container = styled.div`

`;

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ipoDetails/:ipoId' element={<IpoDetails />} />
      </Routes>
    </Container>
  );
}

export default App;
