import { server } from '../../config';
import { MsSelect } from '../../components/MsSelect';
import { ESelectTypes } from '../../lib/types';

const SystemeList = ({ data }) => {

  return (
    <MsSelect list={data} type={ESelectTypes.SYSTEME} />
  );
};

export default SystemeList;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/systeme`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { data }
  };
}
