import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Store/auth-context';

const useFriends = () => {
  const url = '/api/v1/friends.json';
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const resp = await axios.get(url, {
        headers: authCtx.headers
      });
      console.log(resp);
      setData(resp.data);
    } catch(error) {
      setError(error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
      fetchData();
      console.log(data)
    }, []);

  return { data, error, loading };
};

export default useFriends;
