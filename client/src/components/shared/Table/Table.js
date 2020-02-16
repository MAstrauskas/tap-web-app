import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {
  MdEdit as EditIcon,
  MdDeleteForever as DeleteIcon
} from "react-icons/md";
import TablePaginationActions from "./TablePaginationActions";
import Theme from "../Theme/Theme";
import Checkbox from "../Checkbox";

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

export default function TaskTable({
  tasks,
  title,
  headers,
  isTaskDescription,
  isEdit,
  isDelete,
  handleComplete,
  handleDelete
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);

  const handleTablePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleTablePerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <Typography
        style={{
          flex: "1 1 100%",
          backgroundColor: `${Theme.colors.first}`,
          color: `${Theme.colors.white}`,
          paddingLeft: `1.25rem`
        }}
        variant="h6"
        id={`${title}`}
      >
        {title}
      </Typography>
      <TableContainer>
        <Table aria-label={`${title} table`}>
          <TableHead>
            <TableRow>
              <CustomTableCell></CustomTableCell>
              {headers.map(header => (
                <CustomTableCell align={header === "Task" ? "left" : "right"}>
                  {header}
                </CustomTableCell>
              ))}
              {isEdit === true && (
                <CustomTableCell align="right">Edit</CustomTableCell>
              )}
              {isDelete === true && (
                <CustomTableCell align="right">Delete</CustomTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tasks.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tasks
            ).map(task => {
              const dueDate = moment(task.taskDueDate).format("LL");

              return (
                <CustomTableRow key={task._id}>
                  <CustomTableCell component="th" scope="row">
                    <Checkbox id={task._id} handleComplete={handleComplete} />
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {task.taskName}
                  </CustomTableCell>
                  {isTaskDescription === true && (
                    <CustomTableCell align="right">
                      {task.taskDescription}
                    </CustomTableCell>
                  )}

                  <CustomTableCell align="right">{dueDate}</CustomTableCell>
                  <CustomTableCell align="right">
                    {task.taskPriority}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {task.taskDifficulty}
                  </CustomTableCell>
                  {isEdit === true && (
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
                  )}
                  {isDelete === true && (
                    <CustomTableCell align="right">
                      <TableButton onClick={() => handleDelete(task._id)}>
                        <DeleteIcon />
                      </TableButton>
                    </CustomTableCell>
                  )}
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
                count={tasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onChangePage={handleTablePageChange}
                onChangeRowsPerPage={handleTablePerPageChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
