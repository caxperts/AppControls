import CssBaseline from '@mui/material/CssBaseline';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import Content from './Content';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Theme } from '@caxperts/universal.api'


function App() {

  const [themeData, setThemeData] = useState<ThemeOptions | null>(null);

  useEffect(() => {
    async function load() {
      setThemeData(createTheme(await Theme.getTheme()))
    }
    load();
  }, [])


  return (
    <>
      {themeData == null ? (
        <CircularProgress />
      ) : (
          < ThemeProvider theme={themeData}>
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
