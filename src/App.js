import './styles/generic/reset.css';
//import './App.css';
import './styles/settings/colors.css';
import './styles/elements/base.css';
import './styles/elements/button.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScreenWelcome1 from "./pages/ScreenWelcome1/index";
import ScreenWelcome2 from "./pages/ScreenWelcome2/index";
import ScreenWelcome3 from "./pages/ScreenWelcome3/index";



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <ScreenWelcome1 />
          </Route>
          <Route path="/ScreenWelcome2">
            <ScreenWelcome2 />
          </Route>
          <Route path="/ScreenWelcome3">
            <ScreenWelcome3 />
          </Route>
        </Switch>
      </div >
    </Router>



    // <div className="App">
    //   <ScreenWelcome />
    // </div>
  );
}

export default App;