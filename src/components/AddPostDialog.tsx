import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { Post } from '../types/Post';

interface AddPostDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (post: Omit<Post, 'id' | 'dateAdded' | 'likes' | 'dislikes' | 'reposts'>) => void;
}

const AddPostDialog = ({ open, onClose, onAdd }: AddPostDialogProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ content });
    setContent('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="What's on your mind?"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPostDialog; 