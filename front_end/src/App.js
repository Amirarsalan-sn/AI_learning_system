import './App.css';
import { createContext, useState, Suspense } from "react";
import Router from "./Router";
import {Typography} from "@mui/material";
export const authContext = createContext(false);

function App() {
  const [auth, setAuth] = useState(sessionStorage.getItem("token"));

  return (

      <>
        <Suspense fallback={<Typography>Loading</Typography>}>
          <authContext.Provider value={{auth, setAuth}}>
            <Router />
          </authContext.Provider>
        </Suspense>
      </>
  );
}

export default App;
