// Routing
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
// Components
import NavBar from "./components/NavBar";
// Styling
import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
// Pages
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
