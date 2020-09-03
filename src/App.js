import React from "react";
import { Formik, Form } from "formik";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  GitBranchIcon,
  GitPullRequestIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@primer/octicons-react";

import ParameterPanel from "./ParameterPanel";

const App = () => (
  <Container fluid>
    <Formik
      initialValues={{
        patternSize: 30,
        penSize: 5,
        opacity: 0.5,
        innerShell: 10,
        outerShell: 15,
        patterns: [],
        datapoints: [],
      }}
      validate={(values) => {}}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form>
          <h1>Strange Garden</h1>
          <p>
            An experiment in extrapolating rulesets for continuous cellular
            automata from high level user-defined patterns such as still-lifes,
            gliders, and rotators.
          </p>
          <Row>
            <Col sm={{ span: 6, order: 2 }} lg={{ span: 4, order: 2 }}>
              <ParameterPanel />
            </Col>
            <Col>
              <h3>Structure Templates</h3>
            </Col>
          </Row>

          <br />
          <Row>
            <Col sm={3} lg={4}>
              <Button>
                <ArrowDownIcon />
                <GitBranchIcon /> Aggregate
              </Button>
            </Col>
            <Col sm={3} lg={4}>
              <Button>
                <ArrowUpIcon />
                <GitPullRequestIcon /> Ameliorate
              </Button>
            </Col>
          </Row>
          <br />

          <Row>
            <Col sm={6}>
              <h3>Rule Set</h3>
            </Col>
            <Col>
              <h3>Simulation</h3>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  </Container>
);

export default App;
