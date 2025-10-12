import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Card sx={{ maxWidth: 400, width: '100%', mx: 'auto', boxShadow: 3 }}>
      <CardHeader
        title={
          <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" color="text.primary">
            Connexion
          </Typography>
        }
        subheader={
          <Typography textAlign="center" color="text.secondary">
            Accédez à votre compte SurveyMaster Pro
          </Typography>
        }
        sx={{ pb: 1 }}
      />

      <CardContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            placeholder="votre@email.com"
          />

          <TextField
            fullWidth
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Votre mot de passe"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Se souvenir de moi"
            />
            <Link href="/forgot-password" variant="body2" color="primary">
              Mot de passe oublié ?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{
              bgcolor: 'text.primary',
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'primary.main',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Pas encore de compte ?{' '}
            <Typography
              component="span"
              variant="body2"
              color="primary"
              fontWeight="medium"
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={onToggleMode}
            >
              S'inscrire
            </Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;