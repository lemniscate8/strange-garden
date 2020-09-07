import React, { useCallback } from "react";
import { useFormikContext, FieldArray, Field } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";
import { VersionsIcon } from "@primer/octicons-react";

import PatternField from "./PatternField";

const TemplatePanel = () => {
  const { values } = useFormikContext();
  const emptyPattern = useCallback(
    (name) => ({ name, type: "static", pixels: [], size: values.patternSize }),
    [values.patternSize]
  );

  return (
    <>
      <Row>
        <Col xs={6}>
          <Form.Label>Pen size: {values.penSize}</Form.Label>
          <Field
            as={Form.Control}
            name="penSize"
            type="range"
            min={1}
            max={20}
            step={0.5}
          ></Field>
        </Col>
        <Col xs={6}>
          <Form.Label>Opacity: {values.opacity}</Form.Label>
          <Field
            as={Form.Control}
            name="opacity"
            type="range"
            min={0}
            max={1}
            step={0.05}
          ></Field>
        </Col>
      </Row>
      <br />
      <Row>
        <FieldArray
          name="patterns"
          render={(arrayHelpers) => (
            <>
              {values.patterns.map((pattern, index) => (
                <PatternField
                  pattern={pattern}
                  key={index}
                  index={index}
                  remove={arrayHelpers.remove}
                />
              ))}
              <Col sm={12} md={6} lg={4}>
                <Button
                  size="sm"
                  onClick={() =>
                    arrayHelpers.push(
                      emptyPattern(
                        `Still-life #${
                          values.patterns.filter(
                            (pattern) => pattern.type === "static"
                          ).length + 1
                        }`
                      )
                    )
                  }
                >
                  <VersionsIcon />
                  <span> Add template</span>
                </Button>
              </Col>
            </>
          )}
        />
      </Row>
    </>
  );
};

export default TemplatePanel;
