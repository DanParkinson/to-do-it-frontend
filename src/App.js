// Routing
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
// Components
import NavBar from "./components/NavBar";
import MainLayout from "./layouts/MainLayout";
// Styling
import styles from "./App.module.css";
// Pages
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <MainLayout>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </MainLayout>
    </div>
  );
}

export default App;
