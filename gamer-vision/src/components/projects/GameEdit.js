import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchGame, editGame } from "../../actions/index";
import GameForm from "./GameForm";

class GameEdit extends React.Component {
  componentDidMount() {
    this.props.fetchGame(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editGame(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.game) {
      return <div>...Loading</div>;
    }
    return (
      <div>
        <h3>Edit a Game Project</h3>
        <GameForm
          initialValues={_.pick(this.props.game, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { game: state.games[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchGame, editGame })(GameEdit);
