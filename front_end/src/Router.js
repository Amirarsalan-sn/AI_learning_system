import {lazy} from "react";
import {useRoutes} from "react-router-dom";
import RouteGuard from './Components/RouteGuard/RouteGuard';
import Typography from "@mui/material/Typography";

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

const Dashboard = lazy(() =>
    import("./Components/Dashboard/Dashboard")
);




const Router = () => {
    return useRoutes([
        {path: "/", element: <><Navbar/><Landing/></>},
        {path: "/login", element: <><Navbar/><Login/></>},
        {path: "/signup", element: <><Navbar/><Signup/></>},
        {path: "/dashboard", element: <RouteGuard allowedRoles={['T', 'S']} roleComponents={{
                T: <Dashboard/>,
                S: <Typography> this is S</Typography>,
            }} />},

    ]);
};
export default Router;