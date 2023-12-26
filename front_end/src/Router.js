import {lazy} from "react";
import {useRoutes} from "react-router-dom";
import {Typography} from "@mui/material";
import Discussion from "./Components/Discussion/Discussion";

const Navbar = lazy(() =>
    import("./Components/Navbar/Navbar")
);
const Landing = lazy(() =>
    import("./Components/Landing/Landing")
);
const Login = lazy(() =>
    import("./Components/Login/Login")
);
const Signup = lazy(() =>
    import("./Components/Signup/Signup")
);






const Router = () => {
    return useRoutes([
        {path: "/", element: <><Navbar/><Landing/></>},
        {path: "/login", element: <><Navbar/><Login/></>},
        {path: "/signup", element: <><Navbar/><Signup/></>},
        {path: "/dashboard/class/:classId/discussion/:discussionId", element:<Discussion/>}
    ]);
};
export default Router;