const getAPIAnswer = async () => {
  const TOKEN = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${TOKEN}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default getAPIAnswer;
