import { server } from '../../config';
import { MsSelect } from '../../components/MsSelect';
import { ESelectTypes } from '../../lib/types';

const MaladieList = ({ data }) => {

  return (
    <MsSelect list={data} type={ESelectTypes.MALADIE} />
  );
};

export default MaladieList;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/maladie`);
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
