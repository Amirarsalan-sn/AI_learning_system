import {lazy} from "react";
import {useRoutes} from "react-router-dom";
import {Typography} from "@mui/material";

// const AdminReports = lazy(() =>
//     import("./Components/AdminReports/AdminReports")
// );
//

const Router = () => {
    return useRoutes([
        {path: "/", element: <Typography>خانه</Typography>},
        {path: "/login", element: <Typography>ورود</Typography>},
        {path: "/signup", element: <Typography>ثبت نام</Typography>},
    ]);
};
export default Router;