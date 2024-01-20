import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Navbar.module.css";
import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import SearchBar from "../searchBar/SearchBar";

function Navbar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    authContext.setAuth(""); 

    navigate("/");
  };

  const isUserAuthenticated = authContext.auth.length > 0;

  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.siteTitle}> 
        <img className={classes.logo} src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Louis_Vuitton_LV_logo.png?20220815162405"/>
        {/* <p className={classes.logoTitle}>Louis Vuitton</p> */}
      </Link>
      <SearchBar />

      <ul>
        {isUserAuthenticated ? (
          <>
            <CustomLink to="/favoriteList">
              <button className={classes.headerBtn}>
                <FontAwesomeIcon icon={faHeart} className={classes.iconHeart} />
              </button>
            </CustomLink>

            <CustomLink to="/orderList">
       

              <button className={classes.headerBtn}>
                <FontAwesomeIcon icon={faShoppingCart} className={classes.iconCart} />
              </button>
          
            </CustomLink>

            <CustomLink to="/" className={classes.headerBtn} onClick={handleSignOut}>
              Log-Out
            </CustomLink>
          </>
        ) : (
          <>

            <CustomLink to="/favoriteList">
              <button className={classes.headerBtn} disabled>
                <FontAwesomeIcon icon={faHeart} className={classes.icon} />
              </button>
            </CustomLink>

            <CustomLink to="/orderList">
              <button className={classes.headerBtn} disabled>
                <FontAwesomeIcon icon={faShoppingCart} className={classes.icon} />
              </button>
            </CustomLink>

            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/signUp">Sign-Up</CustomLink>
          </>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? classes.active : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
