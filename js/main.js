// 1、让画布绘制图片
    // 1.1 找到这个画布
    const canvas = document.querySelector("#canvas");
    //1.2 利用这个画布初始化一个2D的画笔
    const context = canvas.getContext("2d");

    const sky = new Sky(SkyConfig);
    const loading = new Loading(LoadingConfig);
    let hero = new Hero(HeroConfig);
    
    canvas.addEventListener("mousemove", (e) => {
      hero.x = e.offsetX - hero.width / 2;
      hero.y = e.offsetY - hero.height / 2;
    });

    //为canvas绑定一个点击事件且他如果Start状态的时候需要改成starting状态
    canvas.addEventListener("click", () => {
      if (state == START) {
        state = STARTING;
      }
    });

    //为canvas 绑定一个鼠标离开事件鼠标离开时RUNING ->PAUSE
    canvas.addEventListener("mouseleave", () => {
      if (state == RUNNING) {
        state = PAUSE;
      }
    });
    //为canvas 绑定一个鼠标离开事件鼠标进入时PAUSE->RUNING
    canvas.addEventListener("mouseenter", () => {
      if (state == PAUSE) {
        state = RUNNING;
      }
    });

    //碰撞检测函数
    function checkHit() {
      //遍历所有的敌机
      for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].hit(hero)) {
          //敌机和英雄发生碰撞
          enemies[i].collide();
          hero.collide();
        }
        //遍历所有子弹
        for (let j = 0; j < hero.bulletList.length; j++) {
          //用第i的敌机和第j个子弹进行碰撞检测 返回的是一个布尔类型
          if (enemies[i].hit(hero.bulletList[j])) {
            console.log("碰撞到了");
            //清除这架敌机 清除这颗子弹
            enemies[i].collide();
            hero.bulletList[j].collide();
          }
        }
      }
    }

    // 全局函数来判断所有子弹/敌人组件
    function judgeComponent() {
      for (let i = 0; i < hero.bulletList.length; i++) {
        hero.bulletList[i].move();
      }
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].move();
      }
    }
    // 全局函数来绘制所有子弹/敌人组件 /绘制score &life面板
    function paintComponent() {
      for (let i = 0; i < hero.bulletList.length; i++) {
        hero.bulletList[i].paint(context);
      }
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].paint(context);
      }
      //绘制score & lift 面板
      context.font = "20px 微软雅黑";
      context.fillStyle = "red";
      context.textAlign = "left";
      context.fillText("score:" + score, 10, 20);
      context.textAlign = "right";
      context.fillText("life:" + life, 480 - 10, 20);

      //重置代码 画笔重置为 黑色 左对齐
      context.textAlign = "left";
      context.fillStyle = "black";
    }
    // 全局函数来销毁所有子弹/敌人组件 /销毁英雄
    function deleteComponent() {
      if (hero.destroy) {
        //生命-1
        life--
        hero.destroy=false
        //当生命值降低为0的时候进入游戏结束状态
        if (life == 0) {
          //游戏结束
          state = END;
          console.log("游戏结束");
        }else{
          //死了一次之后 重新初始化一个英雄实例
           hero = new Hero(HeroConfig);
        }
      }
      for (let i = 0; i < hero.bulletList.length; i++) {
        //判断有没有飞出边界 或者destroy :true
        if (hero.bulletList[i].outOfBounds() || hero.bulletList[i].destroy) {
          hero.bulletList.splice(i, 1);
        }
      }

      for (let i = 0; i < enemies.length; i++) {
        //如果敌机处于一种销毁状态 destroy:true
        if (enemies[i].outOfBounds() || enemies[i].destroy) {
          enemies.splice(i, 1);
        }
      }
    }
    //该变量存放所有敌机实例
    let enemies = [];
    //敌机产生的速率
    let ENEMY_CREATE_INTERVAL = 800;
    let ENEMY_LASTTIME = new Date().getTime();

    //全局函数 隔一段事件就来初始化一架飞机
    function createComponent() {
      let currentTime = new Date().getTime();
      if (currentTime - ENEMY_LASTTIME >= ENEMY_CREATE_INTERVAL) {
        //当时间满足 实例化一架敌机 放入敌机数组中
        let ran = Math.floor(Math.random() * 100);
        if (ran < 60) {
          //产生一架小飞机
          enemies.push(new Enemy(E1));
        } else if (ran > 60 && ran < 90) {
          //产生一架中飞机
          enemies.push(new Enemy(E2));
        } else {
          //产生一架大飞机
          enemies.push(new Enemy(E3));
        }
        ENEMY_LASTTIME = currentTime;
      }
      // console.log("enemies", enemies);
    }

    //图片加载
    bg.addEventListener("load", () => {
      setInterval(() => {
        switch (state) {
          case START:
            sky.paint(context);
            sky.judge();
            //渲染飞机大战logo
            let logo_x = (480 - logo.naturalWidth) / 2;
            let logo_y = (650 - logo.naturalHeight) / 2;
            context.drawImage(logo, logo_x, logo_y);
            break;
          case STARTING:
            sky.paint(context);
            sky.judge();
            loading.paint(context);
            loading.judge();
            break;
          case RUNNING:
            sky.paint(context);
            sky.judge();

            hero.judge();
            hero.paint(context);
            hero.shoot(context);
            createComponent();
            judgeComponent();
            deleteComponent();
            paintComponent();
            checkHit();
            break;
          case PAUSE:
            //渲染飞机大战logo
            let pause_x = (480 - pause.naturalWidth) / 2;
            let pause_y = (650 - pause.naturalHeight) / 2;
            context.drawImage(pause, pause_x, pause_y);
            break;
          case END:
            context.font = "bold 24px 微软雅黑";
            context.fillText("GAME_OVER", 480 / 2, 650 / 2);
            context.textAlign = "center";
            context.textBaseLine = "middle";
            break;
          default:
            break;
        }
      }, 10);
    });