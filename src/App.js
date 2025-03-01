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
import TaskEditForm from "./pages/tasks/TaskEditForm";
import CategoryCreateForm from "./pages/categories/CategoryCreateForm";
import TaskPage from "./pages/tasks/TaskPage";
import CategoryPage from "./pages/categories/CategoryPage";
import TasksPage from "./pages/tasks/TasksPage";

import CompletedTasksPage from "./pages/tasks/CompletedTasksPage";

// Context
import { useCurrentUser } from "./context/CurrentUserContext";
import CategoriesPage from "./pages/categories/CategoriesPage";
import CategoryEditForm from "./pages/categories/CategoryEditForm";
import ProfilePage from "./pages/auth/ProfilePage";
import ChangePassword from "./pages/auth/ChangePassword";
import DeleteAccount from "./pages/auth/DeleteAccount";
import NotFound from "./components/NotFound";

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
                path="/tasks/:id/edit"
                render={() => <TaskEditForm />}
              />

              <Route
                exact
                path="/categories/create"
                render={() => <CategoryCreateForm />}
              />

              <Route
                exact
                path="/categories/:id/edit"
                render={() => <CategoryEditForm />}
              />

              <Route exact path="/tasks/:id" render={() => <TaskPage />} />

              <Route
                exact
                path="/archive"
                render={() => <CompletedTasksPage />}
              />

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
              <Route
                exact
                path="/profiles/:id"
                render={() => <ProfilePage />}
              />

              <Route
                exact
                path="/change-password"
                render={() => <ChangePassword />}
              />
              <Route
                exact
                path="/delete-account"
                render={() => <DeleteAccount />}
              />

              <Route component={NotFound} />
            </Switch>
          </MainLayout>
        )}
      </Switch>
    </div>
  );
}

export default App;
