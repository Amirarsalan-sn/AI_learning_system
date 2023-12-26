// RouteGuard.js
import React, { useCallback, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useGet from "../../Hooks/useGet";
import { authContext } from "../../App"; // Import your auth context

const RouteGuard = ({ allowedRoles, children ,roleComponents}) => {
    const navigator = useNavigate();
    const nav = useCallback((url) => navigator(url), [navigator]);
    const { auth } = useContext(authContext);
    const { data } = useGet(
        "http://localhost:8000/auth/profile/",
        sessionStorage.getItem("token")
    );

    useEffect(() => {
        const checkAccess = async () => {
            if (!auth) {
                nav("/");
            } else {
                await data;
                // Check if data and data.role are defined
                if (data && data.role && !allowedRoles.includes(data.role)) {
                    nav("/");
                }
            }
        };

        checkAccess();
    }, [auth, data, nav, allowedRoles]);
    // Render children only if data and data.role are defined
    if (data && data.role && allowedRoles.includes(data.role)) {
        const retComponent = roleComponents[data.role];
        if (retComponent) {
            console.log(data.role)
            return retComponent;
        }
        nav("/");
    } else {
        nav("/");
    }
    return <p>access denied</p>
};
export default RouteGuard;
