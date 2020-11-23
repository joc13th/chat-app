import * as AuthActions from "./authActions";

export const setupSocket = (token, userId) => {
  return (dispatch) => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      if (token) {
        //Add already logged in user
        socket.send(
          JSON.stringify({
            type: "CONNECT_WITH_TOKEN",
            data: { token: token, userId: userId },
          })
        );
        dispatch({
          type: "SETUP_SOCKET",
          payload: socket,
        });
      } else {
        dispatch({
          type: "SETUP_SOCKET",
          payload: socket,
        });
      }
    };
    socket.onmessage = (message) => {
      let data = JSON.parse(message);
      switch (data.type) {
        case "LOGGEDIN":
          dispatch(AuthActions.loggedIn(data));
          break;
        case "GOT_USERS":
          dispatch({
            type: "GOT_USERS",
            payload: data.users,
          });
          break;
        case "ADD_THREAD":
          dispatch({
            type: "ADD_THREAD",
            payload: data.data,
          });
        default:
      }
    };
  };
};
