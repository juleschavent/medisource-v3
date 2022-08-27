import { MenuItem, Select, styled } from '@mui/material';
import Link from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMemo } from 'react';
import { useOrderByName } from '../lib/UseOrderByName';
import { ESelectTypes } from '../lib/types';
import { basicsColors } from '/assets/colors';
import { MsMenuItem } from './MsMenuItem';

const CustomSelect = styled(Select)`
  font-size: 1.8rem;
  border: none;
  background-color: ${basicsColors.cultured};
`;


export const MsSelect = ({ list, type }) => {

  const orderedList = useMemo(() => (
    useOrderByName(list, `name_${type}`)
  ), [list]);

  const defaultValue = useMemo(() => {
    switch (type) {
    case ESelectTypes.SYSTEME:
      return 'Selectionnez un système';
    case ESelectTypes.ORGANE:
      return 'Selectionnez un organe';
    case ESelectTypes.MALADIE:
      return 'Selectionnez une maladie';
    case ESelectTypes.TRAITEMENT:
      return 'Selectionnez un traitement';
    }
  }, [type]);

  return (
    <div className='flex items-center mx-auto w-fit-content'>
      <CustomSelect value="none">
        <MsMenuItem value="none" sx={{ fontSize: '1.8rem' }}>{defaultValue}</MsMenuItem>
        {orderedList?.map((item) => (
          <MsMenuItem value={item[`id_${type}`]} sx={{ fontSize: '1.8rem' }} key={item[`id_${type}`]}>
            <Link
              href={`/${type}-list/${item[`id_${type}`]}`}
            >
              {item[`name_${type}`]}
            </Link>
          </MsMenuItem>
        ))}
      </CustomSelect>
      <Link href={`/${type}-list/create`}>
        <AddCircleIcon className='ml-1 cursor-pointer' color='primary' />
      </Link>
    </div>
  );
};
