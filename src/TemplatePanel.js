import React from "react";
import { useFormikContext, FieldArray } from "formik";
import { Row, Col, Button } from "react-bootstrap";
import { VersionsIcon } from "@primer/octicons-react";

import PatternField from "./PatternField";

const TemplatePanel = () => {
  const { values } = useFormikContext();
  return (
    <>
      <h3>Structure Templates</h3>
      <Row>
        <FieldArray
          name="patterns"
          render={(arrayHelpers) => (
            <>
              {values.patterns.map((pattern, index) => (
                <PatternField
                  key={index}
                  pattern={pattern}
                  index={index}
                  remove={arrayHelpers.remove}
                />
              ))}
              <Col sm={12} md={6} lg={4}>
                <Button
                  size="sm"
                  onClick={() =>
                    arrayHelpers.push({
                      name: `Still-life #${
                        values.patterns.filter(
                          (pattern) => pattern.type === "static"
                        ).length + 1
                      }`,
                      type: "static",
                      pixels: [],
                    })
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
