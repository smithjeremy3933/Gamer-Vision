import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { signup } from "../../actions";
import _ from "lodash";

class Signup extends React.Component {
  onSubmit = (formValues) => {
    return new Promise((resolve) => {
      if (formValues.password.length <= 5) {
        throw new SubmissionError({ password: "password not long enough" });
      } else if (formValues.password.length >= 15) {
        throw new SubmissionError({ password: "password too long!" });
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
      ) {
        throw new SubmissionError({ email: "Invalid email address!" });
      } else {
        resolve(this.props.signup(formValues));
      }
    });
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

  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" type={type} placeholder={label} />
        {this.renderError(meta)}
      </div>
    );
  };

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
        <button className="ui button primary">Sign Up</button>
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
  return errors;
};

const submit = (formValues) => {};

const formWrapped = reduxForm({ form: "signup", validate })(Signup);

export default connect(null, { signup })(formWrapped);
