import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Container,
  Link,
  Divider
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../Logo';

interface LoginProps {
  onToggleForm: () => void;
}

const Login = ({ onToggleForm }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Logo />
          <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 3, fontWeight: 'bold' }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            My People is your personal network management platform. Keep track of your professional connections,
            organize them into meaningful groups, and maintain valuable relationships all in one place.
          </Typography>
        </Box>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'linear-gradient(45deg, #ffffff 30%, #f7fafc 90%)'
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              error={!!error}
              helperText={error}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                py: 1.5,
                background: 'linear-gradient(45deg, #3182ce 30%, #4299e1 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4299e1 30%, #3182ce 90%)',
                }
              }}
            >
              Sign In
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={onToggleForm}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Features:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ 
              px: 2, 
              py: 1, 
              borderRadius: 1, 
              bgcolor: 'primary.light',
              color: 'white'
            }}>
              Network Management
            </Typography>
            <Typography variant="body2" sx={{ 
              px: 2, 
              py: 1, 
              borderRadius: 1, 
              bgcolor: 'primary.light',
              color: 'white'
            }}>
              Group Organization
            </Typography>
            <Typography variant="body2" sx={{ 
              px: 2, 
              py: 1, 
              borderRadius: 1, 
              bgcolor: 'primary.light',
              color: 'white'
            }}>
              Social Feed
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login; 