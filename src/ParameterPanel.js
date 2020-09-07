import React, { useCallback } from "react";
import { useFormikContext, Field } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";

const ParameterPanel = () => {
  const {
    values,
    touched,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();
  const { outerShell } = values;
  const handleAndForce = useCallback(
    (value) => {
      handleChange(value);
      if (value > outerShell) {
        setFieldValue("outerShell", value + 1);
      }
    },
    [outerShell, handleChange, setFieldValue]
  );

  const clearPatterns = useCallback(() => {
    setFieldValue("patterns", []);
    setFieldTouched("patternSize", false);
  }, [setFieldValue, setFieldTouched]);

  return (
    <>
      <Row>
        <Col xs={6}>
          <Form.Label>Pattern size: {values.patternSize}</Form.Label>
          <Field
            as={Form.Control}
            name="patternSize"
            type="range"
            min={7}
            max={55}
            step={1}
          ></Field>
        </Col>
        <Col xs={6}>
          <Button
            size="sm"
            disabled={!touched.patternSize}
            onClick={clearPatterns}
          >
            Confirm change
          </Button>
        </Col>
      </Row>
      <Form.Text>
        Warning: confirm change will delete all existing pattern data
      </Form.Text>

      <Row>
        <Col xs={6}>
          <Form.Label>Inner shell: {values.innerShell}</Form.Label>
          <Field
            as={Form.Control}
            name="innerShell"
            type="range"
            min={0}
            max={Math.floor(values.patternSize / 2) - 1}
            step={1}
            onChange={handleAndForce}
          ></Field>
        </Col>
        <Col xs={6}>
          <Form.Label>Outer shell: {values.outerShell}</Form.Label>
          <Field
            as={Form.Control}
            name="outerShell"
            type="range"
            min={values.innerShell + 1}
            max={Math.floor(values.patternSize / 2)}
            step={1}
          ></Field>
        </Col>
      </Row>
    </>
  );
};

export default ParameterPanel;
