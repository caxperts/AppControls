import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TabData } from "./Structures";

//Props being passed to this component
interface Props {
    tabData: TabData;
}
// We are using a basic material table here.
// This can be replaced with DataGrid for aditional features  https://mui.com/x/react-data-grid/
function TableComponent(props: Props) {
    return (
        <TableContainer component={Paper}>
            <Table>
                {/* Create the Table Header and specify the two columns (Key,Value) */}
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* We map each KeyValuePair to a single TableRow Just to make sure we dont have a react key collision we specify 
                    the AttributeKey and tabname as the uniquekey. This shouldnt be necesarry. Could be removed after testing*/}
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