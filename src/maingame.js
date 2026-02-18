class maingame {
  constructor(parent) {
    this.parent = parent;
    this.mainCamera = null;
    this.bgObj = null;
    this.jumpType = 0;
    this.validJumpScore = false;
    this.lastObj = null;
    this.level9First = null;
    this.firstObj = false;
    this.XCounter = 0;
    this.DEBUG = false;
    this.BIG = true;
    this.isDemo = false;
    this.polyX = new Array(200).fill(0);
    this.polyY = new Array(200).fill(0);
    this.polyX1 = new Array(200).fill(0);
    this.polyY1 = new Array(200).fill(0);
    this.absCoord = new XVector();
    this.xy = new RenderedXY();
    this.Head = null;
    this.obstacles = new freeobj(64);
    this.vx = 0.0;
    this.minVX = -0.5;
    this.maxVX = 0.5;
    this.frameDelay = 50; // ms per frame: 50=Normal(20fps), 28=Hard(35fps), 20=Xtreme(50fps)
    this.startZ = 75.0;
    this.floorMin = new Array(8);
    this.floorMax = new Array(8);
    this.floorColor = "rgb(240,248,255)";
    this.mywidth = 0;
    this.mywidth2 = 0;
    this.zExit = 0;
    this.yExit = 0;
    this.delta = new XVector();
    this.objPos = new XVector();
    this.objStart = new XVector();
    this.playerX = 0;
    this.playerY = 0;
    this.numObjects = 0;
    this.myPos = new XVector(0, 0, 0);
    this.counter = 0;
    this.score = 0;
    this.hiscore = 0;
    this.Counter = 0;
    this.MCounter = 0;
    this.OX1 = 0;
    this.OX2 = 0;
    this.OVX = 0;
    this.OX1min = -35.0;
    this.OX2max = 35.0;
    this.Direction = 1;
    this.jumpDoubleFrames = 40;
    this.lastJumpFrames = 0;
    this.lastJumpScore = 0;
    this.jumpNum = 0;
    this.maxMsgNum = 1;
    this.msgNum = 0;
    this.msgValidFrames = 60;
    this.msgValidity = [0];
    this.defMsgValidity = this.msgValidFrames;
    this.oldLevel = -1;
    this.msg = [""];
    this.msgArcade = "";
    this.msgArcadeValidity = 0;
    this.arcadeMsgValidity = 30;
    this.msgLevel = "";
    this.msgLevelValidity = 0;
    this.levelMsgValidity = 90;
    this.msgFontHeight = 20;
    this.collisionDepth = 1.0;
    this.colliObjType = 0;
    this.colliType = 0;
    this.colliFrames = 0;
    this.pauseFlag = 0;
    this.stepFlag = 0;
    this.genX = 0.0;
    this.genMaxX = 40.0;
    this.genV = 4.0;
    this.mySpeed = 0;
    this.mySpeedMin = 1.0;
    this.mySpeedMax = 4.0;
    this.slowSpeed = 1.9;
    this.highSpeed = 3.0;
    this.accZ = 0.0;
    this.accMinZ = -0.01;
    this.accMaxZ = 0.01;
    this.accCPCsill = 0;
    this.accCPMaxCsill = 0.8;
    this.accCPMinCsill = 1.0;
    this.gravity = 0.75;
    this.startX = 0;
    this.startY = 0;
    this.horiY = 0.0;
    this.horiYOld = 0.0;
    this.horiMinY = -25.0;
    this.horiMaxY = 46.0;
    this.horiVY = 0.0;
    this.horiMinVY = -15.0;
    this.horiMaxVY = 15.0;
    this.horiAccY = 0.0;
    this.horiAccD = 1.0;
    this.horiVCsill = 0.8;
    this.bgMinY = 100.0;
    this.bgMaxY = -20.0;
    this.autoHoriFlag = true;
    this.targetHoriY = 0;
    this.newTargetSelectTime = 0;
    this.minTargetSelectTime = 50;
    this.maxTargetSelectTime = 150;
    this.targetSelectCountDown = 0;
    this.gameMode = 0;
    this.startFlag = false;
    this.isContinue = false;
    this.width = 0;
    this.height = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.outOfDemo = true;
    this.outOfRun = true;
    this.pl_turn = 0;
    this.pl_jump = 0;
    this.pl_wind = 0;
    this.pl_landing = 0;
    this.pl_bonus = 0;
    this._touchJumpHeld = false;
    // Image references (will be HTML Image objects)
    this.myImg0 = null;
    this.snowImg0 = null;
    this.shadowImg0 = null;
    this.myImg1 = null; this.myImg2 = null;
    this.myImg5 = null; this.myImg6 = null;
    this.myImg7 = null; this.myImg8 = null;
    this.u1 = null; this.u1a = null;
    this.sz1 = null; this.sz1a = null;
    this.sz2 = null; this.sz2a = null;
    this.sz3 = null; this.sz3a = null;
    this.f1 = null; this.f1a = null;
    this.f2 = null; this.f2a = null;
    this.f3 = null; this.f3a = null;
    this.f4 = null; this.f4a = null;
    this.erkezik = null;
    this.snowImg1 = null; this.snowImg2 = null; this.snowImg3 = null;
    this.snowImgL1 = null; this.snowImgL2 = null; this.snowImgL3 = null;
    this.snowImgR1 = null; this.snowImgR2 = null; this.snowImgR3 = null;
    this.snowDie1 = null; this.snowDie2 = null;
    this.snowDie3 = null; this.snowDie4 = null;
    this.isLoaded = false;
    this.audioLoaded = true; // no audio in JS version
    this.round = 0;
    this.clearScore = [30000, 70000, 120000, 170000, 220000, 260000, 300000, 350000, 430000, 999999999];
    this.jelzo = ["Sweet", "Awesome", "Wicked", "Great", "Nice", "Huge"];
    this.bkcolors = [];
    for (let i = 0; i < 10; i++) this.bkcolors.push("rgb(175,238,238)");
    this.numObjectsRound = [15, 20, 25, 30, 34, 38, 42, 46, 50, 54];
    this.rFlag = false;
    this.lFlag = false;
    this.spcFlag = false;
    this.isFocus = true;
    this.isFocus2 = true;
    this.spacePushed = false;
    this.prevTime = 0;
    this.defFrametime = 50;
    this.fut = true;
    this.gameStart = -1;
    this.damaged = 0;
    this.frameTime = 0;
    this.prevFrameTime = 0;
    // Canvas context (set during init)
    this.canvas = null;
    this.ctx = null;
    this.offCanvas = null;
    this.gra = null; // offscreen context
    this._running = false;
    this._animFrameId = null;
    // Audio
    this.turn_au = null;
    this.jump_au = null;
    this.wind_loop_au = null;
    this.landing_au = null;
    this.collision_au = null;
    this.bonus_au = null;
  }

  init() {
    this.BIG = this.parent.BIG;
    this.startZ = 100.0;
    if (this.BIG) {
      this.width = 480; this.height = 300;
      this.msgFontHeight = 20;
    } else {
      this.width = 320; this.height = 200;
      this.msgFontHeight = 13;
    }
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    // Setup canvas
    this.canvas = document.getElementById("gameCanvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    // Offscreen buffer
    this.offCanvas = document.createElement("canvas");
    this.offCanvas.width = this.width;
    this.offCanvas.height = this.height;
    this.gra = this.offCanvas.getContext("2d");
    // Camera: XCamera(d, dx, dy, maxX, maxY)
    this.mainCamera = new XCamera(1.85, 3.2, 2.0, this.width / 2, this.height / 2);
    this.mainCamera.trans.y = -2.0;
    // Background object: BackgroundObject(startZ, yScale, xLeft, xRight)
    let bgD = (this.mainCamera.d + this.startZ) * Math.sqrt(this.mainCamera.dx * this.mainCamera.dx + this.mainCamera.dy * this.mainCamera.dy) / this.mainCamera.d;
    this.bgObj = new BackgroundObject(this.startZ, 7.5, -bgD, bgD);
    // Floor
    for (let i = 0; i < 8; i++) {
      this.floorMin[i] = new XVector();
      this.floorMax[i] = new XVector();
    }
    this.buildFloor();
    this.mywidth2 = this.BIG ? 44 : 33;
    this.mywidth = this.mywidth2 * this.mainCamera.dx / this.mainCamera.maxX;
    // Load audio
    this.loadAudio();
  }

  loadAudio() {
    const audioFiles = {
      turn_au: "kanyar.wav",
      jump_au: "ugras.wav",
      landing_au: "ugrasvege.wav",
      collision_au: "utkozik.wav",
      bonus_au: "bonus.wav",
      wind_loop_au: "szel_loop.wav"
    };
    for (let key in audioFiles) {
      try {
        this[key] = new Audio(audioFiles[key]);
        this[key].preload = "auto";
      } catch(e) {
        this[key] = null;
      }
    }
    if (this.wind_loop_au) this.wind_loop_au.loop = true;
    this.audioLoaded = true;
  }

  loadImages() {
    return new Promise((resolve) => {
      const imageMap = {
        myImg1: "1.gif", myImg2: "2.gif",
        myImg5: "j5.gif", myImg6: "j6.gif",
        myImg7: "j7.gif", myImg8: "j8.gif",
        u1: "ugrik1.gif",
        sz1: "szalto1.gif", sz2: "szalto2.gif", sz3: "szalto3.gif",
        f1: "forog1.gif", f2: "forog2.gif", f3: "forog3.gif", f4: "forog4.gif",
        erkezik: "erkezik.gif",
        snowImg1: "egyenesho1.gif", snowImg2: "egyenesho2.gif", snowImg3: "egyenesho3.gif",
        snowImgL1: "balho1.gif", snowImgL2: "balho2.gif", snowImgL3: "balho3.gif",
        snowImgR1: "jobbho1.gif", snowImgR2: "jobbho2.gif", snowImgR3: "jobbho3.gif",
        snowDie1: "nagyho1.gif", snowDie2: "nagyho2.gif", snowDie3: "nagyho3.gif", snowDie4: "nagyho4.gif",
        u1a: "ugrik1a.gif",
        sz1a: "szalto1a.gif", sz2a: "szalto2a.gif", sz3a: "szalto3a.gif",
        f1a: "forog1a.gif", f2a: "forog2a.gif", f3a: "forog3a.gif", f4a: "forog4a.gif"
      };
      let total = Object.keys(imageMap).length;
      let loaded = 0;
      for (let key in imageMap) {
        let img = new Image();
        img._name = key;
        img.onload = () => {
          loaded++;
          this.parent.updateLoading(loaded, total);
          if (loaded >= total) {
            this.isLoaded = true;
            resolve();
          }
        };
        img.onerror = () => {
          console.warn("Failed to load: " + imageMap[key]);
          loaded++;
          if (loaded >= total) {
            this.isLoaded = true;
            resolve();
          }
        };
        img.src = imageMap[key];
        this[key] = img;
      }
    });
  }

  buildFloor() {
    let FOVX = this.mainCamera.dx / this.mainCamera.d;
    let FOVY = this.mainCamera.dy / this.mainCamera.d;
    let d = -this.startZ * FOVX - 60.0;
    let d2 = this.startZ * FOVX + 60.0;
    let d3 = d2 - d;
    let d4 = -this.startZ * FOVY;
    for (let n = 0; n < 8; n++) {
      this.floorMin[n].z = this.startZ;
      this.floorMax[n].z = this.startZ;
      this.floorMin[n].y = n <= 3 ? (3 - n) * d4 / 6.0 : (n - 4) * d4 / 6.0;
    }
    this.floorMax[0].y = d4;
    this.floorMax[1].y = 7.0 * d4 / 10.0;
    this.floorMax[2].y = 2.0 * d4 / 10.0;
    this.floorMax[3].y = 0.0;
    this.floorMax[4].y = 0.0;
    this.floorMax[5].y = 2.0 * d4 / 10.0;
    this.floorMax[6].y = 7.0 * d4 / 10.0;
    this.floorMax[7].y = d4;
    this.floorMin[0].x = d;
    this.floorMin[1].x = d + 3.0 * d3 / 20.0;
    this.floorMin[2].x = d + 5.0 * d3 / 20.0;
    this.floorMin[3].x = d + 8.0 * d3 / 20.0;
    this.floorMin[4].x = d2 - 8.0 * d3 / 20.0;
    this.floorMin[5].x = d2 - 5.0 * d3 / 20.0;
    this.floorMin[6].x = d2 - 3.0 * d3 / 20.0;
    this.floorMin[7].x = d2;
    this.floorMax[0].x = d;
    this.floorMax[1].x = d + 3.0 * d3 / 20.0;
    this.floorMax[2].x = d + 5.0 * d3 / 20.0;
    this.floorMax[3].x = d + 8.0 * d3 / 20.0;
    this.floorMax[4].x = d2 - 8.0 * d3 / 20.0;
    this.floorMax[5].x = d2 - 5.0 * d3 / 20.0;
    this.floorMax[6].x = d2 - 3.0 * d3 / 20.0;
    this.floorMax[7].x = d2;
  }

  autoHorizon() {
    if (this.targetSelectCountDown === 0) {
      this.newTargetSelectTime = Math.floor(this.minTargetSelectTime + (this.maxTargetSelectTime - this.minTargetSelectTime) * Math.random());
      if (this.targetHoriY < 0) {
        this.targetHoriY = this.horiMaxY * 0.5 + 0.5 * this.horiMaxY * Math.random();
        this.newTargetSelectTime += this.newTargetSelectTime;
      } else {
        this.targetHoriY = this.horiMinY * 0.5 + 0.5 * this.horiMinY * Math.random();
        this.newTargetSelectTime = Math.floor(this.newTargetSelectTime / 2);
      }
      this.targetSelectCountDown = this.newTargetSelectTime;
      this.horiAccY = this.horiY < this.targetHoriY ? this.horiAccD : (this.horiY > this.targetHoriY ? -this.horiAccD : 0);
    } else {
      --this.targetSelectCountDown;
      if (this.targetHoriY > 0) { this.horiVY *= 0.5; }
      if ((this.horiAccY < 0 && this.horiY <= this.targetHoriY) || (this.horiAccY > 0 && this.horiY >= this.targetHoriY)) {
        this.horiAccY = 0;
      }
    }
  }

  checkCollision(obs) {
    if (!this.isLoaded) return false;
    if (obs.GetAbsCoordX(obs.maxX) < -this.mywidth || obs.GetAbsCoordX(obs.minX) > this.mywidth) return false;
    let jt = this.mainCamera.getJumpType();
    let jp = this.mainCamera.getJumpPhase();
    if (jp !== 0 && jp !== 10 && jt !== 3 && jt !== 4 && jt !== 5) return false;
    if (jp !== 0 && jp !== 10 && (obs.type === 10 || obs.type === 1 || obs.type === 20)) {
      this.validJumpScore = true;
      return false;
    }
    this.colliFrames = 0;
    this.colliObjType = obs.type;
    return true;
  }

  clearObstacle() {
    let obj = this.Head;
    while (obj != null) {
      let next = obj.next;
      this.obstacles.deleteObj(obj);
      obj = next;
    }
    this.Head = null;
  }

  form1000(n) {
    if (n < 1000) return String(n);
    let prefix = this.form1000(Math.floor(n / 1000));
    let d1 = String(Math.floor(n % 1000 / 100));
    let d2 = String(Math.floor(n % 100 / 10));
    let d3 = String(n % 10);
    return prefix + "," + d1 + d2 + d3;
  }

  getImgDiff(image) {
    if (this.BIG) {
      if (image === this.myImg1) { this.xy.x = 45; this.xy.y = 57; return; }
      if (image === this.myImg2) { this.xy.x = 44; this.xy.y = 57; return; }
      if (image === this.myImg5) { this.xy.x = 56; this.xy.y = 61; return; }
      if (image === this.myImg6) { this.xy.x = 56; this.xy.y = 62; return; }
      if (image === this.myImg7) { this.xy.x = 33; this.xy.y = 63; return; }
      if (image === this.myImg8) { this.xy.x = 32; this.xy.y = 64; return; }
      if (image === this.u1) { this.xy.x = 40; this.xy.y = 1; return; }
      if (image === this.u1a) { this.xy.x = 40; this.xy.y = 124; return; }
      if (image === this.sz1) { this.xy.x = 20; this.xy.y = 35; return; }
      if (image === this.sz1a) { this.xy.x = 20; this.xy.y = 123; return; }
      if (image === this.sz2) { this.xy.x = 14; this.xy.y = 2; return; }
      if (image === this.sz2a) { this.xy.x = 14; this.xy.y = 111; return; }
      if (image === this.sz3) { this.xy.x = 25; this.xy.y = 40; return; }
      if (image === this.sz3a) { this.xy.x = 25; this.xy.y = 120; return; }
      if (image === this.f1) { this.xy.x = 23; this.xy.y = 18; return; }
      if (image === this.f1a) { this.xy.x = 23; this.xy.y = 105; return; }
      if (image === this.f2) { this.xy.x = 42; this.xy.y = 21; return; }
      if (image === this.f2a) { this.xy.x = 23; this.xy.y = 101; return; }
      if (image === this.f3) { this.xy.x = 26; this.xy.y = 20; return; }
      if (image === this.f3a) { this.xy.x = 23; this.xy.y = 107; return; }
      if (image === this.f4) { this.xy.x = 49; this.xy.y = 21; return; }
      if (image === this.f4a) { this.xy.x = 23; this.xy.y = 101; return; }
      if (image === this.erkezik) { this.xy.x = 40; this.xy.y = 42; return; }
      if (image === this.snowImg1) { this.xy.x = 43; this.xy.y = 140; return; }
      if (image === this.snowImg2) { this.xy.x = 35; this.xy.y = 145; return; }
      if (image === this.snowImg3) { this.xy.x = 40; this.xy.y = 141; return; }
      if (image === this.snowImgL1) { this.xy.x = 59; this.xy.y = 140; return; }
      if (image === this.snowImgL2) { this.xy.x = 59; this.xy.y = 136; return; }
      if (image === this.snowImgL3) { this.xy.x = 80; this.xy.y = 139; return; }
      if (image === this.snowImgR1) { this.xy.x = 13; this.xy.y = 141; return; }
      if (image === this.snowImgR2) { this.xy.x = 15; this.xy.y = 135; return; }
      if (image === this.snowImgR3) { this.xy.x = 14; this.xy.y = 139; return; }
      if (image === this.snowDie1) { this.xy.x = 63; this.xy.y = 75; return; }
      if (image === this.snowDie2) { this.xy.x = 24; this.xy.y = 59; return; }
      if (image === this.snowDie3) { this.xy.x = 5; this.xy.y = 102; return; }
      if (image === this.snowDie4) { this.xy.x = 0; this.xy.y = 128; return; }
    } else {
      if (image === this.myImg1) { this.xy.x = 30; this.xy.y = 38; return; }
      if (image === this.myImg2) { this.xy.x = 29; this.xy.y = 38; return; }
      if (image === this.myImg5) { this.xy.x = 37; this.xy.y = 41; return; }
      if (image === this.myImg6) { this.xy.x = 37; this.xy.y = 41; return; }
      if (image === this.myImg7) { this.xy.x = 22; this.xy.y = 42; return; }
      if (image === this.myImg8) { this.xy.x = 21; this.xy.y = 43; return; }
      if (image === this.u1) { this.xy.x = 27; this.xy.y = 1; return; }
      if (image === this.sz1) { this.xy.x = 13; this.xy.y = 23; return; }
      if (image === this.sz2) { this.xy.x = 9; this.xy.y = 1; return; }
      if (image === this.sz3) { this.xy.x = 17; this.xy.y = 27; return; }
      if (image === this.f1) { this.xy.x = 15; this.xy.y = 12; return; }
      if (image === this.f2) { this.xy.x = 28; this.xy.y = 14; return; }
      if (image === this.f3) { this.xy.x = 17; this.xy.y = 13; return; }
      if (image === this.f4) { this.xy.x = 33; this.xy.y = 14; return; }
      if (image === this.erkezik) { this.xy.x = 27; this.xy.y = 28; return; }
      if (image === this.snowImg1) { this.xy.x = 28; this.xy.y = 93; return; }
      if (image === this.snowImg2) { this.xy.x = 23; this.xy.y = 97; return; }
      if (image === this.snowImg3) { this.xy.x = 27; this.xy.y = 94; return; }
      if (image === this.snowImgL1) { this.xy.x = 39; this.xy.y = 93; return; }
      if (image === this.snowImgL2) { this.xy.x = 39; this.xy.y = 91; return; }
      if (image === this.snowImgL3) { this.xy.x = 53; this.xy.y = 93; return; }
      if (image === this.snowImgR1) { this.xy.x = 9; this.xy.y = 94; return; }
      if (image === this.snowImgR2) { this.xy.x = 10; this.xy.y = 90; return; }
      if (image === this.snowImgR3) { this.xy.x = 9; this.xy.y = 93; return; }
      if (image === this.snowDie1) { this.xy.x = 42; this.xy.y = 50; return; }
      if (image === this.snowDie2) { this.xy.x = 16; this.xy.y = 39; return; }
      if (image === this.snowDie3) { this.xy.x = 3; this.xy.y = 68; return; }
      if (image === this.snowDie4) { this.xy.x = 0; this.xy.y = 85; return; }
    }
  }

  getLimitstr() {
    return this.round === 9 ? "Exit at   NO LIMIT" : "Exit at " + this.form1000(this.clearScore[this.round]);
  }

  jumpArcadeName(n) {
    let s = "";
    let n2 = Math.floor(Math.random() * 6);
    s += this.jelzo[n2];
    switch (n) {
      case 0: s += " flip"; break;
      case 1: case 2: s += " spin"; break;
      case 3: s += " grab"; break;
      case 4: case 5: s += " grab"; break;
      case 6: s += " jump"; break;
      case 7: case 8: s += " air"; break;
    }
    return s;
  }

  jumpName(n) {
    switch (n) {
      case 0: return "Backflip";
      case 1: case 2: return "360 Spin";
      case 3: return "Tail Grab";
      case 4: case 5: return "Edge Grab";
      case 6: return "Double Backflip to Tail Grab";
      case 7: case 8: return "Huge 720";
    }
    return "";
  }

  jumpScore(n) {
    switch (n) {
      case 0: return 1500;
      case 1: case 2: return 1000;
      case 3: return 300;
      case 4: case 5: return 500;
      case 6: return 3000;
      case 7: case 8: return 2500;
    }
    return 0;
  }

  setJumpAnim(n) {
    if (n === 0) return;
    switch (this.mainCamera.jumpType) {
      case 0:
        switch (n) {
          case 1: this.myImg0 = this.sz1; return;
          case 2: case 3: case 4: case 5: this.myImg0 = this.sz2; return;
          case 6: this.myImg0 = this.sz3; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
      case 1:
        switch (n) {
          case 1: this.myImg0 = this.f1; return;
          case 2: this.myImg0 = this.f2; return;
          case 3: case 4: this.myImg0 = this.f3; return;
          case 5: this.myImg0 = this.f4; return;
          case 6: this.myImg0 = this.f1; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
      case 2:
        switch (n) {
          case 1: this.myImg0 = this.f1; return;
          case 2: this.myImg0 = this.f4; return;
          case 3: case 4: this.myImg0 = this.f3; return;
          case 5: this.myImg0 = this.f2; return;
          case 6: this.myImg0 = this.f1; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
      case 3:
        switch (n) {
          case 1: case 2: case 3: case 4: case 5: case 6: this.myImg0 = this.u1; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
      case 4:
        switch (n) {
          case 1: case 2: case 3: case 4: case 5: case 6: this.myImg0 = this.f1; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
      case 5:
        switch (n) {
          case 1: case 2: case 3: case 4: case 5: case 6: this.myImg0 = this.f1; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
      case 6:
        switch (n) {
          case 1: this.myImg0 = this.sz1; return;
          case 2: this.myImg0 = this.sz2; return;
          case 3: this.myImg0 = this.sz3; return;
          case 4: case 5: this.myImg0 = this.u1; return;
          case 6: case 7: this.myImg0 = this.sz1; return;
          case 8: this.myImg0 = this.sz2; return;
          case 9: this.myImg0 = this.sz3; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
      case 7:
        switch (n) {
          case 1: this.myImg0 = this.f1; return;
          case 2: this.myImg0 = this.f2; return;
          case 3: this.myImg0 = this.f3; return;
          case 4: this.myImg0 = this.f4; return;
          case 5: this.myImg0 = this.f1; return;
          case 6: this.myImg0 = this.f2; return;
          case 7: this.myImg0 = this.f3; return;
          case 8: this.myImg0 = this.f4; return;
          case 9: this.myImg0 = this.f1; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
      case 8:
        switch (n) {
          case 1: this.myImg0 = this.f1; return;
          case 2: this.myImg0 = this.f4; return;
          case 3: this.myImg0 = this.f3; return;
          case 4: this.myImg0 = this.f2; return;
          case 5: this.myImg0 = this.f1; return;
          case 6: this.myImg0 = this.f4; return;
          case 7: this.myImg0 = this.f3; return;
          case 8: this.myImg0 = this.f2; return;
          case 9: this.myImg0 = this.f1; return;
          case 10: this.myImg0 = this.erkezik; return;
        }
        return;
    }
  }

  renderBackground() {
    let n = 0;
    let n2 = 0;
    while (n2 < this.bgObj.numPoints) {
      if (n2 === this.bgObj.leftFirst) {
        this.bgObj.GetAbsCoord(this.bgObj.rightFirst, this.absCoord);
        this.absCoord.y = 100.0;
        this.mainCamera.Render(this.absCoord, this.xy);
        this.polyX[n2 + n] = this.xy.x + this.centerX;
        this.polyY[n2 + n] = this.xy.y + this.centerY;
        this.bgObj.GetAbsCoord(this.bgObj.leftFirst, this.absCoord);
        this.absCoord.y = 100.0;
        this.mainCamera.Render(this.absCoord, this.xy);
        ++n;
        this.polyX[n2 + n] = this.xy.x + this.centerX;
        this.polyY[n2 + n] = this.xy.y + this.centerY;
        ++n;
      }
      this.bgObj.GetAbsCoord(n2, this.absCoord);
      this.mainCamera.Render(this.absCoord, this.xy);
      this.polyX[n2 + n] = this.xy.x + this.centerX;
      this.polyY[n2 + n] = this.xy.y + this.centerY;
      ++n2;
    }
    let bk = this.bkcolors[this.round];
    let m = bk.match(/\d+/g);
    let r = Math.max(0, parseInt(m[0]) - 40);
    let g = Math.max(0, parseInt(m[1]) - 40);
    let b = Math.max(0, parseInt(m[2]) - 40);
    this.bgObj.colors[0] = "rgb(" + r + "," + g + "," + b + ")";
    this.gra.fillStyle = this.bgObj.colors[0];
    this.gra.beginPath();
    this.gra.moveTo(this.polyX[0], this.polyY[0]);
    for (let i = 1; i < this.bgObj.numPoints + 2; i++) {
      this.gra.lineTo(this.polyX[i], this.polyY[i]);
    }
    this.gra.closePath();
    this.gra.fill();
  }

  renderFloor() {
    let d = (this.horiY - this.horiMinY) / (this.horiMaxY - this.horiMinY);
    for (let n = 0; n < 8; n++) {
      this.absCoord.Set(this.floorMin[n]);
      this.absCoord.y += (this.floorMax[n].y - this.floorMin[n].y) * d - this.horiY;
      this.mainCamera.Render(this.absCoord, this.xy);
      this.polyX[n] = this.xy.x + this.centerX;
      this.polyY[n] = this.xy.y + this.centerY;
    }
    this.polyX[8] = this.width;
    this.polyY[8] = this.height;
    this.polyX[9] = 0;
    this.polyY[9] = this.height;
    this.gra.fillStyle = this.floorColor;
    this.gra.beginPath();
    this.gra.moveTo(this.polyX[0], this.polyY[0]);
    for (let i = 1; i < 10; i++) {
      this.gra.lineTo(this.polyX[i], this.polyY[i]);
    }
    this.gra.closePath();
    this.gra.fill();
  }

  moveObstacle() {
    ++this.XCounter;
    let bl = false;
    let d = 0.9;
    if (this.round >= 8) d = 1.0;
    this.mainCamera.ApplyDynamics();
    let d2 = this.mainCamera.minAngZ + (this.vx - this.minVX) * (this.mainCamera.maxAngZ - this.mainCamera.minAngZ) / (this.maxVX - this.minVX);
    this.mainCamera.mtx.Set(1.0);
    this.mainCamera.ZRot(d2);
    if (this.autoHoriFlag) this.autoHorizon();
    this.horiVY += this.horiAccY;
    if (this.horiVY < this.horiMinVY) this.horiVY = this.horiMinVY;
    else if (this.horiVY > this.horiMaxVY) this.horiVY = this.horiMaxVY;
    this.horiYOld = this.horiY;
    this.horiY += this.horiVY;
    this.horiVY *= this.horiVCsill;
    if (this.horiY < this.horiMinY) this.horiY = this.horiMinY;
    else if (this.horiY > this.horiMaxY) this.horiY = this.horiMaxY;
    this.horiY = 0.0; // forced to 0 as in Java
    this.accZ = this.accMinZ + (this.horiY - this.horiMinY) * (this.accMaxZ - this.accMinZ) / (this.horiMaxY - this.horiMinY);
    let d3 = this.mySpeedMin + (this.horiY - this.horiMinY) * (this.mySpeedMax - this.mySpeedMin) / (this.horiMaxY - this.horiMinY);
    this.accCPCsill = this.accCPMinCsill + Math.abs(this.vx) * (this.accCPMaxCsill - this.accCPMinCsill) / this.maxVX;
    d3 *= this.accCPCsill;
    this.mySpeed += this.accZ;
    if (this.accZ >= 0 && this.mySpeed > d3) this.mySpeed = d3;
    else if (this.accZ <= 0 && this.mySpeed < d3) this.mySpeed = d3;
    // Clear background
    this.gra.fillStyle = this.bkcolors[this.round];
    this.gra.fillRect(0, 0, this.width, this.height);
    let n = this.MCounter % 12 > 6 ? 0 : 2;
    this.bgObj.trans.y = this.bgMinY + (this.horiY - this.horiMinY) * (this.bgMaxY - this.bgMinY) / (this.horiMaxY - this.horiMinY);
    this.bgObj.trans.y += n;
    this.bgObj.speedFr.Set(this.vx, 0, 0);
    this.bgObj.ApplyDynamics();
    this.renderBackground();
    this.renderFloor();
    this.numObjects = 0;
    let xVector = this.absCoord;
    let obj = this.Head;
    while (obj != null) {
      let nextObj = obj.next;
      if (nextObj == null) this.lastObj = obj;
      obj.trans.y -= (this.horiY - this.horiYOld) * obj.trans.z / this.startZ;
      if (obj.type === 20) {
        let d4 = -this.horiY / this.startZ;
        let d5 = Math.atan(d4);
        obj.mtx.Set(1.0);
        obj.mtx.XRot(d5);
      }
      xVector.Set(this.myPos);
      xVector.Sub(obj.trans);
      xVector.x = 0;
      xVector.Normalize();
      xVector.Mul(this.mySpeed);
      xVector.x = this.mySpeed * this.vx;
      obj.speedFr.Set(xVector);
      obj.ApplyDynamics();
      let visible = true;
      for (let n2 = 0; n2 < obj.numPoints; n2++) {
        obj.GetAbsCoord(n2, this.absCoord);
        if (!this.mainCamera.Render(this.absCoord, this.xy)) {
          visible = false;
          break;
        }
        this.polyX[n2] = this.xy.x + this.centerX;
        this.polyY[n2] = this.xy.y + this.centerY;
        if (n2 === obj.colliYIndex) obj.colliY = this.polyY[n2];
      }
      if (visible) {
        let n3 = 0;
        let n2 = 0;
        while (n2 < obj.numPolygons) {
          let n4 = 0;
          do {
            let n5 = obj.first[n3];
            while (n5 <= obj.last[n3]) {
              this.polyX1[n4 + n5 - obj.first[n3]] = this.polyX[n5];
              this.polyY1[n4 + n5 - obj.first[n3]] = this.polyY[n5];
              ++n5;
            }
            n4 += obj.last[n3] - (obj.first[n3] - 1);
          } while (++n3 < obj.numPolyStruct && obj.polyStruct[n3] === obj.polyStruct[n3 - 1]);
          this.gra.fillStyle = obj.colors[n2];
          this.gra.beginPath();
          this.gra.moveTo(this.polyX1[0], this.polyY1[0]);
          for (let i = 1; i < n4; i++) {
            this.gra.lineTo(this.polyX1[i], this.polyY1[i]);
          }
          this.gra.closePath();
          this.gra.fill();
          ++n2;
        }
      }
      if (obj.trans.z <= this.collisionDepth || !visible) {
        if (obj === this.level9First) this.level9First = null;
        this.lastObj = obj.prev;
        if (this.checkCollision(obj)) bl = true;
        if (obj.prev != null) obj.prev.next = obj.next;
        if (obj.next != null) obj.next.prev = obj.prev;
        if (obj === this.Head) this.Head = obj.next;
        this.obstacles.deleteObj(obj);
      }
      obj = nextObj;
      ++this.numObjects;
    }
    // Jump phase sounds & scoring
    let n6 = this.mainCamera.getJumpPhase();
    switch (n6) {
      case 0:
        if (Math.abs(this.vx) < this.maxVX * 0.7) { this.pl_turn = 0; }
        else if (this.pl_turn === 0) { this.playAudio(this.turn_au); this.pl_turn = 1; }
        break;
      case 1:
        this.pl_landing = 0;
        if (this.pl_jump === 0) { this.playAudio(this.jump_au); this.pl_jump = 1; }
        break;
      case 10:
        this.pl_jump = 0;
        this.pl_bonus = 0;
        if (this.pl_landing === 0) {
          if (this.validJumpScore || this.mainCamera.isSuperJump()) {
            this.jumpNum = this.lastJumpFrames < this.jumpDoubleFrames ? ++this.jumpNum : 1;
            this.lastJumpScore = this.jumpNum * this.jumpScore(this.mainCamera.jumpType);
            this.score += this.lastJumpScore;
            let s = this.jumpArcadeName(this.mainCamera.jumpType) + " " + this.jumpNum + "x: " + this.lastJumpScore;
            this.msgAdd(this.jumpName(this.mainCamera.jumpType));
            this.msgArcadeAdd(s);
            this.lastJumpFrames = 0;
          }
          this.validJumpScore = false;
          this.playAudio(this.landing_au);
          this.pl_landing = 1;
        }
        break;
    }
    // Generate new obstacles
    ++this.counter;
    let d6 = this.startZ / this.mySpeed;
    let n7 = 1 + Math.floor(d6 / this.numObjectsRound[this.round]);
    n7 = this.numObjectsRound[this.round] <= this.numObjects ? ++n7 : --n7;
    let n8 = -1;
    if (this.counter >= n7) {
      this.counter = 0;
      obj = this.obstacles.getObj();
      if (this.Head != null) this.Head.prev = obj;
      obj.next = this.Head;
      obj.prev = null;
      this.Head = obj;
      let d8 = Math.random();
      switch (this.round) {
        case 0: n8 = d8>=0.728?1:(d8>0.66?20:(d8>0.33?10:0)); break;
        case 1: n8 = d8>=0.744?1:(d8>0.68?20:(d8>0.33?10:0)); break;
        case 2: n8 = d8>=0.76?1:(d8>0.7?20:(d8>0.33?10:0)); break;
        case 3: n8 = d8>=0.776?1:(d8>0.72?20:(d8>0.33?10:0)); break;
        case 4: n8 = d8>=0.792?1:(d8>0.74?20:(d8>0.34?10:0)); break;
        case 5: n8 = d8>=0.808?1:(d8>0.76?20:(d8>0.38?10:0)); break;
        case 6: n8 = d8>=0.824?1:(d8>0.78?20:(d8>0.42?10:0)); break;
        case 7: n8 = d8>=0.84?1:(d8>0.8?20:(d8>0.46?10:0)); break;
        case 8: n8 = 0; break;
        case 9: n8 = d8>=0.856?1:(d8>0.82?20:(d8>0.5?10:0)); break;
      }
      let d7;
      if (this.round >= 8) {
        --this.Counter;
        this.OX1 += this.vx;
        this.OX2 += this.vx;
        if (this.round >= 9 && this.Counter % 13 < 7) {
          d = 0.9;
          d7 = Math.random() * 32 - 16;
          if (d7 < this.OX2 && d7 > this.OX1) {
            d = 1.0;
            d7 = Math.random() > 0.5 ? this.OX1 : this.OX2;
          }
        } else {
          d7 = this.Counter % 2 === 0 ? this.OX1 : this.OX2;
        }
        if (this.OX2 - this.OX1 > 9) {
          this.OX1 += 0.6; this.OX2 -= 0.6;
          if (this.OX2 - this.OX1 > 10) d = 1.0;
        } else if (this.OX1 > 18) {
          this.OX2 -= 0.6; this.OX1 -= 0.6;
        } else if (this.OX2 < -18) {
          this.OX2 += 0.6; this.OX1 += 0.6;
        } else {
          if (this.Counter < 0) {
            this.Direction = -this.Direction;
            this.Counter += 2 * Math.floor(Math.random() * 8 + 4);
          }
          this.OVX = this.Direction > 0 ? (this.OVX += 0.125) : (this.OVX -= 0.125);
          if (this.OVX > 0.7) this.OVX = 0.7;
          if (this.OVX < -0.7) this.OVX = -0.7;
          this.OX1 += this.OVX;
          this.OX2 += this.OVX;
        }
      } else {
        d7 = Math.random() * 32 - 16;
      }
      if (this.round !== 8) {
        d7 *= 2.0;
        let d9 = -this.vx * this.genMaxX / this.maxVX;
        if (d9 > this.genX) this.genX += this.genV;
        else if (d9 < this.genX) this.genX -= this.genV;
        d7 += this.genX;
      } else {
        d7 *= 2.0;
      }
      this.absCoord.Set(d7, -this.horiY, this.startZ);
      obj.type = n8;
      obj.buildObj(this.absCoord, d * 2.0);
      if (this.firstObj && this.round === 8) {
        this.level9First = obj;
        this.firstObj = false;
      }
    }
    return bl;
  }

  msgAdd(s) {
    ++this.msgNum;
    if (this.msgNum > this.maxMsgNum) this.msgNum = this.maxMsgNum;
    for (let i = this.msgNum - 1; i > 0; i--) {
      this.msg[i] = this.msg[i - 1];
      this.msgValidity[i] = this.msgValidity[i - 1];
    }
    this.msg[0] = s;
    this.msgValidity[0] = this.msgValidFrames;
  }

  msgArcadeAdd(s) {
    this.msgArcade = s;
    this.msgArcadeValidity = this.arcadeMsgValidity;
  }

  msgArcadeClear() { this.msgArcadeValidity = 0; this.msgArcade = ""; }

  msgArcadeDisplay() {
    if (this.msgArcadeValidity > 0) --this.msgArcadeValidity;
    else return;
    if (this.msgArcadeValidity % 10 < 3) return;
    this.gra.fillStyle = "red";
    this.gra.font = "bold " + this.msgFontHeight + "px Arial";
    let w = this.gra.measureText(this.msgArcade).width;
    this.gra.fillText(this.msgArcade, this.centerX - w / 2, 40);
  }

  msgClear() { this.msgNum = 0; }

  msgDisplay() {
    if (this.oldLevel !== this.round) {
      this.oldLevel = this.round;
      this.defMsgValidity = this.msgValidFrames;
      this.parent.setLevel("Level " + (this.round + 1) + "  ");
      this.parent.setHiScore(this.getLimitstr() + "       Your Hi-score: " + this.hiscore);
    } else {
      if (this.defMsgValidity > 0) --this.defMsgValidity;
      if (this.defMsgValidity === 1) {
        this.parent.setLevel("Level " + (this.round + 1) + "  ");
        this.parent.setHiScore(this.getLimitstr() + "       Your Hi-score: " + this.hiscore);
      }
    }
    if (this.msgNum !== 0) {
      for (let i = 0; i < this.msgNum; i++) {
        if (this.msgValidity[i] === this.msgValidFrames) this.parent.setMsg(this.msg[i]);
        this.msgValidity[i]--;
      }
      if (this.msgValidity[this.msgNum - 1] === 0) --this.msgNum;
    } else {
      this.parent.setMsg("");
    }
    this.parent.setScore("Score: " + this.form1000(this.score));
  }

  msgLevelAdd(s) { this.msgLevel = s; this.msgLevelValidity = this.levelMsgValidity; }
  msgLevelClear() { this.msgLevelValidity = 0; this.msgLevel = ""; }

  msgLevelDisplay() {
    if (this.msgLevelValidity > 0) --this.msgLevelValidity;
    else return;
    this.gra.fillStyle = "red";
    this.gra.font = "bold " + this.msgFontHeight + "px Arial";
    let w = this.gra.measureText(this.msgLevel).width;
    this.gra.fillText(this.msgLevel, this.centerX - w / 2, 80);
  }

  prt() {
    if (this.score > this.clearScore[this.round]) {
      ++this.round;
      if (this.round > 9) this.round = 9;
      this.msgLevelAdd("Level " + (this.round + 1));
      this.jumpNum = 1;
      if (this.round === 8) this.firstObj = true;
    }
    this.score = this.round === 8 ? (this.score += 100) : ++this.score;
    ++this.MCounter;
    this.myImg0 = null;
    this.snowImg0 = null;
    this.shadowImg0 = null;
    let n = this.BIG ? 170 : 113;
    if (this.damaged < 20 && this.gameMode === 0) {
      let n2 = this.MCounter % 4;
      this.myImg0 = n2 < 2 ? this.myImg1 : this.myImg2;
      if (this.MCounter % 12 > 6) n = this.BIG ? 165 : 110;
      if (this.vx < -0.2) this.myImg0 = n2 < 2 ? this.myImg5 : this.myImg6;
      if (this.vx > 0.2) this.myImg0 = n2 < 2 ? this.myImg7 : this.myImg8;
      let n3 = this.mainCamera.getJumpPhase();
      this.setJumpAnim(n3);
      if (n3 === 0 || n3 === 10) {
        switch (this.MCounter % 3) {
          case 0:
            if (this.vx < -0.4) this.snowImg0 = this.snowImgR1;
            else if (this.vx > 0.4) this.snowImg0 = this.snowImgL1;
            else this.snowImg0 = this.snowImg1;
            break;
          case 1:
            if (this.vx < -0.4) this.snowImg0 = this.snowImgR2;
            else if (this.vx > 0.4) this.snowImg0 = this.snowImgL2;
            else this.snowImg0 = this.snowImg2;
            break;
          case 2:
            if (this.vx < -0.4) this.snowImg0 = this.snowImgR3;
            else if (this.vx > 0.4) this.snowImg0 = this.snowImgL3;
            else this.snowImg0 = this.snowImg3;
            break;
        }
        this.shadowImg0 = null;
      } else {
        if (!this.mainCamera.isSuperJump()) {
          if (this.myImg0 === this.u1) this.shadowImg0 = this.u1a;
          else if (this.myImg0 === this.sz1) this.shadowImg0 = this.sz1a;
          else if (this.myImg0 === this.sz2) this.shadowImg0 = this.sz2a;
          else if (this.myImg0 === this.sz3) this.shadowImg0 = this.sz3a;
          else if (this.myImg0 === this.f1) this.shadowImg0 = this.f1a;
          else if (this.myImg0 === this.f2) this.shadowImg0 = this.f2a;
          else if (this.myImg0 === this.f3) this.shadowImg0 = this.f3a;
          else if (this.myImg0 === this.f4) this.shadowImg0 = this.f4a;
          else this.shadowImg0 = null;
        } else {
          this.shadowImg0 = null;
        }
      }
      if (this.damaged !== 0) {
        if (this.damaged <= 2) this.snowImg0 = this.snowDie1;
        else if (this.damaged <= 4) this.snowImg0 = this.snowDie2;
        else if (this.damaged <= 6) this.snowImg0 = this.snowDie3;
        else if (this.damaged <= 10) this.snowImg0 = this.snowDie4;
        else this.snowImg0 = null;
        if (this.damaged <= 3) this.myImg0 = this.sz1;
        else if (this.damaged <= 6) this.myImg0 = this.sz2;
        else if (this.damaged <= 10) this.myImg0 = this.sz3;
        else this.myImg0 = null;
        ++this.damaged;
      }
    }
    if (this.damaged === 0 && this.gameMode === 0) {
      if (this.rFlag) this.vx -= 0.11;
      if (this.lFlag) this.vx += 0.11;
      if (this.vx < -0.6) this.vx = -0.6;
      if (this.vx > 0.6) this.vx = 0.6;
    }
    if (!this.lFlag && !this.rFlag) {
      if (this.vx < 0) { this.vx += 0.025; if (this.vx > 0) this.vx = 0; }
      if (this.vx > 0) { this.vx -= 0.025; if (this.vx < 0) this.vx = 0; }
    }
    // Draw player sprites
    if (this.damaged < 20 && this.gameMode === 0) {
      if (this.snowImg0 != null && this.snowImg0.complete) {
        this.getImgDiff(this.snowImg0);
        if (this.damaged > 0) {
          this.gra.drawImage(this.snowImg0, this.centerX - 2 * this.mywidth2 + this.xy.x, this.height - n + this.xy.y);
        } else {
          this.gra.drawImage(this.snowImg0, this.centerX - this.mywidth2 + this.xy.x, this.height - n + this.xy.y);
        }
      }
      if (this.shadowImg0 != null && this.shadowImg0.complete && this.damaged === 0) {
        this.getImgDiff(this.shadowImg0);
        this.gra.drawImage(this.shadowImg0, this.centerX - this.mywidth2 + this.xy.x, this.height - n + this.xy.y);
      }
      if (this.myImg0 != null && this.myImg0.complete) {
        this.getImgDiff(this.myImg0);
        let drawN = n;
        if (this.damaged !== 0) drawN -= this.damaged * n / 10;
        this.gra.drawImage(this.myImg0, this.centerX - this.mywidth2 + this.xy.x, this.height - drawN + this.xy.y);
      }
    }
    // Flip to screen
    this.ctx.drawImage(this.offCanvas, 0, 0);
  }

  playAudio(au) {
    if (!au) return;
    try {
      au.currentTime = 0;
      au.play().catch(() => {});
    } catch(e) {}
  }

  stopAudio(au) {
    if (!au) return;
    try {
      au.pause();
      au.currentTime = 0;
    } catch(e) {}
  }

  demo() {
    this.isDemo = true;
    this.gameMode = 2;
    this.clearObstacle();
    this.damaged = 0;
    this.counter = 0;
    this.round = 0;
    this.score = 0;
    this.vx = 0.0;
    this.outOfDemo = false;
    this.prevTime = performance.now();
    // Demo shows "Click here or press SPACE" text on top of the running game
    this._demoLoop();
  }

  // Schedule next frame targeting frameDelay ms per frame
  _scheduleFrame(callback) {
    if (this.frameDelay <= 16) {
      // Xtreme: use requestAnimationFrame for smooth 60fps
      this._animFrameId = requestAnimationFrame(() => {
        this.prevTime = performance.now();
        callback();
      });
      this._animFrameIsRAF = true;
    } else {
      let now = performance.now();
      let elapsed = now - (this.prevTime || now);
      let delay = Math.max(0, this.frameDelay - elapsed);
      this._animFrameId = setTimeout(() => {
        this.prevTime = performance.now();
        callback();
      }, delay);
      this._animFrameIsRAF = false;
    }
  }

  _cancelFrame() {
    if (this._animFrameId) {
      if (this._animFrameIsRAF) cancelAnimationFrame(this._animFrameId);
      else clearTimeout(this._animFrameId);
      this._animFrameId = null;
    }
  }

  _demoLoop() {
    try {
      if (!this.fut || !this.isDemo) return;
      this.moveObstacle();
      // Draw demo text before prt flips to screen
      this.gra.fillStyle = "red";
      this.gra.font = "15px Arial";
      let txt = "Click here or press SPACE";
      let w = this.gra.measureText(txt).width;
      this.gra.fillText(txt, this.centerX - w / 2, this.centerY + 40);
      this.prt();
      this.score = 0;
      this._scheduleFrame(() => this._demoLoop());
    } catch(e) {
      console.error("Demo error:", e);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,this.width,this.height);
      this.ctx.fillStyle = "red";
      this.ctx.font = "12px monospace";
      this.ctx.fillText("DEMO ERR: " + e.message, 5, 20);
      if(e.stack) this.ctx.fillText(e.stack.split("\n")[1]||"", 5, 36);
    }
  }

  run() {
    this.XCounter = 0;
    ++this.gameStart;
    if (this.gameMode > 0) {
      this.demo();
      return;
    }
    this.clearObstacle();
    this.damaged = 0;
    this.counter = 0;
    this.round = 0;
    this.score = 0;
    this.vx = 0.0;
    if (this.isContinue) {
      while (this.hiscore >= this.clearScore[this.round]) ++this.round;
      if (this.round === 8) this.firstObj = true;
    }
    if (this.round > 0) this.score = this.clearScore[this.round - 1];
    this.OX1 = this.OX1min;
    this.OX2 = this.OX2max;
    this.OVX = 0;
    this.Counter = 0;
    this.Direction = 1;
    this.mainCamera.superJumpCounter = 0;
    if (this.pl_wind === 0 && !this.parent.DEMO) {
      this.playAudio(this.wind_loop_au);
      this.pl_wind = 1;
    }
    this.msgLevelAdd("Level " + (this.round + 1));
    this.MCounter = 0;
    this.validJumpScore = false;
    this.outOfRun = false;
    this.prevTime = performance.now();
    this._gameLoop();
  }

  _gameLoop() {
    try { this._gameLoopInner(); } catch(e) {
      console.error("Game error:", e);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,this.width,this.height);
      this.ctx.fillStyle = "red";
      this.ctx.font = "12px monospace";
      this.ctx.fillText("GAME ERR: " + e.message, 5, 20);
      if(e.stack) this.ctx.fillText(e.stack.split("\n")[1]||"", 5, 36);
    }
  }
  _gameLoopInner() {
    if (!this.fut) {
      this._endGame();
      return;
    }
    ++this.colliFrames;
    ++this.lastJumpFrames;
    let collided = this.moveObstacle();
    if (collided) {
      if (this.colliObjType === 0 || this.colliObjType === 10) {
        // Tree or trunk collision = death
        this._endGame();
        return;
      }
      if (this.colliObjType === 1) {
        this.jumpType = Math.abs(this.vx) < this.maxVX / 3.0 ? 3 : (this.vx < 0 ? 4 : 5);
        let vy = this.mySpeed < this.highSpeed ? -(this.mySpeedMax + 1.0 - this.mySpeed) : -(this.mySpeedMax + 1.0 - this.highSpeed);
        this.mainCamera.Jump(vy, this.gravity, false, this.colliObjType, this.jumpType);
        this.jumpType = this.mainCamera.jumpType;
        this.validJumpScore = true;
      } else if (this.colliObjType === 20) {
        this.jumpType = this.mySpeed <= this.slowSpeed
          ? (Math.abs(this.vx) < this.maxVX / 3.0 ? 3 : (this.vx < 0 ? 4 : 5))
          : (Math.abs(this.vx) < this.maxVX / 3.0 ? 0 : (this.vx < 0 ? 1 : 2));
        let vy = this.mySpeed < this.highSpeed ? -this.mySpeed : -this.highSpeed;
        this.mainCamera.Jump(vy, this.gravity, false, this.colliObjType, this.jumpType);
        this.jumpType = this.mainCamera.jumpType;
        this.validJumpScore = true;
      }
    }
    this.msgDisplay();
    this.msgArcadeDisplay();
    this.msgLevelDisplay();
    this.prt();
    // Level 9 gate check
    if (this.round === 8 && !this.firstObj && this.level9First == null) {
      let x1 = 0, x2 = 0, x3 = 0, x4 = 0;
      if (this.lastObj != null) {
        x1 = this.lastObj.trans.x;
        if (this.lastObj.prev != null) {
          x2 = this.lastObj.prev.trans.x;
          if (this.lastObj.prev.prev != null) {
            x3 = this.lastObj.prev.prev.trans.x;
            if (this.lastObj.prev.prev.prev != null) x4 = this.lastObj.prev.prev.prev.trans.x;
          }
        }
      }
      if ((x1 < 0 && x2 < 0 && x3 < 0 && x4 < 0) || (x1 > 0 && x2 > 0 && x3 > 0 && x4 > 0)) {
        this._endGame();
        return;
      }
    }
    this._scheduleFrame(() => this._gameLoop());
  }

  _endGame() {
    this.fut = true;
    this.outOfRun = true;
    this.playAudio(this.collision_au);
    this.damaged = 1;
    this.validJumpScore = false;
    this.firstObj = false;
    this.level9First = null;
    this.msgClear();
    this.msgArcadeClear();
    let savedScore = this.score;
    --savedScore;
    // Death animation: 30 frames
    let deathFrame = 1;
    const deathLoop = () => {
      if (deathFrame >= 30) {
        this.score = savedScore;
        if (this.score > this.hiscore) this.hiscore = this.score;
        this.parent.setHiScore(this.getLimitstr() + "       Your Hi-score: " + this.form1000(this.hiscore));
        this.startFlag = false;
        this.gameMode = 1;
        this.demo();
        return;
      }
      this.moveObstacle();
      this.prt();
      ++deathFrame;
      this._scheduleFrame(deathLoop);
    };
    this._scheduleFrame(deathLoop);
  }

  startGame(start) {
    if (this.startFlag) return;
    if (start) {
      this.startFlag = true;
      this.gameMode = 0;
    } else if (this.gameMode === 0) {
      this.gameMode = 1;
    }
    // Cancel demo if running
    this._cancelFrame();
    this.isDemo = false;
    this.fut = true;
    this.run();
  }

  stop() {
    this._cancelFrame();
    if (this.pl_wind === 1) {
      this.stopAudio(this.wind_loop_au);
      this.pl_wind = 0;
    }
    this.startFlag = false;
    this.gameMode = 0;
  }

  keyDown(code) {
    if (this.outOfDemo && this.outOfRun) return;
    if (!this.isLoaded) return;
    if (code === "ArrowRight" || code === "KeyL") this.rFlag = true;
    if (code === "ArrowLeft" || code === "KeyJ") this.lFlag = true;
    if (code === "KeyA") this.spcFlag = true;
    if (code === "Space" && this.damaged === 0 && this.startFlag && this.mainCamera.getJumpPhase() !== 10) {
      this.jumpType = Math.abs(this.vx) < this.maxVX / 3.0 ? 3 : (this.vx < 0 ? 4 : 5);
      let vy = this.mySpeed < this.highSpeed ? -(this.mySpeedMax + 1.0 - this.mySpeed) : -(this.mySpeedMax + 1.0 - this.highSpeed);
      this.mainCamera.Jump(vy, this.gravity, true, -1, this.jumpType);
      this.jumpType = this.mainCamera.jumpType;
      if (this.mainCamera.isSuperJump() && this.pl_bonus === 0) {
        this.playAudio(this.bonus_au);
        this.pl_bonus = 1;
      }
    }
    if (!this.startFlag && this.isDemo && (code === "KeyR" || code === "Space")) {
      this.spacePushed = true;
    }
  }

  keyUp(code) {
    if (code === "ArrowRight" || code === "KeyL") this.rFlag = false;
    if (code === "ArrowLeft" || code === "KeyJ") this.lFlag = false;
    if (code === "KeyA") this.spcFlag = false;
    if (this.outOfDemo && this.outOfRun) return;
    if (!this.startFlag && this.spacePushed && this.isDemo && (code === "KeyR" || code === "Space")) {
      this.jumpNum = 1;
      this.spacePushed = false;
      this.isDemo = false;
      this.isContinue = code === "Space";
      this.startGame(true);
      this.outOfDemo = true;
    }
  }

  mouseMove(x, y) {
    this.mouseX = x;
    this.mouseY = y;
  }

  touchUpdate(touches, rect) {
    let hasLeft = false, hasRight = false, hasMiddle = false;
    let leftEnd = rect.width * 0.283;
    let rightStart = rect.width * 0.717;
    for (let i = 0; i < touches.length; i++) {
      let x = touches[i].clientX - rect.left;
      if (x < leftEnd) hasLeft = true;
      else if (x >= rightStart) hasRight = true;
      else hasMiddle = true;
    }
    this.lFlag = hasLeft;
    this.rFlag = hasRight;
    // Jump on new middle touch (like Space keyDown)
    if (hasMiddle && !this._touchJumpHeld) {
      this._touchJumpHeld = true;
      if (this.damaged === 0 && this.startFlag && this.mainCamera.getJumpPhase() !== 10) {
        this.jumpType = Math.abs(this.vx) < this.maxVX / 3.0 ? 3 : (this.vx < 0 ? 4 : 5);
        let vy = this.mySpeed < this.highSpeed ? -(this.mySpeedMax + 1.0 - this.mySpeed) : -(this.mySpeedMax + 1.0 - this.highSpeed);
        this.mainCamera.Jump(vy, this.gravity, true, -1, this.jumpType);
        this.jumpType = this.mainCamera.jumpType;
        if (this.mainCamera.isSuperJump() && this.pl_bonus === 0) {
          this.playAudio(this.bonus_au);
          this.pl_bonus = 1;
        }
      }
    }
    if (!hasMiddle) this._touchJumpHeld = false;
    // Start game from demo on any touch
    if (touches.length > 0 && !this.startFlag && this.isDemo) {
      this.isDemo = false;
      this.isContinue = true;
      this.startGame(true);
    }
  }

  mouseDown(e) {
    if (this.outOfDemo && this.outOfRun) return;
    if (!this.isLoaded) return;
    if (e.button === 2) { this.rFlag = true; this.lFlag = false; }
    else if (e.button === 0) { this.rFlag = false; this.lFlag = true; }
    if (this.startFlag) return;
    if (!this.isDemo) return;
    this.isDemo = false;
    this.isContinue = true;
    this.startGame(true);
  }

  mouseUp(e) {
    this.rFlag = false;
    this.lFlag = false;
  }
}
