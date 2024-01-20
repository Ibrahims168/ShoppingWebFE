import React, { useEffect, useState, useContext } from "react";
import { getAllItems, addItemToFavoriteList, addItemToUserOrder } from "../../services/api";

import classes from "../items/Items.module.css";
import AuthContext from "../context/AuthProvider";
import Item from "./Item"; 

function ItemList() {
  const authContext = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [clickedItemId, setClickedItemId] = useState(null);
  const isAuthenticated = authContext.auth; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allItems = await getAllItems();
        setItems(allItems.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchData();
  }, []);



  const handleAddToFavoriteList = async (itemId) => {
    try {
      const splitToken = authContext.auth.split(".");
      if (splitToken.length === 3) {
        const decodedToken = atob(splitToken[1]);
        const tokenData = JSON.parse(decodedToken);
        const userIdFromToken = tokenData.userId;

        await addItemToFavoriteList(itemId, userIdFromToken);
        console.log("Item added to favorite list successfully.");
      } else {
        console.log("Invalid JWT token format");
      }
    } catch (error) {
      console.error("Error adding item to favorite list:", error);
    }
  };

  const handleAddItemToTempOrder = async (itemId) => {
    try {
      const splitToken = authContext.auth.split(".");
    if (splitToken.length === 3) {

      const decodedToken = atob(splitToken[1]);
      const tokenData = JSON.parse(decodedToken);
      const userIdFromToken = tokenData.userId;
      const item = items.find((item) => item.itemId === itemId);
        
        if (item && item.itemStock === 0) {
          setErrorMessage(' 0 items in stock');
        } else {
          await addItemToUserOrder(itemId, userIdFromToken);
          console.log("Item added to order list successfully.");
          setErrorMessage(null);
        }
      }} catch (error) {
        console.error('Error adding item to order list:', error);
    }
  };


  return (
    <>
      <div className={classes.itemSection}>

        <div className={classes.itemMainBox}>
          {items && items.length > 0 ? (
            items.map((item) => (
              <Item
                key={item.itemId}
                item={item}
                handleAddToFavoriteList={handleAddToFavoriteList}
                handleAddItemToTempOrder={handleAddItemToTempOrder}
                errorMessage={errorMessage}
                isClicked={clickedItemId === item.itemId}
                setClickedItemId={setClickedItemId}
                isAuthenticated={isAuthenticated} 
              />
            ))
            
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>
  
      
    </>
  );
}

export default ItemList;
