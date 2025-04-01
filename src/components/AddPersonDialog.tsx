import { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Typography,
  InputAdornment
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Person } from '../types/Person';
import { cloudinaryService } from '../services/cloudinaryService';

interface AddPersonDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (person: Omit<Person, 'id' | 'dateAdded'>) => void;
}

const AddPersonDialog = ({ open, onClose, onAdd }: AddPersonDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    organization: '',
    notes: '',
    phoneNumber: '',
    email: '',
    linkedinUrl: '',
    profilePictureUrl: ''
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await cloudinaryService.uploadImage(file);
        setFormData(prev => ({ ...prev, profilePictureUrl: imageUrl }));
        setPreviewUrl(URL.createObjectURL(file));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: '',
      role: '',
      organization: '',
      notes: '',
      phoneNumber: '',
      email: '',
      linkedinUrl: '',
      profilePictureUrl: ''
    });
    setPreviewUrl(null);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      role: '',
      organization: '',
      notes: '',
      phoneNumber: '',
      email: '',
      linkedinUrl: '',
      profilePictureUrl: ''
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={previewUrl || formData.profilePictureUrl}
                sx={{ width: 100, height: 100 }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <IconButton
                color="primary"
                onClick={() => fileInputRef.current?.click()}
                size="small"
              >
                <AddAPhotoIcon />
              </IconButton>
              <Typography variant="caption" color="text.secondary">
                Click to add profile picture
              </Typography>
            </Box>
            <TextField
              label="Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Role"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              fullWidth
            />
            <TextField
              label="Organization"
              required
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              fullWidth
            />
            <TextField
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="LinkedIn Profile"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              fullWidth
              placeholder="https://www.linkedin.com/in/username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkedInIcon sx={{ color: '#0077B5' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Notes"
              multiline
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Contact
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPersonDialog; 