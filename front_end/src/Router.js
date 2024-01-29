import {lazy} from "react";
import {useRoutes, useParams} from "react-router-dom";
import RouteGuard from './Components/RouteGuard/RouteGuard';
import Typography from "@mui/material/Typography";
import Discussion from "./Components/Discussion/Discussion";
import NewDiscussion from "./Components/Discussion/NewDiscussion";
import UploadFile from "./Components/File/UploadFile";
import DownloadFile from "./Components/File/DownloadFile";
import AlgoView from "./Components/AlgoView/AlgoView";

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
const Graph = lazy(() =>
    import("./Components/Graph/Graph")
);
const Tree = lazy(() =>
    import("./Components/Graph/Tree")
);
const TreeWrapper = lazy(() =>
    import("./Components/Graph/TreeWrapper")
);

import Quiz from './Components/Quiz/Quiz'

const adjacencyMatrix = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 0],
    [0, 1, 0, 0]
];

const Router = () => {
    return useRoutes([
        {path: "/", element: <><Navbar/><Landing/></>},
        {path: "/treew", element: <TreeWrapper/>},

        {path: "/login", element: <><Navbar/><Login/></>},
        {path: "/signup", element: <><Navbar/><Signup/></>},

        {path: "/dashboard", element: <RouteGuard allowedRoles={['T', 'S']} roleComponents={{
                T: <Dashboard/>,
                S: <Dashboard/>,

            }} />,
            children: [
                { path: "", element: <ClassList/> }, // Default dashboard content
                { path: "classes", element: <ClassList/> }, // Default dashboard content

                { path: "class/:classID", element: <ClassInfo/> }, // Dashboard content with classID
                {path: "class/:classId/discussion/", element:<NewDiscussion/>},
                {path: "class/:classId/discussion/:discussionId", element:<Discussion/>},
                {path: "/dashboard/class/:classId/assignment/:assId", element:<UploadFile/>},
                {path: "/dashboard/algoview/", element:<AlgoView/>},
                {path: "/dashboard/class/:classId/quiz/:qid", element:<Quiz/>},
            ]
        },

    ]);
};
export default Router;