import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchAPIAnswer, sumScore } from '../redux/action';

const INVALID_TOKEN_CODE = 3;
const NUMBER_OF_QUESTIONS = 4;
const TIMER_TIME = 1000;
const MINIMUM_GAIN = 10;
const HARD_GAIN = 3;

class Game extends Component {
  state = {
    category: '',
    question: '',
    alternatives: [],
    counter: 0,
    difficulty: '',
    correctAnswer: '',
    responded: false,
    timer: 30,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPIAnswer())
      .then(() => { this.handleQuestion(); });
  }

  componentDidUpdate() {
    const { history, responseCode } = this.props;
    if (responseCode === INVALID_TOKEN_CODE) {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  timer = () => {
    const idSet = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer, responded } = this.state;
        if (timer === 0 || responded) {
          clearInterval(idSet);
          this.setState({ responded: true });
        }
      });
    }, TIMER_TIME);
  };

  handleQuestion = () => {
    const { results } = this.props;
    const { counter } = this.state;
    if (results[counter]) {
      const alternatives = [
        results[counter].correct_answer,
        ...results[counter].incorrect_answers,
      ];
      // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array randomizar um array
      for (let i = alternatives.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [alternatives[i], alternatives[j]] = [alternatives[j], alternatives[i]];
      }

      this.setState({
        category: results[counter].category,
        question: results[counter].question,
        difficulty: results[counter].difficulty,
        correctAnswer: results[counter].correct_answer,
        alternatives,
      });
      this.timer();
    }
  };

  handleResult = ({ target: { id } }) => {
    this.setState({ responded: true });
    if (id === 'correct-answer') {
      const { dispatch } = this.props;
      const { difficulty, timer } = this.state;
      let total = MINIMUM_GAIN;
      switch (difficulty) {
      case 'hard': total += (HARD_GAIN * timer);
        break;
      case 'medium': total += (2 * timer);
        break;
      case 'easy': total += timer;
        break;
      default: return;
      }
      dispatch(sumScore(total));
    }
  };

  nextQuestion = () => {
    const { counter } = this.state;
    const { history } = this.props;
    if (counter === NUMBER_OF_QUESTIONS) {
      const { name, score, gravatarEmail } = this.props;
      const oldRanking = JSON.parse(localStorage.getItem('players'));
      if (oldRanking) {
        const addNewPlayer = [
          ...oldRanking,
          {
            name,
            gravatarEmail,
            score,
          },
        ];
        localStorage.setItem('players', JSON.stringify(addNewPlayer));
      } else {
        const addNewPlayer = [
          {
            name,
            gravatarEmail,
            score,
          },
        ];
        localStorage.setItem('players', JSON.stringify(addNewPlayer));
      }
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      timer: 30,
      responded: false,
    }), this.handleQuestion);
  };

  render() {
    const {
      category,
      question,
      alternatives,
      correctAnswer,
      difficulty,
      responded,
      timer } = this.state;
    return (
      <div className="game-page">
        <Header />
        <div className="game-container">
          <p data-testid="question-category">{category}</p>
          <p>
            Dificulty:
            {' '}
            {difficulty}
          </p>
          <h2>
            Time:
            {' '}
            <span>{timer}</span>
          </h2>
          <p className="question" data-testid="question-text">{question}</p>
          <div className="answer-options" data-testid="answer-options">
            {
              alternatives.map((alternative, index) => {
                if (alternative === correctAnswer) {
                  return (
                    <button
                      className={ responded ? 'correct-answer' : '' }
                      key={ alternative }
                      type="button"
                      data-testid="correct-answer"
                      onClick={ this.handleResult }
                      disabled={ responded }
                      id="correct-answer"
                    >
                      {alternative}
                    </button>
                  );
                }
                return (
                  <button
                    className={ responded ? 'incorrect-answer' : '' }
                    key={ alternative }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.handleResult }
                    disabled={ responded }
                  >
                    {alternative}
                  </button>
                );
              })
            }
          </div>
          {responded && (
            <button
              className="next-button"
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  responseCode: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  responseCode: state.questions.response_code,
  results: state.questions.results,
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
