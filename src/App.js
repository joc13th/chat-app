import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

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

export default App;
