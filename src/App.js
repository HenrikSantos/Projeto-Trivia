import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './style/globals.css';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
      <Route
        exact
        path="/game"
        render={ (props) => <Game { ...props } /> }
      />
      <Route
        exact
        path="/settings"
        render={ (props) => <Settings { ...props } /> }
      />
      <Route
        exact
        path="/feedback"
        render={ (props) => <Feedback { ...props } /> }
      />
      <Route
        exact
        path="/ranking"
        render={ (props) => <Ranking { ...props } /> }
      />
    </Switch>
  );
}
