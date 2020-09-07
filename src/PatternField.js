import React from "react";
import { Field } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";
import { XIcon } from "@primer/octicons-react";

import PixelField from "./PixelField";

const PatternField = ({ pattern, index, remove }) => {
  return (
    <Col sm={12} md={6} lg={4}>
      <div>
        <Form.Group as={Row}>
          <Col>
            <Field
              className="form-control form-control-sm"
              type="text"
              name={`patterns.${index}.name`}
            />
          </Col>
          <Col xs={3}>
            <Button
              size="sm"
              variant="outline-danger"
              style={{ float: "right" }}
              onClick={() => remove(index)}
            >
              <XIcon />
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column xs={2} sm={3}>
            Type:
          </Form.Label>
          <Col>
            <Field
              className="form-control form-control-sm"
              as="select"
              id={`patterns.${index}.type`}
              name={`patterns.${index}.type`}
            >
              <option value="static">Still-life</option>
              <option value="glider">Glider</option>
              <option value="rotator">Rotator</option>
            </Field>
          </Col>
        </Form.Group>
        <Field
          as={PixelField}
          id={`patterns.${index}.pixels`}
          name={`patterns.${index}.pixels`}
          size={pattern.size}
        />
      </div>
    </Col>
  );
};

export default PatternField;
