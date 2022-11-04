const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

const getAPIToken = async () => {
  const response = await fetch(TOKEN_URL);
  const data = await response.json();
  console.log(data);
  const TOKEN = data.token;
  localStorage.setItem('token', TOKEN);
  return TOKEN;
};

export default getAPIToken;
