import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import Nothing from "./pages/Nothing/Nothing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index:true,
        element: <Home/>
      },
      {
        path: "about",
        element:<About/>
      },
      {
        path:"contacts",
        element: <Contacts/>
      },
      {
        path: "*",
        element: <Nothing/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
