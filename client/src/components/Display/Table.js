import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './TableHead';
import Button from "@material-ui/core/Button/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ProfileIcon from './UI/ProfileIcon';
import Avatar from "./Avatar";
import Link from "react-router-dom/es/Link";

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1620,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'name'
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    };

    render() {
        const { classes } = this.props;
        const { order, orderBy} = this.state;
        const {useSearchData, searchWord} = this.props.search;
        const data = useSearchData ? this.props.employees.data.filter(el => el.name === searchWord) : this.props.employees.data;
        return (
            <div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(data, getSorting(order, orderBy))
                                    .map(n => {
                                        const linkUrl = `/managers/${n._id}`;
                                        console.log(n.manager);
                                        const managerUrl = (n.manager === undefined || n.manager === "" || n.manager === "None") ? "" : `/employees/${n.manager.id}`;
                                        const callLink = `tel:${n.cell}`;
                                        const emailLink = `mailto:${n.email}`;
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={n._id}
                                            >
                                                <TableCell>
                                                    <Avatar avatar={n.avatar} gender={n.gender}/>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" className={classes.button} onClick={() => this.props.profileHandler(n)}>
                                                        <ProfileIcon />
                                                        Profile
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" className={classes.button} onClick={() => this.props.deleteHandler(n._id)}>
                                                        <DeleteIcon />
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {n.name}
                                                </TableCell>
                                                <TableCell>{n.title}</TableCell>
                                                <TableCell>{n.gender}</TableCell>
                                                <TableCell>
                                                    {
                                                        n.cell === "" ? "" : <a href={callLink}>{n.cell}</a>
                                                    }
                                                    </TableCell>
                                                <TableCell>
                                                    {
                                                        n.email === "" ? "" : <a href={emailLink}>{n.email}</a>
                                                    }
                                                </TableCell>
                                                <TableCell>{(n.manager === undefined || n.manager === "" || n.manager === "None") ? "" : <Link to={managerUrl}>{n.manager.name}</Link>}</TableCell>
                                                <TableCell>
                                                    <Link to={linkUrl}>{n.direct_reports === undefined ? 0 : n.direct_reports.length}</Link>
                                                    </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
