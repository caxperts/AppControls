import { useEffect, useRef } from "react";
import { Application } from "@caxperts/universal.api/Application";
import { Box, Button, Stack, TextField } from "@mui/material";
import {signal} from "@preact/signals-react"

interface CustomAttribute {
    key: string
    value: string
}

function CustomAttributePanel() {

    let attributes = signal<{ [string: string]: string }>({});
    let selectedElement = signal<string | null>(null);

    let refInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        Application.getInstance().Events.registerSelectionChangedEvent((e) => {
            if(e.Objects.length >= 1)
                selectedElement.value = e.Objects[0];
            else 
                selectedElement.value = null;
        });
        Application.getInstance().Events.registerIntellipidSelectionChangedEvent((e) => {
            if(e.Objects.length >= 1)
                selectedElement.value = e.Objects[0];
            else 
                selectedElement.value = null;
        });
    }, [])

    function handleChange() {
        if(selectedElement.value == null)
            return;
        attributes.value[selectedElement.value as string] = refInput.current?.value ?? "";
        refInput.current!.value = "";
    }

    return (
        <Box sx={{ p: 2, border: '1px dashed grey' }}>
            <h4>Custom Attributes</h4>
            <p>Selected element {selectedElement.value == null ? "nothing" : selectedElement.value}</p>
            <p>Current value {attributes.value[selectedElement.value??""]}</p>
            <Stack spacing={1}>
                <TextField inputRef={refInput} id="filled-basic" label="Filled" variant="filled" />
                <Button variant="contained" onClick={handleChange} >Set</Button >
            </Stack>
        </Box>
    );
}

export default CustomAttributePanel;
