import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import classes from "../items/Items.module.css";

function Item({ item, handleAddToFavoriteList, handleAddItemToTempOrder, errorMessage, isClicked, setClickedItemId, isAuthenticated }) {
  const handleItemClick = () => {
    setClickedItemId(item.itemId);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setClickedItemId(null); 
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isClicked, setClickedItemId]);

  return (
    <div key={item.itemId} className={classes.itemBox}>
      <div className={classes.itemBoxInfo}>
        <img
          className={classes.itemImg}
          src={item.itemImg}
          alt={item.itemTitle}
        />
        <h4 className={classes.itemTitle}>{item.itemTitle}</h4>

        <div className={classes.itemInformation}>
          <p className={classes.itemPrice}>
            <span className={classes.itemPriceSpan}>Price: </span>
            {item.itemPrice}$
          </p>

          {(isClicked && item.itemStock === 0 && isAuthenticated.length > 0) ? (
            <p className={classes.itemStock}>
              <span className={classes.itemStockSpan}>Stock: 0</span>
              <br/>
              <span className={classes.itemStockCount}>
                <FontAwesomeIcon icon={faExclamationTriangle} className={classes.faExclamationTriangle} />
                {errorMessage}
              </span>
            </p>
          ) : (
            <p className={classes.itemStock}>
              <span className={classes.itemStockSpan}>Stock:</span>{" "}
              {item.itemStock}
            </p>
          )}
        </div>

        <div className={classes.btnContainer}>
          <button onClick={() => { handleAddToFavoriteList(item.itemId); }} className={classes.itemBoxBtn}>
            <FontAwesomeIcon icon={faHeart} className={classes.faHeart} />
          </button>

          <button onClick={() => { handleAddItemToTempOrder(item.itemId); handleItemClick(); }} className={classes.itemBoxBtn}>
            <FontAwesomeIcon icon={faShoppingCart} className={classes.faShoppingCart} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
