import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types/api';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit,
  Delete,
  Person,
  AdminPanelSettings,
} from '@mui/icons-material';

const UserList: React.FC = () => {
  const { users, loading, error, deleteUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleDeleteClick = (user: User): void => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (selectedUser && selectedUser.id) {
      try {
        await deleteUser(selectedUser.id);
        setShowDeleteModal(false);
        setSelectedUser(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleCancelDelete = (): void => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={8}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Erreur: {error}
      </Alert>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold" color="text.primary">
          Liste des Utilisateurs
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {users.length} utilisateur(s) trouvé(s)
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: 'grey.50' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                Nom
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                Prénom
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                Rôle
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Aucun utilisateur trouvé
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {user.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium" color="text.primary">
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {user.surname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={user.role === 'admin' ? <AdminPanelSettings /> : <Person />}
                      label={user.role || 'user'}
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      variant={user.role === 'admin' ? 'filled' : 'outlined'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Éditer">
                        <IconButton
                          size="small"
                          onClick={() => {/* Implémentez l'édition */ }}
                          sx={{
                            color: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.light',
                              color: 'primary.dark'
                            }
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(user)}
                          sx={{
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'error.light',
                              color: 'error.dark'
                            }
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de confirmation de suppression */}
      <Dialog
        open={showDeleteModal}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle id="delete-dialog-title" sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Confirmer la suppression
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText id="delete-dialog-description">
            Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
            <Typography component="span" fontWeight="bold" color="text.primary">
              {selectedUser?.name} {selectedUser?.surname}
            </Typography>
            ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            color="inherit"
            sx={{
              borderRadius: 1,
              textTransform: 'none'
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 1,
              textTransform: 'none'
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserList;