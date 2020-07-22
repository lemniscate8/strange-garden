import React, { useRef, useEffect, useCallback } from "react";
import p5 from "p5";

const Panel = ({ width, height }) => {
  const divRef = useRef();
  const p5inst = useRef();

  const sketch = useCallback(
    (p) => {
      p.setup = function () {
        p.createCanvas(width, height, p.WEBGL);
        p.background(0);
        p.translate(-width / 2, -height / 2);
      };
      p.mouseDragged = function () {
        p.fill(255);
        p.stroke(255, 255, 255, 10);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      };
    },
    [height, width]
  );

  useEffect(() => {
    p5inst.current = new p5(sketch, divRef.current);
    return () => {
      p5inst.current = null;
    };
  }, [sketch]);

  return <div ref={divRef}></div>;
};

export default Panel;
