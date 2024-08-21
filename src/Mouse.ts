export class Mouse {
  mouseX: number;
  mouseY: number;

  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }
};