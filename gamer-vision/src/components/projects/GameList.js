import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGames, fetchMyGames } from "../../actions";
import requireAuth from "../requireAuth";

class GameList extends React.Component {
  componentDidMount() {
    this.props.fetchMyGames(this.props.auth);
  }

  renderAdmin(game) {
    return (
      <div style={{ paddingTop: 10 }} className="right floated content">
        <Link to={`/projects/edit/${game._id}`} className="ui button primary">
          EDIT
        </Link>
        <Link
          to={`/projects/delete/${game._id}`}
          className="ui button negative"
        >
          DELETE
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.games.map((game) => {
      return (
        <div className="item" key={game._id}>
          {this.renderAdmin(game)}
          <i className="massive middle aligned icon gamepad" />
          <div className="content">
            <Link to={`/projects/${game._id}`} className="header">
              <h1>{game.title}</h1>
            </Link>
            <div style={{ width: 940, margin: 2 }} className="description">
              {game.description}
            </div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.authenticated) {
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
    authenticated: state.auth.authenticated,
  };
};

export default requireAuth(
  connect(mapStateToProps, { fetchGames, fetchMyGames })(GameList)
);
