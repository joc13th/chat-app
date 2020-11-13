import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import auth from "./store/reducers/authReducer";
import * as ChatActions from "./store/actions/chatActions";

class App extends React.Component {
  componentDidMount() {
    this.props.setupSocket();
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              render={(props) => {
                return <h1>Login</h1>;
              }}
            />
            <Route
              path="/"
              render={(props) => {
                return <h1>Root</h1>;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  setupSocket: () => {
    dispatch(ChatActions.setupSocket());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
