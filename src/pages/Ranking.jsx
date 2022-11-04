import React from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import { resetScoreboard } from '../redux/action';

class Ranking extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('players'));
    console.log(players);
    this.setState({
      players,
    });
  }

  handleHome = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScoreboard());
    history.push('/');
  };

  render() {
    const { players } = this.state;
    return (
      <div className="ranking-page">
        <h2 data-testid="ranking-title">Ranking</h2>
        <ul>
          {
            players.sort((player, nextPlayer) => nextPlayer.score - player.score)
              .map((player, index) => (
                <li key={ player.name }>
                  <img
                    src={
                      `https:www.gravatar.com/avatar/${MD5(player.gravatarEmail).toString()}`
                    }
                    alt={ player.gravatarEmail }
                  />
                  <p data-testid={ `player-name-${index}` }>
                    { player.name }
                  </p>
                  <p data-testid={ `player-score-${index}` }>
                    Score:
                    {' '}
                    <span>{ player.score }</span>
                  </p>
                </li>
              ))
          }
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleHome }
        >
          Home
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect()(Ranking);
