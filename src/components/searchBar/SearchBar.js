import React, { useState, useEffect } from "react";
import classes from "../searchBar/SearchBar.module.css";
import { searchByLetter } from "../../services/api";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Search Query:", searchQuery);
        if (searchQuery.trim().length > 0) {
          const searchResponse = await searchByLetter({ letter: searchQuery });

          console.log("Search Results:", searchResponse);

          setSearchResults(searchResponse.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("An error occurred while fetching search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className={classes.SearchBarDiv}>
      <input
        className={classes.SearchBarInput}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ol className={classes.SearchResultsList}>
        
        {loading && <p>Loading...</p>}
        {!loading && searchResults.length === 0 && searchQuery.trim().length > 0 && (
          <div className={classes.noItemsFound}>
            <p>No items found for "{searchQuery}"</p>
          </div>
        )}

        {searchResults.length > 0 &&
          searchResults.map((item) => (
            <li key={item.itemId} className={classes.SearchResultItem}>
              <div className={classes.SearchBarImgDiv}>
                <img
                  className={classes.SearchBarImg}
                  src={item.itemImg}
                  alt={item.itemTitle}
                />
              </div>
              <div className={classes.SearchResultInfo}>
                <h3>{item.itemTitle}</h3>
                <p>Price: ${item.itemPrice}</p>
                <p>Stock: {item.itemStock}</p>
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default SearchBar;