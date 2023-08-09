class BackgroundObject extends MovableObject {
    width = 750;
    height = 480;
  constructor (imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  };
}