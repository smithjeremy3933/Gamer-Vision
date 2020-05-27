import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signin } from "../../actions";

class Signin extends React.Component {
  onSubmit = (formValues) => {
    this.props.signin(formValues);
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

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  //   onSubmit = () => {
  //     this.props.onSubmit(formValues);
  //   };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="email" component={this.renderInput} label="Enter email" />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Enter password"
        />
        <button className="ui button primary">Sign In</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "You must enter a email";
  }

  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  if (formValues.password.length <= 5) {
    errors.password = "Your password must be atleast 6 characters long!";
  }

  return errors;
};

const formWrapped = reduxForm({ form: "signin", validate })(Signin);

export default connect(null, { signin })(formWrapped);
