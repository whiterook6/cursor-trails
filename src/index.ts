import { AnimationLoop, ITimestamp } from "./AnimationLoop";
import "./assets/style.css";
import { GLContext } from "./GLContext";

let mustResize = false;
const main = () => {
  const canvas = document.getElementById("glcanvas") as HTMLCanvasElement;
  const glContext = new GLContext(canvas);
  const { gl } = glContext;

  window.addEventListener("resize", () => {
    mustResize = true;
  });

  const looper = new AnimationLoop((timestamp: ITimestamp) => {
    if (mustResize){
      glContext.resize(window.innerWidth, window.innerHeight);
      mustResize = false;
    }

    gl.viewport(0, 0, glContext.width, glContext.height);
    gl.clearColor(0.8745, 0.8745, 0.8745, 1.0); // Clear to light grey, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST); // Disable depth testing
  });

  looper.attachSpacebarToggle();
  looper.resume();
}

main();