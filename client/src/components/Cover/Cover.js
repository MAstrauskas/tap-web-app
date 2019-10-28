import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import Theme from "../shared/Theme/Theme";
import Button from "../shared/Button";

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 15% auto;

  @media screen and (max-width: 1000px) {
    h1 {
      font-size: ${Theme.fontSize.xlarge};
    }

    span {
      margin: auto 20%;
      margin-bottom: 30px;
    }
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: ${Theme.fontSize.large};
      margin: auto;
    }

    span {
      font-size: ${Theme.fontSize.small};
      margin: auto 10%;
      margin-bottom: 30px;
    }
  }

  @media screen and (max-width: 500px) {
    h1 {
      font-size: ${Theme.fontSize.medium};
      margin-top: 25%;
      margin-bottom: 10%;
    }

    span {
      font-size: ${Theme.fontSize.xsmall};
    }
  }

  @media screen and (max-width: 370px) {
    h1 {
      font-size: ${Theme.fontSize.small};
    }
  }
`;

const Title = styled.h1`
  font-size: ${Theme.fontSize.xxlarge};
`;

const SubTitle = styled.span`
  margin: auto 30%;
  margin-bottom: 30px;
  text-align: center;
  font-size: ${Theme.fontSize.medium};
`;

const Cover = () => {
  return (
    <Content>
      <Title data-testid="cover-title">Task Activity Planner</Title>
      <SubTitle data-testid="cover-subtitle">
        A new way of task management - based on your emotions
      </SubTitle>
      <Link to="/home">
        <Button title="Enter" />
      </Link>
    </Content>
  );
};

export default Cover;
