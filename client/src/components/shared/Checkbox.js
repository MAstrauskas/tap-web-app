import React, { Component } from "react";
import axios from "axios";
import styled from "@emotion/styled";

import Theme from "../shared/Theme/Theme";

const CustomCheckbox = styled.input`
  opacity: 0;
`;

const StyledCheckbox = styled.span`
  position: absolute;
  cursor: pointer;
  margin-left: -17px;
  margin-top: 2px;
  height: 12px;
  width: 12px;
  background-color: white;
  border-radius: 5px;
  border: 2px solid ${Theme.colors.primary};
`;

export default class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
  }
  state = {
    editSuccessful: false
  };

  handleEdit = async () => {
    try {
      const taskUpdateDate = Date.now();
      const body = {
        id: this.props.id,
        taskUpdateDate: taskUpdateDate
      };

      await axios
        .patch(`http://localhost:9000/api/tasks/completed/add/`, body)
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );

      this.setState(prevState => ({
        ...prevState,
        editSuccessful: true
      }));
      console.log(this.props);
      this.props.handleComplete();
    } catch (e) {
      console.log(e);

      this.setState(prevState => ({
        ...prevState,
        editSuccessful: false
      }));
    }
  };

  render() {
    return (
      <>
        <CustomCheckbox type="checkbox" />
        <StyledCheckbox
          data-testid="Checkbox"
          onClick={this.handleEdit}
        ></StyledCheckbox>
      </>
    );
  }
}
