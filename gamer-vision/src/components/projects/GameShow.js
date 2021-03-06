import React from "react";
import { connect } from "react-redux";
import { fetchGame, createScript, fetchScripts } from "../../actions";
import { Field, reduxForm } from "redux-form";

class GameShow extends React.Component {
  componentDidMount() {
    this.props.fetchGame(this.props.match.params.id, this.props.authenticated);
    this.props.fetchScripts(
      this.props.match.params.id,
      this.props.authenticated
    );
    console.log(this.props.scripts);
  }

  onSubmit = (formValues) => {
    this.props.createScript(
      this.props.match.params.id,
      formValues,
      this.props.authenticated
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderHeader() {
    const { title, description } = this.props.game;
    return (
      <div className="row">
        <div className="four wide column">
          <i className="massive left aligned icon gamepad" />
        </div>
        <div className="twelve wide column">
          <div className="content">
            <h1 className="ui header">{title}</h1>
            <h5>{description}</h5>
          </div>
        </div>
      </div>
    );
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
        <div className="right floated content"></div>
      </div>
    );
  };

  renderAdmin(script) {
    return (
      <div>
        <a className="item">
          <i className="large chevron circle up icon"></i>
        </a>
        <a className="item">
          <i className="large edit icon"></i>
        </a>
        <a className="item">
          <i className="large trash alternate outline icon"></i>
        </a>
      </div>
    );
  }

  renderScriptList() {
    return this.props.scripts.map((script) => {
      return (
        <div className="item" key={script._id}>
          <div className="ui icon menu">
            <a className="item">
              <i className="large chevron circle up icon"></i>
            </a>
            <a className="item">
              <i className="large edit icon"></i>
            </a>
            <a className="item">
              <i className="large trash alternate outline icon"></i>
            </a>
            <h5
              style={{ margin: 2, padding: 2 }}
              className="left floated content"
            >
              {script.scriptTitle}
            </h5>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.game) {
      return <div>Loading...</div>;
    }

    return (
      <div className="ui equal width center aligned internally celled padded grid">
        {this.renderHeader()}
        <div className="row">
          <div className="seven wide column">
            <div style={{ width: 380 }} className="ui vertical menu">
              <div className="item">
                <form
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className="ui form error"
                >
                  <Field
                    name="scriptTitle"
                    component={this.renderInput}
                    label="Enter Title"
                  />
                  <button
                    style={{ width: 200, margin: 5 }}
                    className="ui button"
                  >
                    Add
                  </button>
                </form>
              </div>
              {this.renderScriptList()}
            </div>
          </div>
          <div className="nine wide column">
            <div className="ui middle aligned divided list">
              <div className="item">
                <div className="right floated content">
                  <div className="ui button">Add</div>
                </div>
                <div className="content">Lena</div>
                <i className="large github middle aligned icon"></i>
              </div>
              <div className="item">
                <div className="right floated content">
                  <div className="ui button">Add</div>
                </div>
                <div className="content">Lena</div>
                <i className="large github middle aligned icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    game: state.games[ownProps.match.params.id],
    authenticated: state.auth.authenticated,
    scripts: Object.values(state.scripts),
  };
};

const formWrapped = reduxForm({ form: "gameDetails" })(GameShow);

export default connect(mapStateToProps, {
  fetchGame,
  createScript,
  fetchScripts,
})(formWrapped);
