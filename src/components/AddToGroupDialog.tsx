import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox
} from '@mui/material';
import { Group } from '../types/Group';
import { groupService } from '../services/groupService';

interface AddToGroupDialogProps {
  open: boolean;
  onClose: () => void;
  groups: Group[];
  personId: string;
  onUpdate: () => void;
}

const AddToGroupDialog = ({ open, onClose, groups, personId, onUpdate }: AddToGroupDialogProps) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const handleToggleGroup = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSubmit = async () => {
    for (const groupId of selectedGroups) {
      await groupService.addPersonToGroup(groupId, personId);
    }
    onUpdate();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add to Groups</DialogTitle>
      <DialogContent>
        <List>
          {groups.map((group) => (
            <ListItem key={group.id} divider>
              <ListItemText
                primary={group.name}
                secondary={group.description}
              />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  checked={selectedGroups.includes(group.id)}
                  onChange={() => handleToggleGroup(group.id)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add to Selected Groups
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToGroupDialog; 