import {lazy} from "react";
import {useRoutes} from "react-router-dom";
import {Typography} from "@mui/material";
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






const Router = () => {
    return useRoutes([
        {path: "/", element: <><Navbar/><Landing/></>},
        {path: "/login", element: <><Navbar/><Login/></>},
        {path: "/signup", element: <><Navbar/><Signup/></>},
        {path: "/dashboard/class/:classId/discussion/:discussionId", element:<Discussion/>},
        {path: "/dashboard/class/:classId/discussion/", element:<NewDiscussion/>},
        {path: "/dashboard/class/:classId/assignment/", element:<UploadFile/>},
    ]);
};
export default Router;