import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import _ from "lodash";

class GameForm extends React.Component {
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

  onSubmit = (formValues, authentication) => {
    return new Promise((resolve) => {
      let words = _.words(formValues.description);

      let trimmedStartTitle = _.trimStart(formValues.title);
      let trimmedStartDescription = _.trimStart(formValues.description);

      let trimmedEndTitle = _.trimEnd(formValues.title);
      let trimmedEndDescription = _.trimEnd(formValues.description);

      if (
        trimmedStartTitle !== formValues.title ||
        trimmedEndTitle !== formValues.title
      ) {
        throw new SubmissionError({
          title: "Cannot have SPACE at beginning or end of title",
        });
      } else if (
        trimmedStartDescription !== formValues.description ||
        trimmedEndDescription !== formValues.description
      ) {
        throw new SubmissionError({
          description: "Cannot have SPACE at beginning or end of description",
        });
      }

      for (let word of words) {
        if (word.length > 20) {
          throw new SubmissionError({
            description: "No word can be longer then (20) Chars",
          });
        }
      }

      if (formValues.title.length < 2) {
        throw new SubmissionError({
          title: "Title must be atleast (2) characters long",
        });
      } else if (formValues.title.length > 30) {
        throw new SubmissionError({
          title: "Max 30 Chars",
        });
      } else if (formValues.description.length < 5) {
        throw new SubmissionError({
          description:
            "Must enter a short description of your Game! ( Min 5 Chars)",
        });
      } else if (formValues.description.length > 500) {
        throw new SubmissionError({
          description:
            "Must enter a short description of your Game! ( Max 500 Chars)",
        });
      } else {
        resolve(this.props.onSubmit(formValues, authentication));
      }
    });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "gameForm",
  validate,
})(GameForm);
