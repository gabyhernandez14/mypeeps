import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RepeatIcon from '@mui/icons-material/Repeat';
import DeleteIcon from '@mui/icons-material/Delete';
import { Post } from '../types/Post';
import { postService } from '../services/postService';

interface PostCardProps {
  post: Post;
  currentUserId: string;
  onUpdate: () => void;
}

const PostCard = ({ post, currentUserId, onUpdate }: PostCardProps) => {
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  const [repostContent, setRepostContent] = useState('');

  const hasLiked = post.likes.includes(currentUserId);
  const hasDisliked = post.dislikes.includes(currentUserId);
  const hasReposted = post.reposts.includes(currentUserId);
  const isOriginalAuthor = post.userId === currentUserId;

  const handleLike = async () => {
    await postService.toggleLike(post.id, currentUserId);
    onUpdate();
  };

  const handleDislike = async () => {
    await postService.toggleDislike(post.id, currentUserId);
    onUpdate();
  };

  const handleRepost = async () => {
    if (repostContent.trim()) {
      await postService.repost(post.id, currentUserId, post.userName);
      setShowRepostDialog(false);
      setRepostContent('');
      onUpdate();
    }
  };

  const handleDelete = async () => {
    await postService.deletePost(post.id);
    onUpdate();
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>{post.userName[0]}</Avatar>
          <Box>
            <Typography variant="subtitle1">{post.userName}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.dateAdded).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {post.originalPost ? (
          <Box sx={{ mb: 2, pl: 2, borderLeft: 2, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              Reposted from {post.originalPost.userName}
            </Typography>
            <Typography variant="body1">{post.originalPost.content}</Typography>
          </Box>
        ) : (
          <Typography variant="body1">{post.content}</Typography>
        )}
      </CardContent>

      <CardActions>
        <IconButton 
          onClick={handleLike}
          color={hasLiked ? 'primary' : 'default'}
        >
          <ThumbUpIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {post.likes.length}
          </Typography>
        </IconButton>

        <IconButton 
          onClick={handleDislike}
          color={hasDisliked ? 'error' : 'default'}
        >
          <ThumbDownIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {post.dislikes.length}
          </Typography>
        </IconButton>

        <IconButton 
          onClick={() => setShowRepostDialog(true)}
          color={hasReposted ? 'primary' : 'default'}
        >
          <RepeatIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {post.reposts.length}
          </Typography>
        </IconButton>

        {isOriginalAuthor && (
          <IconButton onClick={handleDelete} color="error">
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>

      <Dialog open={showRepostDialog} onClose={() => setShowRepostDialog(false)}>
        <DialogTitle>Repost</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Original post by {post.userName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {post.content}
          </Typography>
          <TextField
            label="Add your thoughts (optional)"
            multiline
            rows={3}
            value={repostContent}
            onChange={(e) => setRepostContent(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRepostDialog(false)}>Cancel</Button>
          <Button onClick={handleRepost} variant="contained" color="primary">
            Repost
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PostCard; 