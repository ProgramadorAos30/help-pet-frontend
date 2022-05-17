import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Aside, Header } from './components';
import AuthRoutes from './routes';
import { Container, Content } from './style';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/index';
import { Login } from './screens';
import { useSelector } from 'react-redux';
import { RootState } from './stores';

const App: React.FC = () => {
  const { token } = useSelector((state : RootState) => state.clickState)

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        {token == '' ?
          <Login />
          :
          <Container>
            <Header />
            <Aside />
            <Content>
              <AuthRoutes />
            </Content>
          </Container>
        }
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;