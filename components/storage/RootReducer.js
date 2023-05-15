const initialState = {
    Booking: {},
    userDetails: {},
    vehicle: {},
  };
  
  export default function RootReducer(state = initialState, actions) {
    switch (actions.type) {
      case "ADD_BOOKING":
        state.Booking = actions.payload;
  
        return {
          Booking: state.Booking,
          userDetails: state.userDetails,
          vehicle: state.vehicle,
        };
      case "ADD_USER":
        state.userDetails[actions.payload[0]] = actions.payload[1];
  
        return {
          Booking: state.Booking,
          userDetails: state.userDetails,
          vehicle: state.vehicle,
        };
      case "ADD_VEHICLE":
        console.log("ADD_VEHICLE", actions);
        state.vehicle[actions.payload[0]] = actions.payload[1];
  
        return( {
          Booking: state.Booking,
          userDetails: state.userDetails,
          vehicle: state.vehicle,
        });
  
      default:
        return state;
    }
  }
  