class Hero {
    constructor(config) {
      this.frames = config.frames;
      this.width = config.width;
      this.height = config.height;
      this.x = (480 - config.width) / 2;
      this.y = 650 - config.height;
      this.speed = config.speed;
      this.img = null; //当前展示的图片
      this.live = true;
      this.lastTime = new Date().getTime();
      this.framesLiveIndex = 0;
      this.framesDeathIndex = 0;
      //子弹上次射击的时间
      this.lastShootTime = new Date().getTime();
      //子弹射击的间隔
      this.shootInterval = 400;
      //子弹夹数组
      this.bulletList = [];
      this.destroy = false;
    }
    judge() {
      let currentTime = new Date().getTime();
      if (currentTime - this.lastTime > this.speed) {
        if (this.live) {
          this.img =
            this.frames.live[
              this.framesLiveIndex++ % this.frames.live.length
            ];
        } else {
          this.img = this.frames.death[this.framesDeathIndex++];
          console.log("this.img ====",  this.frames.death);
          if (this.framesDeathIndex === this.frames.death.length) {
            this.destroy = true;
          }
        }
        this.lastTime = currentTime;
      }
    }

    paint(context) {
      console.log("this.img",this.img)
      if(this.img)
      context.drawImage(this.img, this.x, this.y);
    }
    //英雄可以射击子弹
    shoot() {
      //获取当前时间
      const currentTime = new Date().getTime();
      if (currentTime - this.lastShootTime > this.shootInterval) {
        let x = this.x + this.width / 2 - BulletConfig.width / 2;
        let y = this.y - BulletConfig.height;
        //在飞机上的头部初始化一个子弹对象
        let bullet = new Bullet(BulletConfig, x, y);
        //英雄飞机要认领这个子弹
        this.bulletList.push(bullet);
        //绘制一个子弹对象
        bullet.paint(context);
        //更新英雄射击事件
        this.lastShootTime = currentTime;
      }
    }

    collide() {
      //将活着的标识符切换为false
      this.live = false;
    }
  }
