import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";

const rows = [
    { id: 'avatar', numeric: false, label: 'Avatar' },
    { id: 'edit', numeric: false, label: '' },
    { id: 'delete', numeric: false, label: '' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'sex', numeric: false, disablePadding: false, label: 'Gender' },
    { id: 'cell', numeric: false, disablePadding: false, label: 'Cell' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'manager', numeric: false, disablePadding: false, label: 'manager' },
    { id: 'dr', numeric: false, disablePadding: false, label: 'DR' },

];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        if (row.id === "name" || row.id === "title") {
                            return (
                                <TableCell
                                    key={row.id}
                                    numeric={row.numeric}
                                    padding={row.disablePadding ? 'none' : 'default'}
                                    sortDirection={order}
                                >
                                    <Tooltip
                                        title="Sort"
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                            );
                        } else {
                            return <TableCell key={row.id}>{row.label}</TableCell>
                        }

                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;