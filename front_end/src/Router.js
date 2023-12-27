import {lazy} from "react";
import {useRoutes, useParams} from "react-router-dom";
import RouteGuard from './Components/RouteGuard/RouteGuard';
import Typography from "@mui/material/Typography";
import Discussion from "./Components/Discussion/Discussion";
import NewDiscussion from "./Components/Discussion/NewDiscussion";
import UploadFile from "./Components/File/UploadFile";
import DownloadFile from "./Components/File/DownloadFile";

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
                S: <Dashboard/>,

            }} />,
            children: [
                { path: "", element: <ClassList/> }, // Default dashboard content
                { path: "class/:classID", element: <ClassInfo/> }, // Dashboard content with classID
                {path: "class/:classId/discussion/", element:<NewDiscussion/>},
                {path: "class/:classId/discussion/:discussionId", element:<Discussion/>},
                {path: "/dashboard/class/:classId/assignment/", element:<UploadFile/>},
            ]
        },

    ]);
};
export default Router;