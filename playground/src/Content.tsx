import { Alert, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Snackbar, SnackbarCloseReason, Toolbar } from "@mui/material";
import { Sample, configs } from "./samples"
import Editor from "./Editor";
import { useState } from "react";
import { Application } from "@caxperts/universal.api";

export default function Content() {

  const [currentSample, setCurrentSample] = useState<Sample>(configs[0])
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(true)

  const drawerWidth = 260;

  function onClose(_: any, reason: SnackbarCloseReason) {
    if(reason == "clickaway")
      return;
    
    setOpenSnackbar(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar >
          <Snackbar
            open={!Application.getInstance().available() && openSnackbar}
            onClose={onClose}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity="warning"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Not running inside AppControl. Please use the AppControls Feature inside UPV to display this website
            </Alert>
          </Snackbar>
          <Snackbar
            autoHideDuration={5000}
            open={Application.getInstance().available() && openSnackbar}
            onClose={onClose}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Detected UPV. You are good to start exploring
            </Alert>
          </Snackbar>
          AppControl Playground
        </Toolbar>
        <Divider />
        <List>
          {configs.map((sample, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={sample.name} onClick={() => setCurrentSample(sample)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Editor config={currentSample.configuration} />
      </Box>
    </Box>
  )
}

