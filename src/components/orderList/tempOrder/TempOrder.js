import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck , faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import classes from "../../orderList/tempOrder/TempOrder.module.css";
import { getTempOrders, getClosedOrders, removeItemFromUserOrder, submitOrder } from "../../../services/api";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function TempOrder() {
  const authContext = useContext(AuthContext);
  const [tempOrders, setTempOrders] = useState([]);
  const [orderTotalPrice, setOrderTotalPrice] = useState("");
  const [closedOrders, setClosedOrders] = useState([]);
  const [userId, setUserId] = useState("");
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
            setUserId(userIdFromToken);

            const tempOrdersResponse = await getTempOrders(userIdFromToken);
            setTempOrders(tempOrdersResponse.data);

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

const handlePath = async() => {
  try {
        navigate("/orderList");
      } catch (error) {
      console.error( error);
    }
}


const handleRemoveItemFromOrderList = async (itemId) => {
  try {
      const orderId = tempOrders[0].orderId;
      setTempOrders((prevList) =>
        prevList.map((order) => ({
        ...order,
       itemList: order.itemList.filter((item) => item.itemId !== itemId),
      })).filter(order => order.itemList.length > 0) 
    );
      await removeItemFromUserOrder(orderId, itemId, userId);
  } catch (error) {
    console.error('Error removing item from favorite list:', error);
  }
};

const handleSubmitOrder = async (orderId) => {
  try {
    const closeOrder = await submitOrder(userId, orderId);
    setTempOrders([]);
    
    const closedOrdersResponse = await getClosedOrders(userId);  
    setClosedOrders(closedOrdersResponse.data);
  } catch (error) {
    console.error("Error submitting order: ", error);
  }
};

  useEffect(() => {
    calculateTotalPrice();
  }, [tempOrders]);

  const calculateTotalPrice = () => {
    let total = 0;
    tempOrders.forEach((order) => {
      order.itemList.forEach((item) => {
        total += item.itemPrice;
      });
    });
    setOrderTotalPrice(total);
  };
  
  return (
    <div className={classes.orderMainSection}>
      <div className={classes.orderContainer}>

      <div className={classes.orderBackBtn}>
        <button className={classes.backBtn} onClick={() => handlePath()}>
          <FontAwesomeIcon icon={faArrowLeft}/> Back</button>
     </div>

      <div className={classes.orderHeader}>
        <h1>Temp Order</h1>
     </div>

      {tempOrders.length > 0 ? (
        <div className={classes.tempOrderContainer}>
          {tempOrders.map((order) => (
            <div key={order.orderId} className={classes.tempOrderBox}>
              <div className={classes.tempOrderItemContainer}>
                {order.itemList.map((item) => (
                  <div className={classes.tempOrderItemInfo} key={item.itemId}>
                    <img className={classes.tempOrderItemImg} src={item.itemImg} alt={item.itemImg} />
                    <p className={classes.itemTitle}>{item.itemTitle}</p>
                    
                    <div className={classes.itemInformation}>
                    <p>Price: {item.itemPrice}$</p>
                    <p>Stock: {item.itemStock}</p>
                    </div>

                    <div className={classes.tempOrderItemBtnContainer}>
                      <button
                        onClick={() => handleRemoveItemFromOrderList(item.itemId)}
                        className={classes.tempItemBtns}
                      >
                        <FontAwesomeIcon icon={faTrash} className={classes.faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.tempOrderInfoBox}>
              <div className={classes.tempOrderInfo}>
                <p className={classes.totalPrice}>Total Price:  {orderTotalPrice}$</p>
                <p className={classes.shippingAddress}>Shipping Address: <br/> {order.shippingAddress}</p>
                </div>
                <button onClick={() => handleSubmitOrder(order.orderId)} className={classes.tempOrderBoxBtns}>
                  Pay <FontAwesomeIcon icon={faCheck} className={classes.faCheck} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No temporary orders available</p>
      )}
    </div>
    </div>
  );
}



export default TempOrder;
