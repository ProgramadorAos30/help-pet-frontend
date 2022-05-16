import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Aside, Header } from './components';
import AuthRoutes from './routes';
import { Container, Content } from './style';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/index';
import { Login } from './screens';

const App: React.FC = () => {

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <Login /> */}
          <Container>
            <Header />
            <Aside />
            <Content>
              <AuthRoutes />
            </Content>
          </Container>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;