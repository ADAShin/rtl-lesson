import { FC, useState } from 'react';
import axios from 'axios';
import { UserType } from './UseEffectRender';

export const MockServer: FC = () => {
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const fetchUser = async () => {
    axios
      .get<UserType>('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        const { username } = res.data;
        setUsername(username);
        setClicked(true);
      })
      .catch((e) => {
        setError('Fetching Failed !');
      });
  };

  const buttonText = clicked ? 'Loaded' : 'Start Fetch';

  return (
    <div>
      <button onClick={() => fetchUser()} disabled={clicked}>
        {buttonText}
      </button>
      {username && <h3>{username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
};
