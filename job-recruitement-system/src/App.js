import { createBrowserRouter } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Profile from "./components/Profile";
import Requirements from "./components/Document";
import Admin from "./components/Admin";
import AddCompany from "./components/AddCompany";
import SeeCompany from "./components/SeeCompany";
import NewCompExam from "./components/NewCompExam";
import OrgsLogin from "./components/OrgsLogin";
import OrgsProfile from "./components/OrgsProfile";
import Post_job from "./components/Post_job";
import View_job from "./components/View_job";
import News_job from "./components/News_job";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/News",
    element: <News />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/profile/doc",
    element: <Requirements />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/companies/add",
    element: <AddCompany />,
  },
  {
    path: "/admin/companies/see",
    element: <SeeCompany />,
  },
  {
    path: "/admin/companies/exam",
    element: <NewCompExam />,
  },
  {
    path: "/orgs/login",
    element: <OrgsLogin />,
  },
  {
    path: "/orgs/:name",
    element: <OrgsProfile />,
  },
  {
    path: "/orgs/post",
    element: <Post_job />,
  },
  {
    path: "/orgs/view",
    element: <View_job />,
  },
  {
    path: "/orgs/news",
    element: <News_job />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default App;
