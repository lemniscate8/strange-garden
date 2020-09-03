import React, { useRef, useEffect } from "react";
import p5 from "p5";
import styled from "styled-components";

const PanelContents = styled.div`
  flex: 0 1 auto;

  display: flex;
  flex-flow: column wrap;
  border: 2px solid #ececec;
  border-radius: 0.25rem;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Canvas = styled.div`
  display: block;
  width: min-content;
`;

const Panel = ({ size, displaySize, pixels, savePixels }) => {
  const divRef = useRef();
  const p5inst = useRef();

  useEffect(() => {
    p5inst.current = new p5((p) => {
      let g; //Graphics object
      const scaling = size / displaySize;
      p.setup = function () {
        p.createCanvas(displaySize, displaySize);

        g = p.createGraphics(size, size);
        g.pixelDensity(1);
        g.background(0);
        g.loadPixels();
        if (pixels && g.pixels.length === 4 * pixels.length) {
          console.log("Copying pixels");
          for (let i = 0; i < g.pixels.length; i += 4) {
            g.pixels[i] = pixels[i / 4];
            g.pixels[i + 1] = pixels[i / 4];
            g.pixels[i + 2] = pixels[i / 4];
            g.pixels[i + 3] = 255;
          }
        }
        g.updatePixels();
      };

      p.draw = function () {
        p.image(g, 0, 0, p.width, p.height);
      };

      p.mouseDragged = function () {
        g.fill(255);
        g.stroke(255, 255, 255, 10);
        g.line(
          scaling * p.mouseX,
          scaling * p.mouseY,
          scaling * p.pmouseX,
          scaling * p.pmouseY
        );
      };

      p.windowResized = function () {
        p.resizeCanvas(displaySize, displaySize);
      };

      p.mouseReleased = function () {
        if (
          p.mouseX < 0 ||
          p.mouseX >= p.width ||
          p.mouseY < 0 ||
          p.mouseY >= p.width
        ) {
          return;
        }

        let lessPixels = [];
        g.loadPixels();
        let pixCount = g.pixels.length;
        for (let i = 0; i < pixCount; i += 4) {
          lessPixels.push(g.pixels[i]);
        }
        savePixels(lessPixels);
      };
    }, divRef.current);

    return () => {
      p5inst.current.remove();
    };
  });

  useEffect(() => {
    p5inst.current.windowResized();
  }, [displaySize]);

  return (
    <PanelContents>
      <Canvas ref={divRef} />
    </PanelContents>
  );
};

export default Panel;
