import React, { Component } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import moment from "moment";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import {
  MdEdit as EditIcon,
  MdDeleteForever as DeleteIcon
} from "react-icons/md";

import Theme from "../../shared/Theme/Theme";
import Checkbox from "../../shared/Checkbox";

const TableButton = styled.button`
  border: 0px;
  background: transparent;
  transition: color 0.3s ease;
  cursor: pointer;

  :hover {
    color: ${Theme.colors.activeLink};
  }

  svg {
    width: 17px;
    height: 17px;
  }
`;

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const CustomTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: `${Theme.colors.second}`
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default class AllTasks extends Component {
  state = {
    isFetching: false,
    tasks: [],
    page: 0,
    rowsPerPage: 5
  };

  /* istanbul ignore next */
  handleTasks = async () => {
    this.setState({ ...this.state, isFetching: true });

    await axios
      .get(`http://localhost:9000/api/tasks/${this.props.userEmail}`)
      .then(res => {
        this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
      });

    this.setState({ ...this.state, isFetching: false });
  };

  /* istanbul ignore next */
  handleDelete = async taskId => {
    await axios.delete(`http://localhost:9000/api/tasks/delete/${taskId}`).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

    this.setState({ tasks: [] });

    await axios.get("http://localhost:9000/api/tasks").then(res => {
      this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
    });
  };

  /* istanbul ignore next */
  handleComplete = async () => {
    this.setState({ tasks: [] });

    await axios.get("http://localhost:9000/api/tasks").then(res => {
      this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
    });
  };

  handleTablePageChange = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleTablePerPageChange = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  componentDidMount() {
    this.handleTasks();
  }

  render() {
    const { tasks, page, rowsPerPage } = this.state;

    // Sort by date and not include finished tasks
    const filteredTasks = tasks
      .sort((a, b) => {
        const dueDate = moment(a.taskDueDate).format("LL");
        const dueDate2 = moment(b.taskDueDate).format("LL");

        if (dueDate > dueDate2) return 1;
        else return -1;
      })
      .filter(task => !task.isTaskComplete);

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, filteredTasks.length - page * rowsPerPage);

    return (
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 500 }} aria-label="all tasks table">
          <TableHead>
            <TableRow>
              <CustomTableCell>Task</CustomTableCell>
              <CustomTableCell align="right">Description</CustomTableCell>
              <CustomTableCell align="right">Due Date</CustomTableCell>
              <CustomTableCell align="right">Priority</CustomTableCell>
              <CustomTableCell align="right">Difficulty</CustomTableCell>
              <CustomTableCell align="right">Edit</CustomTableCell>
              <CustomTableCell align="right">Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredTasks.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredTasks
            ).map(task => {
              const dueDate = moment(task.taskDueDate).format("LL");

              return (
                <CustomTableRow key={task._id}>
                  <CustomTableCell component="th" scope="row">
                    <Checkbox
                      id={task._id}
                      handleComplete={this.handleComplete}
                    />
                    {task.taskName}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {task.taskDescription}
                  </CustomTableCell>
                  <CustomTableCell align="right">{dueDate}</CustomTableCell>
                  <CustomTableCell align="right">
                    {task.taskPriority}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {task.taskDifficulty}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    <Link
                      to={{
                        pathname: "/tasks/edit",
                        state: {
                          task: task
                        }
                      }}
                    >
                      <TableButton>
                        <EditIcon />
                      </TableButton>
                    </Link>
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    <TableButton onClick={() => this.handleDelete(task._id)}>
                      <DeleteIcon />
                    </TableButton>
                  </CustomTableCell>
                </CustomTableRow>
              );
            })}

            {emptyRows > 0 && (
              <CustomTableRow style={{ height: 53 * emptyRows }}>
                <CustomTableCell colSpan={12} />
              </CustomTableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow style={{ textAlign: "right" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                colSpan={12}
                count={filteredTasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onChangePage={this.handleTablePageChange}
                onChangeRowsPerPage={this.handleTablePerPageChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
}
