import React, {useContext, useState, useEffect } from "react";
import classes from "../../orderList/closedOrder/ClosedOrder.module.css";
import { getClosedOrders} from "../../../services/api";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ClosedOrder() {
const authContext = useContext(AuthContext);
const [closedOrders, setClosedOrders] = useState([]);
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
            const closedOrdersResponse = await getClosedOrders(userIdFromToken);
            setClosedOrders(closedOrdersResponse.data);
          }
      } else {
        console.error("Authentication information not available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [authContext.auth]);

const calculateTotalPrice = (order) => {
  let total = 0;
  order.itemList.forEach((item) => {
    total += item.itemPrice;
  });
  return total;
};

const handlePath = async() => {
  try {
        navigate("/orderList");
      } catch (error) {
      console.error( error);
    }
}


  return (
    <div className={classes.orderMainSection}>
      <div className={classes.orderContainer}>

      <div className={classes.orderBackBtn}>
        <button className={classes.backBtn} onClick={() => handlePath()}>
          <FontAwesomeIcon icon={faArrowLeft}/> Back</button>
     </div>

    <div className={classes.orderHeader}>
        <h1 className={classes.closedOrderTitle}>Closed Order</h1>
     </div>

    <div className={classes.ClosedOrderListSection}>
      {closedOrders.length > 0 ? (
  
        <div className={classes.closedOrderCard}>
          {closedOrders.map((order) => (
            <div key={order.orderId} className={classes.closedOrderBox}>

              <div className={classes.orderInformation}>
              <p className={classes}>ORDER ID: {order.orderId}</p>
              <p className={classes}>Shipping Address: {order.shippingAddress}</p>
              <p className={classes}>Total Price: ${calculateTotalPrice(order)}</p>
              </div>

              <div className={classes.closedOrderItemContainer}>
                {order.itemList.map((item) => (
                  <div className={classes.closedOrderItemBox} key={item.itemId}>
                    <img className={classes.itemImg} src={item.itemImg} alt={item.itemImg} />
                  <div className={classes.closedOrderItemInfo}>
                    <p>{item.itemTitle}</p>
                    <p>{item.itemPrice}$</p>
                    </div>      
                  </div>
                ))}
              </div>

            
        </div>
          ))}
        </div>
      ) : (
        <p>No closed orders available</p>
        )}
    </div>
    </div>
    </div>
  );
}

export default ClosedOrder;
