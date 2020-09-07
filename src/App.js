import React from "react";
import { Formik, Form } from "formik";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ImageIcon,
  GlobeIcon,
  BeakerIcon,
  GraphIcon,
} from "@primer/octicons-react";

import ParameterPanel from "./ParameterPanel";
import TemplatePanel from "./TemplatePanel";

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
        computed: {
          inner: [],
          outer: [],
          target: [],
          actual: [],
          errorI: [],
          errorO: [],
        },
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
            <Col
              sm={{ span: 6, order: 2 }}
              md={{ span: 5, order: 2 }}
              lg={{ span: 4, order: 2 }}
            >
              <h3>
                Main Parameters
                <div style={{ float: "right" }}>
                  <GlobeIcon size="medium" />
                </div>
              </h3>
              <ParameterPanel />
            </Col>
            <hr />
            <Col>
              <h3>
                Pattern Builder
                <div style={{ float: "right" }}>
                  <ImageIcon size="medium" />
                </div>
              </h3>
              <TemplatePanel />
            </Col>
          </Row>

          <br />
          <Row>
            <Col sm={3} lg={4}>
              <Button size="sm">
                <ArrowDownIcon /> Aggregate
              </Button>
            </Col>

            <Col sm={3} lg={4}>
              <Button size="sm" style={{ float: "right" }}>
                <ArrowUpIcon /> Stabilize
              </Button>
            </Col>
          </Row>
          <br />

          <Row>
            <Col sm={6}>
              <h3>
                Rule Generation
                <div style={{ float: "right" }}>
                  <GraphIcon size="medium" />
                </div>
              </h3>
            </Col>
            <Col>
              <h3>
                Simulation
                <div style={{ float: "right" }}>
                  <BeakerIcon size="medium" />
                </div>
              </h3>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  </Container>
);

export default App;
