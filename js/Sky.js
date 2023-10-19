    //天空背景类
    class Sky {
        constructor(config) {
          //静态属性
          console.log("config", config);
          this.bg = config.bg;
          this.width = config.width;
          this.height = config.height;
          this.speed = config.speed;
          this.x1 = 0;
          this.y1 = 0;
          this.x2 = 0;
          this.y2 = -this.height;
          this.lastTime = new Date().getTime();
        }
        //判断这个时间段天空是否需要移动y1,y2++
        //拿到当前时间节点 有一个速度节点 拿到一个历史时间
        //当前时间-速度时间 如果大于历史时间的话 那么就需要移动
        judge() {
          let currentTime = new Date().getTime();
          if (currentTime - this.lastTime >= this.speed) {
            this.y1++;
            this.y2++;
            this.lastTime = new Date().getTime();
          }
          if (this.y2 == 0) {
            this.y1 = 0;
            this.y2 = -this.height;
          }
        }
        //动态方法
        paint(context) {
          context.drawImage(this.bg, this.x1, this.y1, this.width, this.height);
          context.drawImage(this.bg, this.x2, this.y2, this.width, this.height);
        }
      }