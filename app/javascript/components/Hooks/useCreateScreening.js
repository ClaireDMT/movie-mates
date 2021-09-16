import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Store/auth-context';

const useCreateScreening = (friendId) => {
  const url = '/api/v1/screenings.json';
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const resp = await axios.post(url, {
        "screening": {
          "user2_id": friendId
        }
      }, {
      headers: authCtx.headers
      })
      console.log(resp);
      setData(resp.data);
    } catch(error) {
      setError(error);
    } finally {
      setLoading(false);
      history.push(`/screenings/${resp.data.data.id}/genres`)
    };
  };

  useEffect(() => {
      fetchData();
      console.log(data)
    }, []);

  return { data, error, loading };
};

export default useCreateScreening;
