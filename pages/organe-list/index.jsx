import { server } from '../../config';
import { MsSelect } from '../../components/MsSelect';
import { ESelectTypes } from '../../lib/types';

const OrganeList = ({ data }) => {
  return (
    <MsSelect list={data} type={ESelectTypes.ORGANE} />
  );
};

export default OrganeList;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/organe`);
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
