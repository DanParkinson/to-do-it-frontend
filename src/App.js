// Routing
import { Route, Switch, useLocation } from "react-router-dom";
import "./api/axiosDefaults";
// Components
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout";
// Styling
import styles from "./App.module.css";
// Pages
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import CategoryCreateForm from "./pages/categories/CategoryCreateForm";
import TaskPage from "./pages/tasks/TaskPage";
import CategoryPage from "./pages/categories/CategoryPage";
import NavBar from "./components/NavBar";

import { useCurrentUser } from "./context/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const isAuthPage = ["/signin", "/signup"].includes(location.pathname);

  return (
    <div className={styles.App}>
      {isAuthPage || !currentUser ? (
        <LandingLayout>
          <Switch>
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route render={() => <SignInForm />} /> {/* Default to sign in */}
          </Switch>
        </LandingLayout>
      ) : (
        <MainLayout>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <h1>Home Page</h1>} />
            <Route
              exact
              path="/tasks/create"
              render={() => <TaskCreateForm />}
            />
            <Route
              exact
              path="/categories/create"
              render={() => <CategoryCreateForm />}
            />
            <Route exact path="/tasks/:id" render={() => <TaskPage />} />
            <Route
              exact
              path="/categories/:id"
              render={() => <CategoryPage />}
            />
            <Route render={() => <h1>Page Not Found</h1>} />
          </Switch>
        </MainLayout>
      )}
    </div>
  );
}

export default App;
