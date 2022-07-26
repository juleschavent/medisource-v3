import { useEffect, useState } from 'react';
import { server } from '../config';

// export const useFetch = (value) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`${server}/api/${value}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       })
//       .catch((err) => setError(err));
//   }, [value]);

//   return { data, loading, error };
// };

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${server}/api/systeme`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  return { data, loading, error };
};
