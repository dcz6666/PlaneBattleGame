/**
 * 
 * @param {String | Array} src 
 * @returns 
 */
function createImg(src) {
    let img;
    if (typeof src === 'string') {
        img = new Image();
        img.src = src
    } else {
        img = []
        for (let i = 0; i < src.length; i++) {
            img[i] = new Image();
            img[i].src = src[i];
        }
    }
    return img;
}

const IMAGEList = {
    bg: "./img/bg/bg.jpg",
    logo: "./img/logo/logo.webp",
    pause: "./img/pause/pause.png",
    loadingFrame: [
        "./img/loading/loading-1.png",
        "./img/loading/loading-2.png",
        "./img/loading/loading-3.png",
        "./img/loading/loading-4.png",
        "./img/loading/loading-5.png",
        "./img/loading/loading-6.png",
        "./img/loading/loading-7.png",
        "./img/loading/loading-8.png",
    ],
    heroFrame: {
        live: ["./img/hero/hero_live_1.png", "./img/hero/hero_live_2.png"],
        death: [
            "./img/hero/hero_death_1.png",
            "./img/hero/hero_death_2.png",
            "./img/hero/hero_death_3.png",
        ],
    },
    bulletImg: "./img/bullet/bullet.png",
    e1Frame: {
        live: ["./img/enemy/e1_live_1.png", "./img/enemy/e1_live_2.png"],
        death: ["./img/enemy/e1_death_1.png", "./img/enemy/e1_death_2.png"],
    },
    e2Frame: {
        live: ["./img/enemy/e2_live_1.png", "./img/enemy/e2_live_2.png"],
        death: ["./img/enemy/e2_death_1.png", "./img/enemy/e2_death_2.png"],
    },
    e3Frame: {
        live: ["./img/enemy/e3_live_1.png", "./img/enemy/e3_live_2.png"],
        death: ["./img/enemy/e3_death_1.png", "./img/enemy/e3_death_2.png"],
    },
};

//   初始化背景
const bg = createImg(IMAGEList.bg);
//   初始化logo
const logo = createImg(IMAGEList.logo)
//初始化暂停图片
const pause = createImg(IMAGEList.pause);
// 初始化子弹
const bullet = createImg(IMAGEList.bulletImg);
// 初始化loadig
const loading_frame = createImg(IMAGEList.loadingFrame)
// 初始化飞机
const hero_frame = { live: createImg(IMAGEList.heroFrame.live), death: createImg(IMAGEList.heroFrame.death) };

// 初始化敌机
// e1
const e1Frame = {
    live: createImg(IMAGEList.e1Frame.live),
    death: createImg(IMAGEList.e1Frame.death),
};
// e2
const e2Frame = {
    live: createImg(IMAGEList.e2Frame.live),
    death: createImg(IMAGEList.e2Frame.death),
};
// e3
const e3Frame = {
    live: createImg(IMAGEList.e3Frame.live),
    death: createImg(IMAGEList.e3Frame.death),
};
//定义游戏的状态
//开始
let START = 0;
//开始时
let STARTING = 1;
//运行中
let RUNNING = 2;
//暂停时
let PAUSE = 3;
//结束时
let END = 4;

//初始状态
let state = START;

//score 分数变量 life 变量
let score = 0;
let life = 3;

// 天空背景配置
const SkyConfig = {
    bg: bg,
    width: 480,
    height: 650,
    speed: 10,
};

//loading 配置
const LoadingConfig = {
    frames: loading_frame,
    width: 197,
    height: 193,
    x: 0,
    y: 650 - 193,
    speed: 100,
};
// 英雄配置
const HeroConfig = {
    frames: hero_frame,
    width: 128,
    height: 128,
    speed: 200,
};

//子弹配置项
const BulletConfig = {
    img: bullet,
    width: 20,
    height: 58,
};

//小敌机配置项
const E1 = {
    type: 1,
    width: 89,
    height: 68,
    life: 1,
    score: 1,
    frame: e1Frame,
    minSpeed: 20,
    maxSpeed: 10,
};
const E2 = {
    type: 2,
    width: 197,
    height: 134,
    life: 5,
    score: 5,
    frame: e2Frame,
    minSpeed: 50,
    maxSpeed: 20,
};
const E3 = {
    type: 3,
    width: 240,
    height: 240,
    life: 20,
    score: 20,
    frame: e3Frame,
    minSpeed: 100,
    maxSpeed: 100,
};

