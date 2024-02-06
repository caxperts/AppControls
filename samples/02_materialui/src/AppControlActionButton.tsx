import { Actions, execute } from "./AppControlActions";
import Button from '@mui/material/Button';

function AppControlActionButton(props: { action: Actions }) {
    return (
        <>
            {/* MUI Button that gets its name from the action and excecutes execute function from AppControlActions.ts if clicked*/}
            <Button variant="contained" onClick={() => execute(props.action)} >{props.action}</Button >
        </>
    );
}

export default AppControlActionButton;
