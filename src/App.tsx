import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Aside, Header } from './components';
import AuthRoutes from './routes';
import { Container, Content } from './style';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Aside />
        <Content>
          <AuthRoutes />
        </Content>
      </Container>
    </BrowserRouter>
  );
}

export default App;