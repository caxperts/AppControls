import './App.css';
import AppControlActionButton from './AppControlActionButton';
import { Actions } from './AppControlActions';
import CustomAttributePanel from './CustomAttributePanel';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import { themeOptions } from './Theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
  const darkTheme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <>
        <div className="App">
          <header className="App-header">
            <Stack spacing={2} direction="column">
              <p>React Material Sample</p>
              <Stack spacing={2} direction="row" alignSelf={'center'}>
                <AppControlActionButton action={Actions.OpenUrl}></AppControlActionButton>
                <AppControlActionButton action={Actions.HideSteel}></AppControlActionButton>
                <AppControlActionButton action={Actions.Reset}></AppControlActionButton>
                <AppControlActionButton action={Actions.EricTest}></AppControlActionButton>
              </Stack>
              <CustomAttributePanel></CustomAttributePanel>
            </Stack>
          </header>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
