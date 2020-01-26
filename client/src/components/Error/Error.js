import React from "react";
import Layout from "../Layout/Layout";
import styled from "@emotion/styled";
import Theme from "../shared/Theme/Theme";

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

const Title = styled.h1``;

const SubTitle = styled.span`
  margin: auto 30%;
  margin-bottom: 30px;
  text-align: center;
  font-size: ${Theme.fontSize.small};
`;

const Error = ({ errCode }) => {
  return (
    <div>
      <Layout>
        <Content>
          {errCode == "401" ? (
            <>
              <Title>401 - Unauthorized</Title>
              <SubTitle>
                Make sure that you have access to the app by login/register
              </SubTitle>
            </>
          ) : (
            <>
              <Title>404 - page not found</Title>
              <SubTitle>
                Make sure that you have access to the app by login/register
              </SubTitle>
            </>
          )}
        </Content>
      </Layout>
    </div>
  );
};

export default Error;
