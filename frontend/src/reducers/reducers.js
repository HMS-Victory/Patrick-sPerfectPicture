// import {
//     FETCH_ALL,
//     UPDATE,
//     CREATE,
//     UPDATERULES,
//     DELETESERVER,
//     UPDATESERVER,
//   } from "../constants/actionTypes";
  
  export function home(data = [], action) {
    // switch (action.type) {
    //   case FETCH_ALL:
    //     return action.payload;
    //   case UPDATE:
    //     return data.map((item) =>
    //       item._id === action.payload._id ? action.payload : item
    //     );
    //   default:
    //     return data;
    // }
    return data;
  }
  
  export function servers(data = [], action) {
    // switch (action.type) {
    //   case "FETCH_ALLS":
    //     return action.payload;
    //   case CREATE:
    //     return [...data, action.payload];
    //   case UPDATERULES:
    //     return data.map((item) =>
    //       item._id === action.payload._id ? action.payload : item
    //     );
    //   case UPDATESERVER:
    //     return data.map((item) =>
    //       item._id === action.payload._id ? action.payload : item
    //     );
    //   case DELETESERVER:
    //     return data.filter((item) => item._id !== action.payload);
    //   default:
    //     return data;
    // }
    return data;
  }
  