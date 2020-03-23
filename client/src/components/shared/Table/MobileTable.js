import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import ScheduleIcon from "@material-ui/icons/Schedule";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import SignalCellular1BarIcon from "@material-ui/icons/SignalCellular1Bar";
import SignalCellular2BarIcon from "@material-ui/icons/SignalCellular2Bar";
import SignalCellular4BarIcon from "@material-ui/icons/SignalCellular4Bar";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import TablePaginationActions from "./TablePaginationActions";

import Theme from "../Theme/Theme";
import Checkbox from "../Checkbox";

const CustomPaper = withStyles(theme => ({
  root: {
    width: "21rem"
  }
}))(Paper);

const CustomTableContainer = withStyles(theme => ({
  root: {
    overflowX: "hidden"
  }
}))(TableContainer);

const CustomTableCell = withStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    borderBottom: "none"
  }
}))(TableCell);

const CustomTableCellDueDate = withStyles(theme => ({
  root: {
    borderBottom: "none"
  }
}))(TableCell);

const CustomTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: `${Theme.colors.second}`
    }
  }
}))(TableRow);

export default function MobileTable({
  tasks,
  title,
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
    <CustomPaper
      style={{
        maxWidth: "22rem",
        marginBottom: marginBottom
      }}
    >
      <Typography
        style={{
          flex: "1 1 100%",
          backgroundColor: `${Theme.colors.first}`,
          color: `${Theme.colors.white}`,
          paddingLeft: `1.25rem`,
          paddingTop: "1rem",
          paddingBottom: "1rem"
        }}
        variant="h6"
        id={`${title}`}
      >
        {title}
      </Typography>
      <CustomTableContainer>
        <Table
          aria-label={`${title} table`}
          data-testid={`${title} mobile table`}
        >
          {tasks.length === 0 ? (
            <Fade in={true}>
              <TableBody>
                <CustomTableRow>
                  <CustomTableCell
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

                const taskPriority = task.taskPriority;
                const taskDifficulty = task.taskDifficulty;

                return (
                  <Fade in={true}>
                    <CustomTableRow key={task._id}>
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`${title}`}
                          id={`${title}`}
                          style={{
                            padding: 0
                          }}
                        >
                          <CustomTableCell
                            component="th"
                            scope="row"
                            style={{ padding: "12px 0" }}
                          >
                            <Checkbox
                              id={task._id}
                              handleComplete={handleComplete}
                              isTaskSuggested={task.isTaskSuggested}
                              token={token}
                            />
                          </CustomTableCell>
                          <CustomTableCell
                            component="th"
                            scope="row"
                            style={{
                              padding: "12px 0"
                            }}
                          >
                            <Typography style={{ width: "10rem" }}>
                              {task.taskName}
                            </Typography>
                          </CustomTableCell>
                          <CustomTableCell
                            component="th"
                            scope="row"
                            style={{ marginLeft: "5%" }}
                          >
                            {taskPriority === "Low" && (
                              <Tooltip title="Priority Low">
                                <ArrowUpwardIcon
                                  style={{ fill: `${Theme.colors.low}` }}
                                />
                              </Tooltip>
                            )}
                            {taskPriority === "Medium" && (
                              <Tooltip title="Priority Medium">
                                <ArrowUpwardIcon
                                  style={{
                                    fill: `${Theme.colors.medium}`
                                  }}
                                />
                              </Tooltip>
                            )}
                            {taskPriority === "High" && (
                              <Tooltip title="Priority High">
                                <ArrowUpwardIcon
                                  style={{ fill: `${Theme.colors.high}` }}
                                />
                              </Tooltip>
                            )}
                          </CustomTableCell>
                          <CustomTableCell
                            component="th"
                            scope="row"
                            style={{ padding: "0 0" }}
                          >
                            {taskDifficulty === "Easy" && (
                              <Tooltip title="Difficulty Easy">
                                <SignalCellular1BarIcon
                                  style={{ fill: `${Theme.colors.low}` }}
                                />
                              </Tooltip>
                            )}
                            {taskDifficulty === "Medium" && (
                              <Tooltip title="Difficulty Medium">
                                <SignalCellular2BarIcon
                                  style={{ fill: `${Theme.colors.medium}` }}
                                />
                              </Tooltip>
                            )}
                            {taskDifficulty === "Hard" && (
                              <Tooltip title="Difficulty Hard">
                                <SignalCellular4BarIcon
                                  style={{ fill: `${Theme.colors.high}` }}
                                />
                              </Tooltip>
                            )}
                          </CustomTableCell>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            padding: 0,
                            backgroundColor: `${Theme.colors.second}`,
                            border: `1px solid ${Theme.colors.third}`,
                            "&:nth-child(1)": {
                              justifyContent: "flex-end"
                            }
                          }}
                        >
                          <CustomTableCellDueDate
                            align="right"
                            style={
                              (dueDate < currentDate
                                ? { color: `${Theme.colors.first}` }
                                : { color: `${Theme.colors.black}` },
                              {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                              })
                            }
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start"
                              }}
                            >
                              <ScheduleIcon />
                              <Typography
                                variant="p"
                                component="p"
                                style={{
                                  paddingLeft: "4px",
                                  paddingTop: "3px"
                                }}
                              >
                                {formattedDueDate}
                              </Typography>
                            </div>
                          </CustomTableCellDueDate>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              justifySelf: "flex-end",
                              paddingLeft: "15%"
                            }}
                          >
                            {isEdit === true && (
                              <CustomTableCell style={{ padding: 0 }}>
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
                              <CustomTableCell style={{ padding: 0 }}>
                                <IconButton
                                  onClick={() =>
                                    handleWarningClick(task._id, task.taskName)
                                  }
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </CustomTableCell>
                            )}
                          </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
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

          <TableFooter>
            <TableRow style={{ textAlign: "right" }}>
              <TablePagination
                rowsPerPageOptions={5}
                labelRowsPerPage=""
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
      </CustomTableContainer>
    </CustomPaper>
  );
}
