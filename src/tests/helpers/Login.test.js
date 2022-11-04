import React from 'react';
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa a pagina de Login', () => {
  test('Testa se a pagina possui um input name', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
  });
  test('Testa se a pagina possui um input email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
  });
  test('Testa se a pagina possui um botão type submit', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });
  test('Testa se o botão começa desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
    expect(button).toHaveAttribute('disabled');
  });
  test('Testa se ao digitar nome e email, o botão é habilitado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(button).toHaveAttribute('disabled');
    userEvent.type(inputName, 'Fulano');
    userEvent.type(inputEmail, 'teste@teste.com');
    expect(button).not.toHaveAttribute('disabled');
    expect(history.location.pathname).toBe('/');
    // expect(history.location.pathname).toBe('/game');
    userEvent.click(button);
    history.push('/game');
    await waitFor(() => { expect(history.location.pathname).toBe('/game');})
  })
  test('Testa se o botão de settings está na tela', () => {
    renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByTestId('btn-settings');
    expect(settingsButton).toBeInTheDocument();
  });
  test('Testa se o botão começa desabilitado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByTestId('btn-settings');
    expect(settingsButton).not.toHaveAttribute('disabled');
    expect(history.location.pathname).toBe('/');
    userEvent.click(settingsButton);
    history.push('/settings');
    await waitFor(() => { expect(history.location.pathname).toBe('/settings');})
  });
});