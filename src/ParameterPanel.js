import React, { useCallback } from "react";
import { useFormikContext, Field } from "formik";
import { Row, Col, Form as BootForm, Button } from "react-bootstrap";

const ParameterPanel = () => {
  const { values, touched, handleChange, setFieldValue } = useFormikContext();
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
  }, [setFieldValue]);

  return (
    <>
      <h3>Meta-Parameters</h3>
      <Row>
        <Col xs={6}>
          <BootForm.Label>Pattern size: {values.patternSize}</BootForm.Label>
          <Field
            as={BootForm.Control}
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
      <BootForm.Text>
        Warning: confirm change will delete all existing pattern data
      </BootForm.Text>
      <Row>
        <Col xs={6}>
          <BootForm.Label>Pen size: {values.penSize}</BootForm.Label>
          <Field
            as={BootForm.Control}
            name="penSize"
            type="range"
            min={1}
            max={20}
            step={0.5}
          ></Field>
        </Col>
        <Col xs={6}>
          <BootForm.Label>Opacity: {values.opacity}</BootForm.Label>
          <Field
            as={BootForm.Control}
            name="opacity"
            type="range"
            min={0}
            max={1}
            step={0.05}
          ></Field>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <BootForm.Label>Inner shell: {values.innerShell}</BootForm.Label>
          <Field
            as={BootForm.Control}
            name="innerShell"
            type="range"
            min={0}
            max={Math.floor(values.patternSize / 2) - 1}
            step={1}
            onChange={handleAndForce}
          ></Field>
        </Col>
        <Col xs={6}>
          <BootForm.Label>Outer shell: {values.outerShell}</BootForm.Label>
          <Field
            as={BootForm.Control}
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
