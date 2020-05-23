import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchGame, deleteGame } from "../../actions";

class GameDelete extends React.Component {
  componentDidMount() {
    this.props.fetchGame(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <>
        <button
          onClick={() => this.props.deleteGame(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.game) {
      return "Are you sure you want to delete this Game Project?";
    }

    return `Are you sure you want to Delete the titled Game Project: "${this.props.game.title}"`;
  }

  render() {
    return (
      <Modal
        title="Delete Game Project"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { game: state.games[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchGame, deleteGame })(GameDelete);
