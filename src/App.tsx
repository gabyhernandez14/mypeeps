import { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Fab, 
  Dialog,
  Box,
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  useTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import GroupIcon from '@mui/icons-material/Group'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Person } from './types/Person'
import { Group } from './types/Group'
import AddPersonDialog from './components/AddPersonDialog'
import AddGroupDialog from './components/AddGroupDialog'
import GroupMembersDialog from './components/GroupMembersDialog'
import AddToGroupDialog from './components/AddToGroupDialog'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { useAuth } from './contexts/AuthContext'
import { personService } from './services/personService'
import { groupService } from './services/groupService'
import { postService } from './services/postService'
import AddPostDialog from './components/AddPostDialog'
import PostCard from './components/PostCard'
import { Post } from './types/Post'
import Logo from './components/Logo'
import { motion, AnimatePresence } from 'framer-motion'
import About from './components/About'
import { createAppTheme } from './theme'
import { profileService } from './services/profileService'
import { updateProfile } from 'firebase/auth'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <AnimatePresence mode="wait">
        {value === index && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Box sx={{ p: 4 }}>
              {children}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [persons, setPersons] = useState<Person[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [openPersonDialog, setOpenPersonDialog] = useState(false)
  const [openGroupDialog, setOpenGroupDialog] = useState(false)
  const [openGroupMembersDialog, setOpenGroupMembersDialog] = useState(false)
  const [openAddToGroupDialog, setOpenAddToGroupDialog] = useState(false)
  const [openPostDialog, setOpenPostDialog] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [showLogin, setShowLogin] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const { user, logout } = useAuth()
  const [showAbout, setShowAbout] = useState(false)
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode')
    return (savedMode as 'light' | 'dark') || 'light'
  })
  const theme = createAppTheme(mode)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  // Save theme mode to localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const storedPersons = localStorage.getItem('persons')
        const storedGroups = localStorage.getItem('groups')
        
        if (storedPersons) {
          const parsedPersons = JSON.parse(storedPersons)
          setPersons(parsedPersons)
        }
        if (storedGroups) {
          const parsedGroups = JSON.parse(storedGroups)
          setGroups(parsedGroups)
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
      }
    }

    loadFromStorage()
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      if (persons.length > 0) {
        localStorage.setItem('persons', JSON.stringify(persons))
      }
      if (groups.length > 0) {
        localStorage.setItem('groups', JSON.stringify(groups))
      }
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }, [persons, groups])

  useEffect(() => {
    if (user) {
      loadData()
    }
    // Set page title
    document.title = 'My People';
  }, [user])

  const loadData = async () => {
    if (user) {
      try {
        const [userPersons, userGroups, userPosts] = await Promise.all([
          personService.getPersons(user.uid),
          groupService.getGroups(user.uid),
          postService.getPosts(user.uid)
        ])
        
        // Merge Firebase data with localStorage data for persons and groups
        const mergedPersons = [...persons, ...userPersons.filter(
          (fp) => !persons.some((lp) => lp.id === fp.id)
        )]
        const mergedGroups = [...groups, ...userGroups.filter(
          (fg) => !groups.some((lg) => lg.id === fg.id)
        )]

        setPersons(mergedPersons)
        setGroups(mergedGroups)
        setPosts(userPosts) // Use Firebase posts directly
      } catch (error) {
        console.error('Error loading data from Firebase:', error)
      }
    }
  }

  const handleAddPerson = async (newPerson: Omit<Person, 'id' | 'dateAdded'>) => {
    if (user) {
      try {
        const person = await personService.addPerson(user.uid, newPerson)
        setPersons(prevPersons => [...prevPersons, person])
        setOpenPersonDialog(false)
      } catch (error) {
        console.error('Error adding person:', error)
      }
    }
  }

  const handleAddGroup = async (newGroup: Omit<Group, 'id' | 'dateAdded' | 'personIds'>) => {
    if (user) {
      try {
        const group = await groupService.addGroup(user.uid, newGroup)
        setGroups(prevGroups => [...prevGroups, group])
        setOpenGroupDialog(false)
      } catch (error) {
        console.error('Error adding group:', error)
      }
    }
  }

  const handleAddPost = async (newPost: Omit<Post, 'id' | 'dateAdded' | 'likes' | 'dislikes' | 'reposts'>) => {
    if (user) {
      try {
        const post = await postService.addPost(user.uid, user.email || 'Anonymous', newPost.content)
        setPosts(prevPosts => [post, ...prevPosts])
        setOpenPostDialog(false)
      } catch (error) {
        console.error('Error adding post:', error)
      }
    }
  }

  const handleLogout = async () => {
    await logout()
    // Don't clear the state here, so data persists
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const handleProfilePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const photoURL = await profileService.uploadProfilePhoto(user.uid, file);
      setProfilePhoto(photoURL);
      
      // Update user profile in Firebase Auth
      await updateProfile(user, {
        photoURL: photoURL
      });
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      // You might want to show an error message to the user here
    }
  };

  const renderContent = () => {
    if (!user) {
      return showLogin ? (
        <Login onToggleForm={() => setShowLogin(false)} />
      ) : (
        <Register onToggleForm={() => setShowLogin(true)} />
      )
    }

    return (
      <>
        <AppBar position="static" sx={{ 
          background: mode === 'light' 
            ? 'linear-gradient(45deg, #3182ce 30%, #4299e1 90%)'
            : 'linear-gradient(45deg, #2c5282 30%, #2b6cb0 90%)'
        }}>
          <Toolbar>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              color="inherit" 
              onClick={() => setShowAbout(true)}
              sx={{
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              About
            </Button>
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              sx={{
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <Box sx={{ position: 'relative', mr: 2 }}>
              <input
                accept="image/*"
                type="file"
                id="profile-photo-upload"
                style={{ display: 'none' }}
                onChange={handleProfilePhotoUpload}
              />
              <label htmlFor="profile-photo-upload">
                <IconButton
                  component="span"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Avatar
                    src={profilePhoto || user?.photoURL || undefined}
                    alt={user?.email || 'User'}
                    sx={{
                      width: 40,
                      height: 40,
                      border: '2px solid white',
                      '&:hover': {
                        opacity: 0.8,
                      }
                    }}
                  />
                </IconButton>
              </label>
            </Box>
            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        
        {showAbout ? (
          <About onBack={() => setShowAbout(false)} />
        ) : (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <Box 
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider', 
                mb: 2,
                background: mode === 'light'
                  ? 'linear-gradient(45deg, #f7fafc 30%, #edf2f7 90%)'
                  : 'linear-gradient(45deg, #1a1a1a 30%, #2d2d2d 90%)',
                borderRadius: 2,
                p: 1
              }}
            >
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    fontSize: '1.1rem',
                    py: 2,
                    px: 3,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: mode === 'light' 
                        ? 'rgba(0, 0, 0, 0.04)'
                        : 'rgba(255, 255, 255, 0.04)',
                    },
                    '&.Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 'bold',
                    }
                  }
                }}
              >
                <Tab label="People" />
                <Tab label="Groups" />
                <Tab label="Feed" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <List sx={{ width: '100%' }}>
                {persons.map((person) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ListItem 
                      divider
                      button
                      onClick={() => {
                        setSelectedPerson(person)
                        setOpenAddToGroupDialog(true)
                      }}
                      sx={{ 
                        py: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(128, 0, 0, 0.04)',
                        }
                      }}
                    >
                      <Avatar
                        src={person.profilePictureUrl}
                        sx={{ 
                          mr: 3, 
                          width: 56, 
                          height: 56,
                          border: '2px solid',
                          borderColor: 'primary.light',
                          '&:hover': {
                            borderColor: 'primary.main',
                          }
                        }}
                      />
                      <ListItemText
                        primary={
                          <Typography variant="h6" component="div" color="primary">
                            {person.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body1" sx={{ display: 'block', mt: 1, color: 'text.primary' }}>
                              {person.role} at {person.organization}
                            </Typography>
                            {person.phoneNumber && (
                              <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <PhoneIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                {person.phoneNumber}
                              </Typography>
                            )}
                            {person.email && (
                              <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                {person.email}
                              </Typography>
                            )}
                            {person.linkedinUrl && (
                              <Typography 
                                component="a" 
                                href={person.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  mt: 0.5,
                                  textDecoration: 'none',
                                  '&:hover': {
                                    color: '#0077B5',
                                    textDecoration: 'underline',
                                  }
                                }}
                              >
                                <LinkedInIcon sx={{ fontSize: 16, mr: 0.5, color: '#0077B5' }} />
                                LinkedIn Profile
                              </Typography>
                            )}
                            <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                              Added: {new Date(person.dateAdded).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List sx={{ width: '100%' }}>
                {groups.map((group) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ListItem 
                      divider
                      button
                      onClick={() => {
                        setSelectedGroup(group)
                        setOpenGroupMembersDialog(true)
                      }}
                      sx={{ 
                        py: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(128, 0, 0, 0.04)',
                        }
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" component="div" color="primary">
                            {group.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body1" sx={{ display: 'block', mt: 1, color: 'text.primary' }}>
                              {group.description}
                            </Typography>
                            <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                              {group.personIds.length} members
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box 
                sx={{ 
                  mb: 4,
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenPostDialog(true)}
                  size="large"
                  sx={{ 
                    py: 1.5,
                    px: 4,
                    minWidth: '200px',
                    transition: 'all 0.2s ease-in-out',
                    background: mode === 'light'
                      ? 'linear-gradient(45deg, #3182ce 30%, #4299e1 90%)'
                      : 'linear-gradient(45deg, #2c5282 30%, #2b6cb0 90%)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                      background: mode === 'light'
                        ? 'linear-gradient(45deg, #4299e1 30%, #3182ce 90%)'
                        : 'linear-gradient(45deg, #2b6cb0 30%, #2c5282 90%)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    }
                  }}
                >
                  Create Post
                </Button>
              </Box>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PostCard
                    post={post}
                    currentUserId={user?.uid || ''}
                    onUpdate={loadData}
                  />
                </motion.div>
              ))}
            </TabPanel>
          </Container>
        )}

        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <Fab
            color="primary"
            sx={{ 
              width: 56,
              height: 56,
              transition: 'all 0.2s ease-in-out',
              background: mode === 'light'
                ? 'linear-gradient(45deg, #3182ce 30%, #4299e1 90%)'
                : 'linear-gradient(45deg, #2c5282 30%, #2b6cb0 90%)',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 3,
                background: mode === 'light'
                  ? 'linear-gradient(45deg, #4299e1 30%, #3182ce 90%)'
                  : 'linear-gradient(45deg, #2b6cb0 30%, #2c5282 90%)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              }
            }}
            onClick={() => {
              if (tabValue === 0) setOpenPersonDialog(true)
              else if (tabValue === 1) setOpenGroupDialog(true)
              else setOpenPostDialog(true)
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
        </Box>
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderContent()}

      <AddPersonDialog
        open={openPersonDialog}
        onClose={() => setOpenPersonDialog(false)}
        onAdd={handleAddPerson}
      />

      <AddGroupDialog
        open={openGroupDialog}
        onClose={() => setOpenGroupDialog(false)}
        onAdd={handleAddGroup}
      />

      {selectedGroup && (
        <GroupMembersDialog
          open={openGroupMembersDialog}
          onClose={() => {
            setOpenGroupMembersDialog(false)
            setSelectedGroup(null)
          }}
          group={selectedGroup}
          allPersons={persons}
          onUpdate={loadData}
        />
      )}

      {selectedPerson && (
        <AddToGroupDialog
          open={openAddToGroupDialog}
          onClose={() => {
            setOpenAddToGroupDialog(false)
            setSelectedPerson(null)
          }}
          groups={groups}
          personId={selectedPerson.id}
          onUpdate={loadData}
        />
      )}

      <AddPostDialog
        open={openPostDialog}
        onClose={() => setOpenPostDialog(false)}
        onAdd={handleAddPost}
      />
    </ThemeProvider>
  )
}

export default App
