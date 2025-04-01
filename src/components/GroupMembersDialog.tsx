import { useState, useEffect } from 'react';
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
  IconButton,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Person } from '../types/Person';
import { Group } from '../types/Group';
import { groupService } from '../services/groupService';

interface GroupMembersDialogProps {
  open: boolean;
  onClose: () => void;
  group: Group;
  allPersons: Person[];
  onUpdate: () => void;
}

const GroupMembersDialog = ({ open, onClose, group, allPersons, onUpdate }: GroupMembersDialogProps) => {
  const [members, setMembers] = useState<Person[]>([]);

  useEffect(() => {
    const groupMembers = allPersons.filter(person => group.personIds.includes(person.id));
    setMembers(groupMembers);
  }, [group, allPersons]);

  const handleRemoveMember = async (personId: string) => {
    await groupService.removePersonFromGroup(group.id, personId);
    onUpdate();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{group.name} - Members</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" paragraph>
          {group.description}
        </Typography>
        <List>
          {members.map((person) => (
            <ListItem key={person.id} divider>
              <ListItemText
                primary={person.name}
                secondary={`${person.role} at ${person.organization}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemoveMember(person.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupMembersDialog; 