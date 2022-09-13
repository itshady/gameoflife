class Species {
  constructor(color, id) {
    this.color = color
    this._id = id
  }

  get color() {
    this._color
  }

  set color(newColor) {
    this._color = newColor
  }

  get id() {
    this._id
  }
}

export default Species