import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TabData } from "./Structures";

interface Props {
    tabData: TabData;
}

//Can be replaced with DataGrid for aditional features  https://mui.com/x/react-data-grid/
function TableComponent(props: Props) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tabData.data.map((row) => (
                        <TableRow key={row.key + props.tabData.name} >
                            <TableCell> {row.key} </TableCell>
                            <TableCell> {row.value} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent