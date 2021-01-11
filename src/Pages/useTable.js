import React from "react";
import { Table } from "@material-ui/core";

export default function useTable(records, headcells) {
    const TblContainer = props => (
        <Table>
            {props.children}
        </Table>
    )

    const TblHead = props => {
        // return (<TableHead>
        //     <TableRow></TableRow>
        // </TableHead>)
    }
    return {
        TblContainer
    }
}