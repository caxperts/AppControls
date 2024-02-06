import CssBaseline from '@mui/material/CssBaseline';
import { themeOptions } from './Theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Content from './Content';


function App() {
  // create a theme based on the themeOptions provided. themeOptions will move in the Universal.Api in a futur version
  const darkTheme = createTheme(themeOptions);
  return (
    <>
      {/* Set the Theme and add the CSSBaseline to add fulll MUI support */}
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* The main content of my AppControl */}
        <Content />

      </ThemeProvider>
    </>
  );
}

export default App;
