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
import Button from "@material-ui/core/Button";

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
  marginBottom,
  isSuggestedTable,
  allTasks,
  token
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const mobileView = useMediaQuery("(max-width: 600px)");
  const tabletView = useMediaQuery("(max-width: 800px)");
  const desktopView = useMediaQuery("(min-width: 801px)");
  const largeDesktopView = useMediaQuery("(min-width: 1201px)");
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

  let maxColumnCount = headers.length;

  if (isTaskDifficulty) maxColumnCount++;
  if (!isTaskDescription) maxColumnCount++;
  if (isEdit) maxColumnCount++;
  if (isDelete) maxColumnCount++;

  if (tabletView) tableMaxWidth = "30rem";
  if (desktopView) tableMaxWidth = "50rem";
  if (largeDesktopView) tableMaxWidth = "60rem";
  if (mobileView) tableMaxWidth = "20rem";

  return (
    <CustomPaper
      style={{
        maxWidth: `${tableMaxWidth}`,
        marginBottom: marginBottom
      }}
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

          {tasks.length === 0 ? (
            <Fade in={true}>
              <TableBody>
                <CustomTableRow>
                  <CustomTableCell
                    colSpan={`${maxColumnCount}`}
                    style={{
                      textAlign: "center",
                      paddingTop: "4rem",
                      paddingBottom: "4rem"
                    }}
                  >
                    <Typography
                      style={{
                        color: `${Theme.colors.gray}`,
                        paddingBottom: "1rem"
                      }}
                    >
                      {isSuggestedTable && allTasks.length > 0
                        ? "Add your current mood and we will show you what to do!"
                        : "There're no tasks to show..."}
                    </Typography>
                    <Link
                      to={
                        isSuggestedTable && allTasks.length > 0
                          ? "/tasks/moodist"
                          : "/tasks/add"
                      }
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          backgroundColor: `${Theme.colors.first}`,
                          color: `${Theme.colors.white}`,
                          "&:hover": {
                            backgroundColor: `${Theme.colors.fourth}`
                          }
                        }}
                      >
                        {isSuggestedTable && allTasks.length > 0
                          ? "Add a mood"
                          : "Add a task"}
                      </Button>
                    </Link>
                  </CustomTableCell>
                </CustomTableRow>
              </TableBody>
            </Fade>
          ) : (
            <TableBody>
              {(rowsPerPage > 0
                ? tasks.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tasks
              ).map(task => {
                const date = new Date();
                const currentDate = moment(date).format("YYYY-MM-DD");
                const dueDate = moment(task.taskDueDate).format("YYYY-MM-DD");
                const formattedDueDate = moment(dueDate).format("LL");

                return (
                  <Fade in={true}>
                    <CustomTableRow key={task._id}>
                      <CustomTableCell component="th" scope="row">
                        <Checkbox
                          id={task._id}
                          handleComplete={handleComplete}
                          isTaskSuggested={task.isTaskSuggested}
                          token={token}
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
                                  task.taskDescription.length > 16 && (
                                    <ExpandMoreIcon />
                                  )
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                {task.taskDescription.length <= 20
                                  ? task.taskDescription.substring(0, 20)
                                  : task.taskDescription.substring(0, 20) +
                                    " - "}
                              </ExpansionPanelSummary>
                              {task.taskDescription.length > 20 && (
                                <ExpansionPanelDetails
                                  align="left"
                                  style={{
                                    maxWidth: "16rem",
                                    minWidth: "5rem",
                                    wordBreak: "break-all"
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "14px"
                                    }}
                                  >
                                    {task.taskDescription.substring(20)}
                                  </Typography>
                                </ExpansionPanelDetails>
                              )}
                            </ExpansionPanel>
                          )}
                        </CustomTableCell>
                      )}

                      <CustomTableCell
                        align="right"
                        style={
                          dueDate < currentDate
                            ? { color: `${Theme.colors.first}` }
                            : { color: `${Theme.colors.black}` }
                        }
                      >
                        {formattedDueDate}
                      </CustomTableCell>
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
          )}

          {tasks.length > 0 && (
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
          )}
        </Table>
      </TableContainer>
    </CustomPaper>
  );
}
