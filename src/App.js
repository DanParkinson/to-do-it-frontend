// Routing
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import "./api/axiosDefaults";
// Layouts and style
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout";
import styles from "./App.module.css";
// Pages
import SignInForm from "./pages/auth/SignInForm";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import CategoryCreateForm from "./pages/categories/CategoryCreateForm";
import TaskPage from "./pages/tasks/TaskPage";
import CategoryPage from "./pages/categories/CategoryPage";
import TasksPage from "./pages/tasks/TasksPage";
// Context
import { useCurrentUser } from "./context/CurrentUserContext";
import CategoriesPage from "./pages/categories/CategoriesPage";

function App() {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const isAuthPage = ["/", "/signin", "/signup"].includes(location.pathname);

  return (
    <div className={styles.App}>
      <Switch>
        {/* Redirect signed-in users to /tasks */}
        {currentUser && isAuthPage && <Redirect to="/tasks" />}

        {/* Landing Page Layout for Authentication Routes */}
        {isAuthPage ? (
          <LandingLayout>
            <Switch>
              <Route exact path="/" render={() => <SignInForm />} />
              <Route render={() => <SignInForm />} /> {/* Default to Sign In */}
            </Switch>
          </LandingLayout>
        ) : (
          // Main Layout for Protected Routes (Authenticated Users Only)
          <MainLayout>
            <Switch>
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
              <Route exact path="/tasks" render={() => <TasksPage />} />
              <Route
                exact
                path="/categories"
                render={() => <CategoriesPage />}
              />
              <Route render={() => <h1>Page Not Found</h1>} />
            </Switch>
          </MainLayout>
        )}
      </Switch>
    </div>
  );
}

export default App;
