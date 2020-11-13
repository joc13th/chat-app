import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import auth from "./store/reducers/authReducer";

function App() {
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
const mapStateToProps = (state) => ({
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
