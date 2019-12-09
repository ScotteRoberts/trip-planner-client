import React from 'react';
import PropTypes from 'prop-types';
import './ControlledInputForm.css';

export default class ControlledInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  // uses newer arrow sytnax to bind method to this
  handleChange = event => {
    // capture the input data from the event
    // update state
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = event => {
    this.props.onSubmit(this.state.inputValue);
    if (this.props.clearable) {
      this.setState({ inputValue: '' }, () => {});
    }
  };

  render() {
    return (
      <div className="controlled-input-form">
        <label htmlFor="input-text">
          <span
            role="img"
            aria-label={this.props['aria-label'] || 'Emoji'}
            className="icon"
          >
            {this.props.icon || ''}
          </span>
          <input
            type="text"
            name="inputValue"
            id="inputValue"
            placeholder={this.props.placeholder}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </label>
        <button type="button" onClick={this.handleSubmit}>
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

ControlledInputForm.propTypes = {
  buttonText: PropTypes.string,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string,
  'aria-label': PropTypes.string,
};

ControlledInputForm.defaultProps = {
  buttonText: 'Submit',
  clearable: false,
  icon: '✏️',
  'aria-label': '',
};
