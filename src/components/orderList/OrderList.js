import React from "react";
import classes from "./OrderList.module.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useResolvedPath, Link, useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function OrdersList() {
const navigate = useNavigate();

  
const handlePath = async() => {
    try {
          navigate("/");
        } catch (error) {
        console.error( error);
      }
  }

  return (
    <div className={classes.orderMainContainer}>
    <div className={classes.orderList}>
    <div className={classes.orderHeader}>
      <div className={classes.orderBackBtn}>
        <button className={classes.backBtn} onClick={() => handlePath()}>
          <FontAwesomeIcon icon={faArrowLeft} className={classes.faArrowLeft} /> Back</button>
     </div>
      <h2 className={classes.title}>Order List</h2>
     </div>

      <div className={classes.orders}>
        <div className={classes.tempOrder}>
            <div className={classes.tempOrderBox}>
            <CustomLink to="/tempOrder">
              <button className={classes.headerBtnTemp}>
                Temp Order
              </button>
            </CustomLink>
          </div>
        </div>

        <div className={classes.closedOrder}>
            <div className={classes.closedOrderBox}>
            <CustomLink to="/closedOrder">
              <button className={classes.headerBtnClosed}>
                Closed Orders
              </button>
            </CustomLink>
            </div>
        </div>
      </div>




      </div>
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



export default OrdersList;
