import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class ThreadView extends Component {
  componentDidMount() {
    this.init();
  }
  componentDidUpdate(props) {
    if (props.match.params.threadId !== this.props.match.params.threadId) {
      this.init();
    }
  }
  init = () => {
    let currentThread = this.props.threads.filter(
      (t) => t.id === this.props.match.params.threadId
    )[0];
    if (currentThread && this.props.socket.readyState) {
      let skip = currentThread.Messages || 0;

      this.props.socket.send(
        JSON.stringify({
          type: "THREAD-LOAD",
          data: { threadId: this.props.match.params.threadId, skip: skip },
        })
      );
    }
  };
  render() {
    return <div className="main-view">hello</div>;
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
)(withRouter(ThreadView));
