import { Actions, execute } from "./AppControlActions";
import Button from '@mui/material/Button';

function AppControlActionButton(props: { action: Actions}) {
    return (
        <Button variant="contained" onClick={() => execute(props.action)} >{props.action}</Button >
    );
}

export default AppControlActionButton;
