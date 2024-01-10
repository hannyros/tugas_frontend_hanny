import CrudPosts from "./crud";
import App from "./App";
import Login from "./Login";

import { createBrowserRouter } from "react-router-dom"
// import MaterialUiPage from "./MaterialUi";
// import CardTest from "./CardTest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/crud",
        element: <CrudPosts/>

    },
    {
        path: "/login",
        element: <Login/>
    },
])

export default router;