// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    useTheme
} from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {
    Security,
    Analytics,
    SmartToy
} from '@mui/icons-material';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const theme = useTheme();
    //const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const features = [
        {
            icon: <SmartToy sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'IA intégrée',
            description: 'Générez automatiquement des questions pertinentes avec notre IA conversationnelle'
        },
        {
            icon: <Analytics sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Analytics en temps réel',
            description: 'Visualisez vos résultats avec des tableaux de bord interactifs et détaillés'
        },
        {
            icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Sécurité RGPD',
            description: 'Données hébergées en France avec chiffrement de bout en bout'
        }
    ];

    return (
        <Container
            maxWidth="lg"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                py: 4
            }}
        >
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr', xs: '1fr' },
                gap: 4,
                width: '100%',
                alignItems: 'center'
            }}>
                {/* Section de présentation */}
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        fontWeight="bold"
                        gutterBottom
                        color="text.primary"
                    >
                        {isLogin ? 'Content de vous revoir !' : 'Rejoignez la révolution des sondages'}
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        paragraph
                        sx={{ mb: 4 }}
                    >
                        {isLogin
                            ? 'Accédez à toutes vos données et continuez à créer des sondages performants.'
                            : 'Accédez à toutes les fonctionnalités avancées pour créer, analyser et monétiser vos sondages en quelques clics.'
                        }
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {features.map((feature, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Box sx={{
                                    bgcolor: 'primary.light',
                                    borderRadius: 2,
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {feature.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Section formulaire */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}>
                    {isLogin ? <LoginForm /> : <RegisterForm />}

                    <Typography variant="body2" color="text.secondary">
                        {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
                        <Typography
                            component="span"
                            variant="body2"
                            color="primary"
                            fontWeight="medium"
                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "S'inscrire" : "Se connecter"}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default AuthPage;