class Bullet {
    constructor(config, x, y) {
      this.img = config.img;
      this.width = config.width;
      this.height = config.height;
      this.x = x;
      this.y = y;
      this.destroy = false;
    }
    //子弹绘制方法
    paint(context) {
      context.drawImage(this.img, this.x, this.y);
    }
    //子弹移动方法
    move() {
      this.y -= 5;
    }
    outOfBounds() {
      //如果返回的是真的话 那么我们应该销毁这个子弹
      return this.y < -this.height;
    }

    collide() {
      //让这颗子弹变成颗销毁的状态
      this.destroy = true;
    }
  }