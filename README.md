
# Project Overview:
This React-based frontend application for our E-commerce system not only boasts a user-friendly interface but also incorporates dynamic functionalities.
Utilizing React hooks (useState, useEffect, useContext), along with the Axios library for API endpoints, the application seamlessly handles essential features.

## Project Structure:
### Pages:
- Login: Facilitates secure user authentication.
- Sign Up: Allows users to create new accounts securely.
- Home: Serves as the central hub for product browsing and navigation.
- Favorite List: Displays a personalized list of favorite items for users.
- Order List: Provides an overview of all user orders.
- Temp Orders: Displays temporary orders yet to be submitted.
- Closed Orders: Lists completed and closed orders.
- Profile: Offers users a personalized profile view.

## Functionalities:
- useState: Manages dynamic state for components, facilitating features like order and favorite list handling.
- useEffect: Ensures efficient handling of side effects, such as updating the UI after state changes.
- useContext: Enables centralized authentication state, streamlining user-specific operations.
### User Actions:
- Add to Order/Favorite List: Functions to add items to the user's order or favorite list with dynamic handling of price and stock.
- Error Handling: Robust error handling mechanisms for smooth user experience and fault tolerance.
### User Deletion:
- User Deletion: Complete user deletion ensures the removal of associated data, maintaining data integrity.
### Search Functionality:
- Search Bar: Implements a search bar for users to easily find products, enhancing the overall shopping experience.

## Framework and Technology:
### Frontend Framework:
- React: Utilizes React for a responsive and interactive user interface.
### State Management:
- React Context API: Manages global state for user authentication and application-wide data.
###HTTP Requests:
- Axios: Handles API requests efficiently, ensuring seamless communication with the backend.
  
## Styling:
- CSS Modules: Locally scoped styling for better component encapsulation.
## Navigation:
- React Router: Enables seamless navigation between different pages.

## Database Integration:
- Seamless integration with the backend database (H2 in development), utilizing Spring Data JPA for data access.
- Ensures efficient data persistence and retrieval through well-defined repository interfaces.

This project amalgamates modern frontend technologies, ensuring a responsive and engaging user experience while maintaining strong connections with the secure Java Spring Boot backend.
