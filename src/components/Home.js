import classes from "../components/Home.module.css";
import { Link,  useMatch, useResolvedPath } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvider";
import {testAuthenticatedApi} from "../services/api";
import ItemSection from "./items/ItemList";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Home() {
  const authContext = useContext(AuthContext);
  const [testResponse, setTestResponse] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(authContext["auth"]).length > 0) {
        testAuthenticatedApi({ "Authorization": "Bearer " + authContext["auth"] })
          .then(res => {
            setTestResponse(res.data.response);
          });
      }
    };

    fetchData();
  }, [authContext]);


  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.mainHeader}>
          <p className={classes.headerParagraph}>FRANCE | PARIS</p>
          <p className={classes.headerTitle}>Louis Vuitton</p>
          <p className={classes.headerSecondParagraph}>Men's Fall-Winter &copy; LV 2024</p>
          {authContext.auth.length > 0 ? (
            <CustomLink to="/profile">
              <button className={classes.profileBtn}>
                <FontAwesomeIcon icon={faUser} className={classes.icon} /> Profile
              </button>
            </CustomLink>
          ) : (
            <CustomLink to="/login">
              <button className={classes.profileBtn}>
                <FontAwesomeIcon icon={faUser} className={classes.icon} /> Profile
              </button>
            </CustomLink>
          )}
        </div>
      </div>
      <ItemSection/>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <div className={isActive ? classes.active : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}

export default Home;
