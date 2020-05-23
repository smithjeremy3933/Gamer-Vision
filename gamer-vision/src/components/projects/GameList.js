import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGames } from "../../actions";

class GameList extends React.Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  renderAdmin(game) {
    if (game.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/projects/edit/${game.id}`} className="ui button primary">
            EDIT
          </Link>
          <Link
            to={`/projects/delete/${game.id}`}
            className="ui button negative"
          >
            DELETE
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.games.map((game) => {
      return (
        <div className="item" key={game.id}>
          {this.renderAdmin(game)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {game.title}
            <div className="description">{game.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/projects/new" className="ui button primary">
            Create Project
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Game Projects</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: Object.values(state.games),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchGames })(GameList);
