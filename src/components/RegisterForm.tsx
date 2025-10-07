// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { RegisterRequest } from '../types/api';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Alert,
  Link,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Twitter,
} from '@mui/icons-material';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest & { confirmPassword: string }>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const { register, error } = useAuth();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (!acceptTerms) {
      alert('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      console.log('Registering user:', confirmPassword);
      await register(userData);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Card sx={{ maxWidth: 400, width: '100%', mx: 'auto', boxShadow: 3 }}>
      <CardHeader
        title={
          <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" color="text.primary">
            Inscription
          </Typography>
        }
        subheader={
          <Typography textAlign="center" color="text.secondary">
            Créez votre compte SurveyMaster Pro
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Prénom"
                value={formData.name}
                onChange={handleChange('name')}
                required
                disabled={isLoading}
                placeholder="Votre prénom"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nom"
                value={formData.surname}
                onChange={handleChange('surname')}
                required
                disabled={isLoading}
                placeholder="Votre nom"
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            required
            disabled={isLoading}
            placeholder="votre@email.com"
          />

          <TextField
            fullWidth
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange('password')}
            required
            disabled={isLoading}
            placeholder="Créez un mot de passe sécurisé"
            helperText="Minimum 8 caractères avec des chiffres et lettres"
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

          <TextField
            fullWidth
            label="Confirmer le mot de passe"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            required
            disabled={isLoading}
            placeholder="Répétez votre mot de passe"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                J'accepte les{' '}
                <Link href="/terms" color="primary">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link href="/privacy" color="primary">
                  politique de confidentialité
                </Link>
              </Typography>
            }
          />

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
            {isLoading ? 'Inscription...' : "S'inscrire"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Ou s'inscrire avec
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<Google />}
            sx={{
              borderColor: 'grey.300',
              py: 1.5,
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'grey.50',
              },
            }}
          >
            S'inscrire avec Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<Twitter />}
            sx={{
              borderColor: 'grey.300',
              py: 1.5,
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'grey.50',
              },
            }}
          >
            S'inscrire avec Twitter
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Déjà un compte ?{' '}
            <Link href="/login" color="primary" fontWeight="medium">
              Se connecter
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;