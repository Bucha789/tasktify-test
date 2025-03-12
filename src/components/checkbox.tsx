import { Checkbox, CheckboxProps, styled } from "@mui/material";

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 24,
  width: 24,
  height: 24,
  backgroundColor: '#fff',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  border: '1px solid #D1D2DA',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    border: '1px solid transparent',
    backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(to right, #57ddff, #c058f3)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    ...theme.applyStyles('dark', {
      border: '1px solid transparent',
      backgroundImage: 'linear-gradient(#25273D, #25273D), linear-gradient(to right, #57ddff, #c058f3)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    }),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
    ...theme.applyStyles('dark', {
      background: 'rgba(57,75,89,.5)',
    }),
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
    backgroundColor: '#25273D',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
    border: '1px solid #4D5067',
  }),
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundImage: 'linear-gradient(to right, #57ddff, #c058f3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
    content: '""',
    display: 'block',
    width: 24,
    height: 24,
    backgroundPosition: 'center',
    backgroundSize: '11px 9px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="11" width="9" viewBox="0 0 11 9" fill="${encodeURIComponent(
      'none',
    )}"><path d="M1 4.3041L3.6959 7L9.6959 1" stroke="white" stroke-width="2"/></svg>')`,
  },
  'input:hover ~ &': {
    backgroundImage: 'linear-gradient(to right, #57ddff, #c058f3)',
    ...theme.applyStyles('dark', {
      backgroundImage: 'linear-gradient(to right, #57ddff, #c058f3)',
    }),
  },
  ...theme.applyStyles('dark', {
    backgroundImage: 'linear-gradient(to right, #57ddff, #c058f3)',
  }),
}));


export const CustomCheckbox = (props: CheckboxProps) => {
  return (
    <Checkbox
      disableRipple
      color="default"
      icon={<BpIcon />}
      checkedIcon={<BpCheckedIcon />}
      {...props}
    />
  )
}