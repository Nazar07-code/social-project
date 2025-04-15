import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import User from "./components/User/User";
import Posts from "./components/Posts/Posts";
import Favorites from "./components/Favorites/Favorites";
import Saved from "./components/Saved/Saved";
import CreatePost from "./components/Create Post/CreatePost";

const userId = localStorage.getItem("token");

const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/:id/posts"
          element={
            <MainLayout>
              <User />
              <Posts />
            </MainLayout>
          }
        />
        <Route
          path="/:id/favorites"
          element={
            <MainLayout>
              <User />
              <Favorites />
            </MainLayout>
          }
        />
        <Route
          path="/:id/saved"
          element={
            <MainLayout>
              <User />
              <Saved />
            </MainLayout>
          }
        />
        <Route
          path="/:id/CreatePost"
          element={
            <MainLayout>
              <CreatePost />
            </MainLayout>
          }
        />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/:id/editMe" element />
      </Routes>
    </>
  );
}
export default App;
