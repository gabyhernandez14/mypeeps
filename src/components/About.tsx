import { Box, Typography, Container, Grid, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import FeedIcon from '@mui/icons-material/Feed';
import WorkIcon from '@mui/icons-material/Work';
import InsightsIcon from '@mui/icons-material/Insights';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Logo from './Logo';

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  }
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #3182ce 0%, #4299e1 100%)',
  color: 'white',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  }
}));

interface AboutProps {
  onBack: () => void;
}

const About = ({ onBack }: AboutProps) => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 6,
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          }
        }} onClick={onBack}>
          <IconButton sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Logo />
        </Box>

        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          About My People
        </Typography>

        <Typography 
          variant="h5" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          My People is your personal network management platform, designed to help you maintain and organize your professional connections in one place.
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <PeopleIcon sx={{ fontSize: 32 }} />
              </FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Contact Management
              </Typography>
              <Typography color="text.secondary">
                Keep track of your professional contacts with detailed profiles and interaction history.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <GroupIcon sx={{ fontSize: 32 }} />
              </FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Group Organization
              </Typography>
              <Typography color="text.secondary">
                Organize your contacts into meaningful groups for better relationship management.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <FeedIcon sx={{ fontSize: 32 }} />
              </FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Social Feed
              </Typography>
              <Typography color="text.secondary">
                Share updates and stay connected with your professional network.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <WorkIcon sx={{ fontSize: 32 }} />
              </FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Workplace Integration
              </Typography>
              <Typography color="text.secondary">
                Seamlessly manage your professional relationships in the workplace.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <InsightsIcon sx={{ fontSize: 32 }} />
              </FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Network Insights
              </Typography>
              <Typography color="text.secondary">
                Get valuable insights into your professional network and relationships.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <SecurityIcon sx={{ fontSize: 32 }} />
              </FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Security & Privacy
              </Typography>
              <Typography color="text.secondary">
                Your data is secure and private, with full control over your information.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>

        <Box sx={{ 
          textAlign: 'center',
          mt: 8,
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Why Choose My People?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', mb: 3 }}>
            My People is designed specifically for professionals who want to maintain and grow their network effectively. Our platform focuses on quality connections and meaningful relationships.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', mb: 3 }}>
            With an intuitive interface and powerful features, you can easily manage your professional relationships and stay connected with your network.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Start organizing your professional network today with My People.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 