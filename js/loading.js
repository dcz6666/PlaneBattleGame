
    class Loading {
        constructor(config) {
          this.frames = config.frames;
          this.width = config.width;
          this.height = config.height;
          this.x = config.x;
          this.y = config.y;
          this.speed = config.speed;
          this.lastTime = new Date().getTime();
          this.currentIndex = 0;
        }
        paint(context) {
          context.drawImage(
            this.frames[this.currentIndex],
            this.x,
            this.y,
            this.width,
            this.height
          );
        }
        judge() {
          let currentTime = new Date().getTime();
          if (currentTime - this.lastTime > this.speed) {
            this.currentIndex++;
            if (this.currentIndex == 4) {
              state = RUNNING;
            }
            this.lastTime = currentTime;
          }
        }
      }