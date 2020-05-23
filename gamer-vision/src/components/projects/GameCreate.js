import React from "react";
import { connect } from "react-redux";
import { createGame } from "../../actions";
import GameForm from "./GameForm";

class GameCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createGame(formValues);
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

export default connect(null, { createGame })(GameCreate);
