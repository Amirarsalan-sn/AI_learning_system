import React, {useState, useEffect, useContext} from 'react'
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    HamburgerIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavItemBtn,
    NavBtnLink
} from './Navbar.styles'
import {FaTimes, FaBars} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib'
import {Button} from '../../globalStyles';
import { authContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(authContext);


    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const [homeClick, setHomeClick] = useState(false);
    const [servicesClick, setServicesClick] = useState(false);
    const [dashboardClick, setDashboardClick] = useState(false);

    const handleHomeClick = () => {
        setHomeClick(true);
        setDashboardClick(false);
        setServicesClick(false);
    }
    const handleDashboardClick = () => {
        setHomeClick(false);
        setDashboardClick(true);
        setServicesClick(false);
    }
    const handleLogout = () => {
        const URL = "http://localhost:8000/auth/logout/";
        const TOKEN = sessionStorage.getItem("token");
        axios
            .post(
                URL,
                {},
                {
                    headers: { Authorization: `Token ${TOKEN}` },
                }
            )
            .catch((e) => console.log(e.response));
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setAuth(false);
        navigate('/')

    };


    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        // so if the screensize is <= 960px then set button state to false
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton();
    }, [])

    window.addEventListener('resize', showButton);

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to='/'>
                            <NavIcon/>
                            {" سامانه آموزشی هوشیار"}
                        </NavLogo>

                        <NavMenu onClick={handleClick} click={click}>
                            {auth ? (

                                <NavItem onClick={handleDashboardClick} dashboardClick={dashboardClick}>
                                    <NavLinks to='/dashboard' onClick={closeMobileMenu}>
                                        داشبورد
                                    </NavLinks>
                                </NavItem>
                            ) : (
                                <></>
                            )}

                            {auth ? (
                                <NavItemBtn>
                                    {button ? (
                                        <NavBtnLink to='/'>
                                            <Button onClick={handleLogout} primary>خروج</Button>
                                        </NavBtnLink>
                                    ) : (
                                        <NavBtnLink to='/'>
                                            <Button onClick={handleLogout} primary>خروج</Button>
                                        </NavBtnLink>
                                    )}

                                </NavItemBtn>
                            ): (
                                <>
                                <NavItemBtn>
                                    {button ? (
                                        <NavBtnLink to='/login'>
                                            <Button primary>ورود</Button>
                                        </NavBtnLink>
                                    ) : (

                                        <NavBtnLink to='/login'>
                                            <Button onClick={closeMobileMenu} primary>ورود</Button>
                                        </NavBtnLink>
                                    )}

                                </NavItemBtn>
                                    <NavItemBtn>
                                        {button ? (
                                            <NavBtnLink to='/signup'>
                                                <Button primary>ثبت نام</Button>
                                            </NavBtnLink>
                                        ) : (

                                            <NavBtnLink to='/signup'>
                                                <Button onClick={closeMobileMenu} primary>ثبت نام</Button>
                                            </NavBtnLink>
                                        )}

                                    </NavItemBtn>
                                </>
                            )}
                            <NavItemBtn>
                                {button ? (
                                    <NavBtnLink to='/about'>
                                        <Button primary>درباره ما</Button>
                                    </NavBtnLink>
                                ) : (

                                    <NavBtnLink to='/about'>
                                        <Button onClick={closeMobileMenu} primary>درباره ما</Button>
                                    </NavBtnLink>
                                )}

                            </NavItemBtn>

                        </NavMenu>
                        <HamburgerIcon onClick={handleClick}>
                            {click ? <FaTimes/> : <FaBars/>}
                        </HamburgerIcon>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
