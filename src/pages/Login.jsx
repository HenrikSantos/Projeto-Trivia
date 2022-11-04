import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAPIToken from '../helpers/getAPIToken';
import { savePlayer } from '../redux/action';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isBtnDisabled: true,
  };

  verify = () => {
    const { name, email } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (name && re.test(email)) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  };

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verify);
  };

  handleBtnPlay = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    await getAPIToken();
    dispatch(savePlayer({ gravatarEmail: email, name }));
    history.push('/game');
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { email, name, isBtnDisabled } = this.state;
    return (
      <>
        <h1 className="trivia-text">Trybe Trivia</h1>
        <form className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            id="name"
            value={ name }
            onChange={ this.handleChanges }
            placeholder="nome"
          />
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            id="email"
            value={ email }
            onChange={ this.handleChanges }
            placeholder="email"
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isBtnDisabled }
            onClick={ this.handleBtnPlay }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleSettings }
          >
            Settings
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
