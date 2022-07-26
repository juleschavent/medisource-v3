import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SystemeUpdate from './SystemeUpdate';
import { server } from '../config';

export default function SystemeRead({ systemeId }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    setIsEdit(false);
    setLoading(true);
    fetch(`${server}/api/systeme/${systemeId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [systemeId, isSaved]);

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <div>
      {!isEdit ? (
        <div>
          <h2>{data?.name_systeme}</h2>
          <p dangerouslySetInnerHTML={{ __html: data?.desc_systeme }} />
          <EditIcon onClick={() => handleEdit()} />
        </div>
      ) : (
        <SystemeUpdate
          data={data}
          handleEdit={handleEdit}
          setIsSaved={setIsSaved}
        />
      )}
      {/* {isAlert && <AlertLostModification />} */}
    </div>
  );
}
