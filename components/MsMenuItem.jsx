import { MenuItem, styled } from "@mui/material"
import { basicsColors } from "../pages/assets/colors"

const CustomMenuItem = styled(MenuItem)`
  font-size: 1.8rem;
  border: none;
  background-color: ${basicsColors.cultured};
`


export const MsMenuItem = ({ children, value }) => {


  return (
    <CustomMenuItem value={value} sx={{ fontSize: '1.8rem' }}>
      {children}
    </CustomMenuItem>
  )
}