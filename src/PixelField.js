import React, { useRef, useEffect } from "react";
import p5 from "p5";
import { useFormikContext } from "formik";

const PixelField = ({ name, size, value }) => {
  const {
    values: { penSize, opacity },
    setFieldValue,
  } = useFormikContext();

  const canvasHolder = useRef(null);
  const p5inst = useRef(null);

  useEffect(() => {
    if (p5inst.current) {
      p5inst.current.overridePixels(value);
    }
  }, [value]);

  useEffect(() => {
    if (canvasHolder.current) {
      p5inst.current = new p5((p) => {
        let grid;
        const scaling = size / canvasHolder.current.offsetWidth;
        p.setup = function () {
          p.createCanvas(
            canvasHolder.current.offsetWidth,
            canvasHolder.current.offsetWidth
          );
          p.noSmooth();
          grid = p.createGraphics(size, size);
          grid.pixelDensity(1);
          grid.background(0);
          grid.noStroke();
          grid.fill(255, 255, 255, 255 * opacity * scaling);
        };

        p.overridePixels = function (values) {
          grid.loadPixels();
          grid.pixels = Uint8ClampedArray.from(
            Array.from(values).flatMap((val) => [val, val, val, 0])
          );
          grid.updatePixels();
        };

        p.draw = function () {
          p.image(grid, 0, 0, p.width, p.height);
        };

        p.mouseDragged = function () {
          grid.ellipse(
            scaling * p.mouseX,
            scaling * p.mouseY,
            penSize,
            penSize
          );
          return false;
        };

        p.mouseReleased = function () {
          grid.loadPixels();
          setFieldValue(
            name,
            grid.pixels.filter((_, index) => index % 4 === 0)
          );

          return false;
        };

        p.windowResized = function () {
          p.resizeCanvas(
            canvasHolder.current.offsetWidth,
            canvasHolder.current.offsetWidth
          );
        };
      }, canvasHolder.current);
    }
    return () => {
      if (p5inst.current) {
        console.log("Restarted");
        p5inst.current.remove();
      }
    };
  });

  return <div ref={canvasHolder} style={{ width: "100%" }} />;
};

export default PixelField;
