import {lazy} from "react";
import {useRoutes, useParams} from "react-router-dom";
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

const ClassList = lazy(() =>
    import("./Components/ClassList/ClassList")
);

const ClassInfo = lazy(() =>
    import("./Components/ClassInfo/ClassInfo")
);


const Router = () => {
    return useRoutes([
        {path: "/", element: <><Navbar/><Landing/></>},
        {path: "/login", element: <><Navbar/><Login/></>},
        {path: "/signup", element: <><Navbar/><Signup/></>},
        {path: "/dashboard", element: <RouteGuard allowedRoles={['T', 'S']} roleComponents={{
                T: <Dashboard/>,
                S: <Typography> this is S</Typography>,
            }} />,
            children: [
                { path: "", element: <ClassList/> }, // Default dashboard content
                { path: "class/:classID", element: <ClassInfo/> }, // Dashboard content with classID
            ]
        },

    ]);
};
export default Router;