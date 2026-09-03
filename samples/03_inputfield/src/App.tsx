import CssBaseline from '@mui/material/CssBaseline';
import { Theme as MuiTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Content from './Content';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Theme } from '@caxperts/universal.api'


function App() {

  const [theme, setTheme] = useState<MuiTheme | null>(null);

  useEffect(() => {
    function applyTheme(theme: any) {
      setTheme(createTheme(theme));
    }
    Theme.getTheme(applyTheme).then(applyTheme);
  }, []);


  return (
    <>
      {theme == null ? (
        <CircularProgress />
      ) : (
          < ThemeProvider theme={theme}>
            {/* Set the Theme and add the CSSBaseline to add full MUI support */}
            <CssBaseline />
            {/* The main content of my AppControl */}
            <Content />

          </ThemeProvider >
        )

      }
    </>
  );
}

export default App;
