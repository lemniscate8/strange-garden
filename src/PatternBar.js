import React, { useContext, useCallback } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

import PatternContext from "./PatternContext";
import Panel from "./Panel";

const PatternControl = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: fit-content;
  margin: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid #ececec;
  border-radius: 0.25rem;
`;

const Title = styled.h4`
  margin-left: 10px;
  margin-right: 10px;
  align-self: center;
`;

const PatternArray = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const PatternBar = () => {
  const { patterns, setPatterns } = useContext(PatternContext);

  const savePixels = useCallback(
    (index) => {
      return function (pixels) {
        let pats = patterns;
        pats[index].pixels = pixels;
        setPatterns(pats);
      };
    },
    [patterns, setPatterns]
  );

  const addPattern = useCallback(() => {
    setPatterns([...patterns, { size: 15 }]);
  }, [patterns, setPatterns]);

  return (
    <PatternControl>
      <Title>Existing Patterns</Title>
      <PatternArray>
        {patterns.map((pattern, index) => (
          <Panel
            key={index}
            {...pattern}
            displaySize={120}
            savePixels={savePixels(index)}
          />
        ))}
        <Button
          style={{ marginLeft: "10px", marginRight: "10px" }}
          variant="light"
          onClick={addPattern}
        >
          +
        </Button>
      </PatternArray>
    </PatternControl>
  );
};

export default PatternBar;
