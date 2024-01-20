import React, { useContext, useState, useEffect } from "react";
import { getUserFavoriteList, removeItemFromFavoriteList, addItemToUserOrder } from "../../services/api";
import AuthContext from "../context/AuthProvider";
import classes from "./FavoriteList.module.css";
import { faShoppingCart, faTrash, faExclamationTriangle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function FavoriteList() {
  const authContext = useContext(AuthContext);
  const [userFavoriteList, setUserFavoriteList] = useState([]);
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState({ itemId: null, errorMessage: null });
  const [userId, setUserId] = useState("");

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
            const favoriteListResponse = await getUserFavoriteList(userIdFromToken);
            setUserFavoriteList(favoriteListResponse.data);
          }
        }
      } catch (error) {
        console.log("Your favorite list is empty:");
      }
    };

    fetchData();
  }, [authContext.auth]);

  const handleRemoveFromFavoriteList = async (itemId) => {
    try {
      await removeItemFromFavoriteList(itemId, userId);
      setUserFavoriteList((prevList) => prevList.filter((item) => item.itemId !== itemId));
    } catch (error) {
      console.error('Error removing item from favorite list:', error);
    }
  };

  const handleAddItemToTempOrder = async (itemId) => {
    try {
      await addItemToUserOrder(itemId, userId);
      console.log("Item added to user order");
    } catch (error) {
      console.error('Error adding item to order list:', error);
      const item = userFavoriteList.find((item) => item.itemId === itemId);

      if (item && item.itemStock === 0) {
        setErrorState({ itemId, errorMessage: '0 items in stock' });
        setTimeout(() => {
          setErrorState({ itemId: null, errorMessage: null });
        }, 3000);
      }
    }
  };

  const handlePath = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.favoriteSection}>
      <div className={classes.favoriteListHeader}>
        <div className={classes.orderBackBtn}>
          <button className={classes.backBtn} onClick={() => handlePath()}>
            <FontAwesomeIcon icon={faArrowLeft} className={classes.faCheck} /> Back
          </button>
        </div>
        <h1 className={classes.titleFavorite}>Favorite Items</h1>
      </div>

      <div className={classes.favoriteItemMainBox}>
        {userFavoriteList.length > 0 ? (
          userFavoriteList.map((item) => (
            <div key={item.itemId} className={classes.favoriteItemBox}>
              <div className={classes.favoriteItemInfo}>
                <img
                  className={classes.favoriteItemImg}
                  src={item.itemImg}
                  alt={item.itemTitle}
                />

                <h4 className={classes.favoriteItemTitle}>{item.itemTitle}</h4>
                <div className={classes.itemInformation}>
                  <p className={classes.itemPrice}>
                    <span className={classes.itemPriceSpan}>Price: </span>
                    {item.itemPrice}$
                  </p>

                  {errorState.itemId === item.itemId && item.itemStock === 0 ? (
                    <p className={classes.itemStock}>
                      <span className={classes.itemStockSpan}>Stock:0</span>
                      <span className={classes.itemStockCount}>
                        <FontAwesomeIcon icon={faExclamationTriangle} className={classes.faExclamationTriangle} />
                        {errorState.errorMessage}
                      </span>
                    </p>
                  ) : (
                    <p className={classes.itemStock}>
                      <span className={classes.itemStockSpan}>Stock:</span>{" "}
                      {item.itemStock}
                    </p>
                  )}
                </div>

                <div className={classes.favoriteListBtnContainer}>
                  <button onClick={() => handleRemoveFromFavoriteList(item.itemId)} className={classes.itemBoxBtn}>
                    <FontAwesomeIcon icon={faTrash} className={classes.faTrash} />
                  </button>

                  <button onClick={() => handleAddItemToTempOrder(item.itemId)} className={classes.itemBoxBtn}>
                    <FontAwesomeIcon icon={faShoppingCart} className={classes.faShoppingCart} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.noItemsInFavoriteList}>
            <p className={classes.emptyList}>Your favorite list is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteList;
