import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class Sidebar extends Component {
  state = {
    search: "",
  };
  search = () => {
    this.props.socket.send(
      JSON.stringify({
        type: "SEARCH",
        data: this.state.search,
      })
    );
  };
  findOrCreateThread = (id) => {
    this.props.socket.send(
      JSON.stringify({
        type: "FIND_THREAD",
        data: [this.props.user.id, id],
      })
    );
  };
  render() {
    return (
      <div className="sidebar">
        <div className="search-container">
          <input
            className="form-control"
            placeholder="search..."
            value={this.state.search}
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
          />
          <button className="btn btn-primary" onClick={(e) => this.search()}>
            Search
          </button>
        </div>
        {this.state.search ? (
          <ul className="thread-list">
            <label>Results</label>
            {this.props.users
              .filter((u) => u.id !== this.props.user.id)
              .map((user, ui) => {
                return (
                  <li key={ui}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        this.findOrCreateThread(user.id);
                      }}
                      to="/thread"
                    >
                      <i className="zmdi zmdi-account-circle" />
                      <h5>{user.name}</h5>
                      <p>{user.email}</p>
                    </a>
                  </li>
                );
              })}
          </ul>
        ) : (
          <ul className="thread-list">
            <label>Messages</label>
            {this.props.threads.map((thread, threadIndex) => {
              return (
                <Link to={`/${thread.id}`}>
                  <i className="zmdi zmdi-account-circle" />
                  <h5>{thread.id}</h5>
                  <p>This is the last message</p>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
