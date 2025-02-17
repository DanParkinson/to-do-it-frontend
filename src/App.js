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
import CategoryCreateForm from "./pages/categories/CategoryCreateForm";
import TaskPage from "./pages/tasks/TaskPage";
import CategoryPage from "./pages/categories/CategoryPage";

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
          <Route
            exact
            path="/categories/create"
            render={() => <CategoryCreateForm />}
          />
          <Route exact path="/tasks/:id" render={() => <TaskPage />} />
          <Route exact path="/categories/:id" render={() => <CategoryPage />} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </MainLayout>
    </div>
  );
}

export default App;
