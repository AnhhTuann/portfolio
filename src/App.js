// material-ui
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

//components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

//pages
import Portfolio from "./pages/Portfolio/Portfolio";
import Resume from "./pages/Resume/Resume";
import Profile from "./components/Profile/Profile";

//library
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          md={4}
          style={{ backgroundColor: "yellow" }}
        >
          <Profile />
        </Grid>
        <Grid item xs style={{ backgroundColor: "green" }}>
          <Header />
          <Router>
            <Switch>
              <Route path="/portfolio">
                <Portfolio />
              </Route>
              <Route path="/resume">
                <Resume />
              </Route>
            </Switch>
          </Router>

          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
