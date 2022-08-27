import { MenuItem, styled } from '@mui/material';
import { basicsColors } from '/assets/colors';

const CustomMenuItem = styled(MenuItem)`
  font-size: 1.8rem;
  border: none;
  margin: 0 10px;
  border-radius: 1rem;

  // > a {
  //   padding: 15px;
  //   width: 100%;
  //   background-color: ${basicsColors.cultured}
  // }
`;


export const MsMenuItem = ({ children, value }) => {


  return (
    <CustomMenuItem value={value} sx={{ fontSize: '1.8rem' }}>
      {children}
    </CustomMenuItem>
  );
};
