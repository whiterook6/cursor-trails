import { AnimationLoop, ITimestamp } from "./AnimationLoop";
import "./assets/style.css";
import { GLContext } from "./GLContext";
import { Mouse } from "./Mouse";

let mustResize = false;
const main = () => {
  const canvas = document.getElementById("glcanvas") as HTMLCanvasElement;
  const glContext = new GLContext(canvas);
  const { gl } = glContext;

  window.addEventListener("resize", () => {
    mustResize = true;
  });

  const mouseTrail: Array<[number, number]> = Array(30).fill([0, 0]);
  const mouse = new Mouse();

  const looper = new AnimationLoop((timestamp: ITimestamp) => {
    if (mustResize){
      glContext.resize(window.innerWidth, window.innerHeight);
      mustResize = false;
    }

    // lerp the mouse positions
    // move every single point towards the next position
    // move the last point toward the mouse position
    for (let i = 0; i < mouseTrail.length - 1; i++) {
      const [x, y] = mouseTrail[i];
      const [nextX, nextY] = mouseTrail[i + 1];
      mouseTrail[i] = [x + (nextX - x) * 0.1, y + (nextY - y) * 0.1];
    }
    const lastPoint = mouseTrail[mouseTrail.length - 1];
    mouseTrail[mouseTrail.length - 1] = [lastPoint[0] + (mouse.mouseX - lastPoint[0]) * 0.1, lastPoint[1] + (mouse.mouseY - lastPoint[1]) * 0.1];

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