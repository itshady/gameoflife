const MINSPEED = 2000

class Canvas {
  constructor(gameControl) {
    this.canvas = document.getElementById("gamefield")
    this.ctx = this.canvas.getContext("2d")
    this.gameControl = gameControl
    this.intervalTime = 1000
    this.cell_size = 13
    this.colors = [`#7e7e7e`,`#ffff00`,`green`]
    this.canvas.width = this.cell_size * this.gameControl.gameEngine.width
    this.canvas.height = this.cell_size * this.gameControl.gameEngine.height
  }

  init() {
    // Mouse event handling:
    let start;
    const getPos = (e) => ({
      x: e.clientX - this.canvas.offsetLeft,
      y: e.clientY - this.canvas.offsetTop 
    });

    const reset = () => {
      start = null;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translation
      this.fill();
    }

    this.canvas.addEventListener("mousedown", e => {
      reset();
      start = getPos(e)
    });

    this.canvas.addEventListener("mouseup", reset);
    this.canvas.addEventListener("mouseleave", reset);

    this.canvas.addEventListener("mousemove", e => {
      // Only move the grid when we registered a mousedown event
      if (!start) return;
      let pos = getPos(e);
      // Move coordinate system in the same way as the cursor
      this.ctx.translate(pos.x - start.x, pos.y - start.y);
      this.draw();
      start = pos;
    });
  }

  draw() {
    let step = 10;
    let left = 0.5 - Math.ceil(this.canvas.width / step) * step;
    let top = 0.5 - Math.ceil(this.canvas.height / step) * step;
    let right = 2*this.canvas.width;
    let bottom = 2*this.canvas.height;
    this.ctx.clearRect(left, top, right - left, bottom - top);
    this.ctx.beginPath();
    for (let x = left; x < right; x += step) {
      this.ctx.moveTo(x, top);
      this.ctx.lineTo(x, bottom);
    }
    for (let y = top; y < bottom; y += step) {
      this.ctx.moveTo(left, y);
      this.ctx.lineTo(right, y);
    }
    this.ctx.strokeStyle = "#888";
    this.ctx.stroke();
  }

  fill() {
    this.gameControl.mapData.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        this.ctx.fillStyle = this.colors[cellData]
        this.ctx.strokeStyle = 'red';
        this.ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size)
        this.ctx.fillStyle='#8c8c8c'
        const thickness = 1.5
        this.ctx.fillRect((j * this.cell_size) - (thickness), (i * this.cell_size) - (thickness), this.cell_size, thickness)
        this.ctx.fillRect((j * this.cell_size) - (thickness), (i * this.cell_size) - (thickness), thickness, this.cell_size);
      })
    })
  }
}

export default Canvas