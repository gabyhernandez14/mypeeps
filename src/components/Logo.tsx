import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5),
  borderRadius: '12px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  }
}));

const LogoCircle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #3182ce 0%, #4299e1 100%)',
  color: 'white',
  fontWeight: 700,
  fontSize: '1.2rem',
  letterSpacing: '0.5px',
  boxShadow: '0 2px 8px rgba(49,130,206,0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(49,130,206,0.4)',
  }
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 700,
  fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateX(2px)',
  }
}));

const Logo = () => {
  return (
    <LogoContainer>
      <LogoCircle>
        MP
      </LogoCircle>
      <LogoText>
        My People
      </LogoText>
    </LogoContainer>
  );
};

export default Logo; 