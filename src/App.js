import './styles/generic/reset.css';
import './styles/settings/colors.css';
import './styles/elements/base.css';
import './styles/elements/button.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import ScreenWelcome1 from "./pages/ScreenWelcome1/index";
// import ScreenWelcome2 from "./pages/ScreenWelcome2/index";
// import ScreenWelcome3 from "./pages/ScreenWelcome3/index";
import HomePage from "./components/pages/HomePage/index";
import ButtonTabNavigator from './components/ButtonTabNavigator'
import Container from "./components/layout/Container"


function App() {
  return (
    <Router>
      <div className="App">

        <Container customClass="min-height">
          <Routes>
            {/* <Route exact path="/" element={<ScreenWelcome1 />} />
            <Route path="/ScreenWelcome2" element={<ScreenWelcome2 />} />
            <Route path="/ScreenWelcome3" element={<ScreenWelcome3 />} /> */}

            <Route exact path="/" element={<HomePage />} />
          </Routes>
        </Container>

        <ButtonTabNavigator />
      </div >
    </Router>
  );
}

export default App;