import AppControlActionButton from './AppControlActionButton';
import { Actions } from './AppControlActions';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';


function Content() {
    return (
        <>
            {/* Define a stack to place the Header and buttons underneath each other */}
            <Stack spacing={2} direction="column">
                {/* Center the header. This is possible with multiple ways but this is an easy variant */}
                <Typography align='center' variant='h4'>
                    AppControl Button Template
                </Typography>
                {/* Stack inside the stack that contains all buttons. They are centered in side the stack */}
                <Stack spacing={2} direction="row" alignSelf={'center'}>
                    {/* Multiple Buttons that excuted custom actions */}
                    <AppControlActionButton action={Actions.OpenUrl}></AppControlActionButton>
                    <AppControlActionButton action={Actions.HideSteel}></AppControlActionButton>
                    <AppControlActionButton action={Actions.Reset}></AppControlActionButton>
                    <AppControlActionButton action={Actions.EricTest}></AppControlActionButton>
                </Stack>
            </Stack>
        </>
    );
}

export default Content;
