import { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const fetchJSON = async () => {
  const res = await axios.get<unknown, AxiosResponse<UserType>>(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  return res.data;
};

export const UseEffectRender: FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchJSON();
      setUser(data);
    };
    void fetchUser();
  }, [user]);
  return <div>{user ? <p>I am {user.username}</p> : null}</div>;
};
