import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
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
import IconButton from "@material-ui/core/IconButton";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import TablePaginationActions from "./TablePaginationActions";

import Theme from "../Theme/Theme";
import Checkbox from "../Checkbox";

const CustomPaper = withStyles(theme => ({
  root: {
    minWidth: "10rem"
  }
}))(Paper);

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
  isTaskDifficulty,
  isEdit,
  isDelete,
  handleComplete,
  handleWarningClick,
  marginBottom
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const mobileView = useMediaQuery("(max-width: 600px)");
  const tabletView = useMediaQuery("(max-width: 800px)");
  let tableMaxWidth = "100%";

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);

  const handleTablePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleTablePerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (tabletView) tableMaxWidth = "30rem";
  if (mobileView) tableMaxWidth = "20rem";

  return (
    <CustomPaper
      style={{ maxWidth: `${tableMaxWidth}`, marginBottom: marginBottom }}
    >
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
                <CustomTableCell align="left">{header}</CustomTableCell>
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
                <Fade in="true">
                  <CustomTableRow key={task._id}>
                    <CustomTableCell component="th" scope="row">
                      <Checkbox
                        id={task._id}
                        handleComplete={handleComplete}
                        isTaskSuggested={task.isTaskSuggested}
                      />
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {task.taskName}
                    </CustomTableCell>
                    {isTaskDescription === true && (
                      <CustomTableCell align="right">
                        {task.taskDescription.length > 0 && (
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={
                                task.taskDescription.length > 30 && (
                                  <ExpandMoreIcon />
                                )
                              }
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              {task.taskDescription.length <= 30
                                ? task.taskDescription.substring(0, 30)
                                : task.taskDescription.substring(0, 30) + " - "}
                            </ExpansionPanelSummary>
                            {task.taskDescription.length > 30 && (
                              <ExpansionPanelDetails
                                align="left"
                                style={{
                                  maxWidth: "16rem",
                                  minWidth: "5rem"
                                }}
                              >
                                <Typography
                                  style={{
                                    fontSize: "14px"
                                  }}
                                >
                                  {task.taskDescription.substring(30)}
                                </Typography>
                              </ExpansionPanelDetails>
                            )}
                          </ExpansionPanel>
                        )}
                      </CustomTableCell>
                    )}

                    <CustomTableCell align="right">{dueDate}</CustomTableCell>
                    <CustomTableCell align="right">
                      {task.taskPriority}
                    </CustomTableCell>
                    {isTaskDifficulty === true && (
                      <CustomTableCell align="right">
                        {task.taskDifficulty}
                      </CustomTableCell>
                    )}

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
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </CustomTableCell>
                    )}
                    {isDelete === true && (
                      <CustomTableCell align="right">
                        <IconButton
                          onClick={() =>
                            handleWarningClick(task._id, task.taskName)
                          }
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </CustomTableCell>
                    )}
                  </CustomTableRow>
                </Fade>
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
    </CustomPaper>
  );
}
