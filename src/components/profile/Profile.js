import { faTrash, faUser , faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { getUserById , deleteUserById } from "../../services/api";
import classes from "../profile/Profile.module.css"
import { useNavigate } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Profile() {
  const authContext = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
      
          if (authContext.auth && typeof authContext.auth === "string") {
            const splitToken = authContext.auth.split(".");
            if (splitToken.length === 3) {
              const decodedToken = atob(splitToken[1]);
              const tokenData = JSON.parse(decodedToken);
              const userIdFromToken = tokenData.userId;

              const userDetailsResponse = await getUserById(userIdFromToken);
              setUserDetails(userDetailsResponse.data);
            }
          }
        
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };

    fetchData();
  }, [authContext.auth]);

  const handleDeleteUser = async() => {
    try {
        const splitToken = authContext.auth.split(".");
        if (splitToken.length === 3) {
          const decodedToken = atob(splitToken[1]);
          const tokenData = JSON.parse(decodedToken);
          const userIdFromToken = tokenData.userId;
  
          await deleteUserById(userIdFromToken);
          authContext.setAuth("");
          navigate("/");
        }} catch (error) {
        console.error('Error deleting user:', error);
      }
  }


  return (
    <div>
    
      {userDetails && (
        <div className={classes.profileSection}>
            <div className={classes.profileContainer}>
              
        <div className={classes.backBtn}>
        <CustomLink to="/">
        <button className={classes.backBtn}>
          <FontAwesomeIcon icon={faArrowLeft}/> Back</button>
        </CustomLink>
     </div>
     <h1 className={classes.titleProfile}>Profile</h1>

            <div className={classes.profieBox}>

            <div className={classes.profileUserIconBox}>
                <FontAwesomeIcon icon={faUser} className={classes.icon} />
            <p className={classes.username}>{userDetails.firstName} {userDetails.lastName}</p> 
              </div>

            <div className={classes.profileUserDetails}> 
            <p className={classes.username}>Username: {userDetails.username}</p> 
            <p className={classes.username}>Email: {userDetails.email}</p> 
            <p className={classes.username}>Address: {userDetails.address}</p> 
            <p className={classes.username}>Phone: {userDetails.phoneNumber}</p> 
            </div>

            <div className={classes.btnContainer}>

    
          <button onClick={() => handleDeleteUser(userDetails.id)}  className={classes.userBoxBtn}>
            <FontAwesomeIcon icon={faTrash} className={classes.faTrash} />
            &nbsp;Delete Account
          </button>

                </div>
            </div>
        </div>
    </div>
      )}
    </div>
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
  
export default Profile;
