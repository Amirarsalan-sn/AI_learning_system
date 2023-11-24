import {lazy} from "react";
import {useRoutes} from "react-router-dom";
import {Typography} from "@mui/material";

const Navbar = lazy(() =>
    import("./Components/Navbar/Navbar")
);
const Landing = lazy(() =>
    import("./Components/Landing/Landing")
);


const Router = () => {
    return useRoutes([
        {path: "/", element: <><Navbar/><Landing/></>},
        {path: "/login", element: <Typography>ورود</Typography>},
        {path: "/signup", element: <Typography>ثبت نام</Typography>},
    ]);
};
export default Router;