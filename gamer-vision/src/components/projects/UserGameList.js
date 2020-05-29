import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyGames, fetchGames } from "../../actions";
import requireAuth from "../requireAuth";

class UserGameList extends React.Component {
  componentDidMount() {
    this.props.fetchGames();
    // this.props.fetchMyGames(this.props.auth);
    // console.log(this.props);
  }

  // renderAdmin(game) {
  //   return (
  //     <div className="right floated content">
  //       <Link to={`/projects/edit/${game.id}`} className="ui button primary">
  //         EDIT
  //       </Link>
  //       <Link to={`/projects/delete/${game.id}`} className="ui button negative">
  //         DELETE
  //       </Link>
  //     </div>
  //   );
  // }

  renderList() {
    return this.props.allGames.map((game) => {
      return (
        <div className="item" key={game._id}>
          {/* {this.renderAdmin(game)} */}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/projects/${game._id}`} className="header">
              {game.title}
            </Link>
            <div className="description">{game.description}</div>
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
    allGames: Object.values(state.allGames),
    authenticated: state.auth.authenticated,
    // isSignedIn: state.auth.isSignedIn,
  };
};

export default requireAuth(
  connect(mapStateToProps, { fetchMyGames, fetchGames })(UserGameList)
);
