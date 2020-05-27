import React from "react";
import { connect } from "react-redux";
import { createGame } from "../../actions";
import GameForm from "./GameForm";
import requireAuth from "../requireAuth";

class GameCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createGame(formValues, this.props.authenticated);
  };

  render() {
    return (
      <div>
        <h3>Create a Game Project!</h3>
        <GameForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default requireAuth(
  connect(mapStateToProps, { createGame })(GameCreate)
);
