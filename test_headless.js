// Headless test: mock DOM and run a few game frames to catch runtime errors
const fs = require('fs');

// Mock DOM with drawing capture
class MockCtx {
  constructor() { this.fillStyle = ''; this.font = ''; this.ops = []; this._path = []; }
  fillRect(x,y,w,h) { this.ops.push({type:'fillRect',x,y,w,h,color:this.fillStyle}); }
  fillText(t,x,y) { this.ops.push({type:'fillText',text:t,x,y}); }
  beginPath() { this._path = []; }
  moveTo(x,y) { this._path.push({x,y}); }
  lineTo(x,y) { this._path.push({x,y}); }
  closePath() {}
  fill() { this.ops.push({type:'fillPoly',points:[...this._path],color:this.fillStyle}); }
  arc() {} drawImage() {} measureText() { return { width: 100 }; }
}
class MockCanvas {
  constructor() { this.width = 480; this.height = 300; this._ctx = new MockCtx(); }
  getContext() { return this._ctx; }
}
class MockImage {
  constructor() { this.complete = true; this.width = 44; this.height = 57; }
  set src(v) { if (this.onload) setTimeout(() => this.onload(), 0); }
}
class MockAudio {
  constructor() {}
  set preload(v) {}
  play() { return Promise.resolve(); }
}
global.document = {
  getElementById: (id) => {
    if (id === 'gameCanvas') return new MockCanvas();
    return { textContent: '' };
  },
  createElement: (tag) => {
    if (tag === 'canvas') return new MockCanvas();
    return {};
  },
  addEventListener: () => {},
};
global.window = { addEventListener: () => {} };
global.Image = MockImage;
global.Audio = MockAudio;
global.requestAnimationFrame = (cb) => { return 1; };
global.cancelAnimationFrame = () => {};
global.performance = { now: () => Date.now() };

// Load all source files
const files = ['XVector.js','XMatrix.js','RenderedXY.js','XCamera.js','obstacle.js','BackgroundObject.js','freeobj.js','maingame.js','game3d.js'];
let code = '';
for (const f of files) { code += fs.readFileSync('src/'+f,'utf8') + '\n'; }

// Run the game initialization and several demo frames
code += `
try {
  let app = new game3d();
  console.log("game3d created");
  
  // Manual init without async
  app.BIG = true;
  app.DEMO = false;
  app.scoreLabel = { textContent: '' };
  app.msgLabel = { textContent: '' };
  app.hiScoreLabel = { textContent: '' };
  app.levelLabel = { textContent: '' };
  
  app.game = new maingame(app);
  app.game.init();
  console.log("maingame init OK, startZ=" + app.game.startZ + " width=" + app.game.width);
  
  // Skip image loading, mark as loaded
  app.game.isLoaded = true;
  app.loadedMultiMedia = true;
  
  // Manually create mock images
  let imgNames = ['myImg1','myImg2','myImg5','myImg6','myImg7','myImg8','u1','sz1','sz2','sz3',
    'f1','f2','f3','f4','erkezik','snowImg1','snowImg2','snowImg3',
    'snowImgL1','snowImgL2','snowImgL3','snowImgR1','snowImgR2','snowImgR3',
    'snowDie1','snowDie2','snowDie3','snowDie4',
    'u1a','sz1a','sz2a','sz3a','f1a','f2a','f3a','f4a'];
  for (let name of imgNames) {
    app.game[name] = new Image();
  }
  
  // Start demo
  app.game.gameMode = 1;
  app.game.fut = true;
  app.game.isDemo = false;
  
  // Call run() which calls demo()
  // But demo() calls _demoLoop which uses requestAnimationFrame
  // So let's manually call the demo setup and loop
  app.game.isDemo = true;
  app.game.gameMode = 2;
  app.game.clearObstacle();
  app.game.damaged = 0;
  app.game.counter = 0;
  app.game.round = 0;
  app.game.score = 0;
  app.game.vx = 0.0;
  app.game.outOfDemo = false;
  
  console.log("Demo setup OK, running frames...");
  
  // Run 30 frames of the demo loop manually
  for (let frame = 0; frame < 30; frame++) {
    app.game.moveObstacle();
    app.game.prt();
    app.game.score = 0;
  }
  
  // Verify rendering output from last frame
  let gra = app.game.gra;
  let polys = gra.ops.filter(o => o.type === 'fillPoly');
  let rects = gra.ops.filter(o => o.type === 'fillRect');
  console.log("30 demo frames OK!");
  console.log("  mySpeed=" + app.game.mySpeed.toFixed(3));
  console.log("  numObjects=" + app.game.numObjects);
  console.log("  MCounter=" + app.game.MCounter);
  console.log("  Head=" + (app.game.Head ? "exists (type=" + app.game.Head.type + ")" : "null"));
  console.log("  Drawing ops: " + gra.ops.length + " (polys=" + polys.length + " rects=" + rects.length + ")");
  
  // Verify background polygon exists (mountains)
  let bgPoly = polys.find(p => p.points.length > 30);
  if (bgPoly) {
    console.log("  Background mountain: " + bgPoly.points.length + " pts, color=" + bgPoly.color);
    let minY = Math.min(...bgPoly.points.map(p=>p.y));
    let maxY = Math.max(...bgPoly.points.map(p=>p.y));
    console.log("    Y range: " + minY.toFixed(0) + " to " + maxY.toFixed(0));
  } else {
    console.log("  WARNING: No background mountain polygon found!");
  }
  
  // Verify floor polygon exists (snow)
  let floorPoly = polys.find(p => p.points.length === 10 && p.color.includes("240"));
  if (floorPoly) {
    console.log("  Floor polygon: 10 pts, color=" + floorPoly.color);
  } else {
    console.log("  WARNING: No floor polygon found!");
  }
  
  // Verify obstacle polygons exist
  let obstaclePols = polys.filter(p => p.points.length < 30 && p.points.length > 2 && !p.color.includes("240"));
  console.log("  Obstacle polygons: " + obstaclePols.length);
  for (let op of obstaclePols.slice(0,3)) {
    console.log("    " + op.points.length + " pts, color=" + op.color);
  }
  
  // Clear ops for next batch
  gra.ops = [];
  
  // Run 30 more frames
  for (let frame = 0; frame < 30; frame++) {
    app.game.moveObstacle();
    app.game.prt();
    app.game.score = 0;
  }
  
  console.log("60 demo frames OK!");
  console.log("  mySpeed=" + app.game.mySpeed.toFixed(3));
  console.log("  numObjects=" + app.game.numObjects);
  
  // Test starting an actual game
  app.game.startFlag = true;
  app.game.gameMode = 0;
  app.game.isDemo = false;
  app.game.fut = true;
  app.game.clearObstacle();
  app.game.damaged = 0;
  app.game.counter = 0;
  app.game.round = 0;
  app.game.score = 0;
  app.game.vx = 0.0;
  
  // Run 30 game frames
  for (let frame = 0; frame < 30; frame++) {
    let collided = app.game.moveObstacle();
    app.game.prt();
    if (collided) {
      console.log("  Collision at frame " + frame + " type=" + app.game.colliObjType);
      break;
    }
  }
  
  console.log("Game frames OK!");
  console.log("  mySpeed=" + app.game.mySpeed.toFixed(3));
  console.log("  score=" + app.game.score);
  
  // Test full game cycle: demo -> start -> play -> die -> demo
  console.log("\\nTesting full game cycle...");
  
  // Reset to demo mode
  app.game.startFlag = false;
  app.game.gameMode = 2;
  app.game.isDemo = true;
  app.game.fut = true;
  app.game.clearObstacle();
  app.game.damaged = 0;
  app.game.counter = 0;
  app.game.round = 0;
  app.game.score = 0;
  app.game.vx = 0.0;
  app.game.outOfDemo = false;
  
  // Run 10 demo frames
  for (let i = 0; i < 10; i++) {
    app.game.moveObstacle();
    app.game.prt();
    app.game.score = 0;
  }
  console.log("  Demo: gameMode=" + app.game.gameMode + " isDemo=" + app.game.isDemo);
  
  // Simulate clicking to start game
  app.game.isDemo = false;
  app.game.isContinue = true;
  app.game.startFlag = true;
  app.game.gameMode = 0;
  app.game.fut = true;
  // Replicate run() setup
  app.game.clearObstacle();
  app.game.damaged = 0;
  app.game.counter = 0;
  app.game.round = 0;
  app.game.score = 0;
  app.game.vx = 0.0;
  app.game.OX1 = app.game.OX1min;
  app.game.OX2 = app.game.OX2max;
  app.game.OVX = 0;
  app.game.Counter = 0;
  app.game.Direction = 1;
  app.game.mainCamera.superJumpCounter = 0;
  app.game.MCounter = 0;
  app.game.validJumpScore = false;
  app.game.outOfRun = false;
  app.game.colliFrames = 0;
  app.game.lastJumpFrames = 0;
  
  // Play 100 game frames
  let died = false;
  for (let i = 0; i < 100; i++) {
    ++app.game.colliFrames;
    ++app.game.lastJumpFrames;
    let collided = app.game.moveObstacle();
    if (collided && (app.game.colliObjType === 0 || app.game.colliObjType === 10)) {
      console.log("  Died at frame " + i + " (type=" + app.game.colliObjType + " score=" + app.game.score + ")");
      died = true;
      // Simulate death animation
      app.game.damaged = 1;
      for (let j = 0; j < 30; j++) {
        app.game.moveObstacle();
        app.game.prt();
      }
      console.log("  Death animation complete, damaged=" + app.game.damaged);
      break;
    }
    if (collided && app.game.colliObjType === 1) {
      console.log("  Hill bounce at frame " + i);
    }
    if (collided && app.game.colliObjType === 20) {
      console.log("  Ramp launch at frame " + i);
    }
    app.game.prt();
  }
  
  if (!died) console.log("  Survived 100 frames! score=" + app.game.score);
  
  // Verify game can return to demo
  app.game.startFlag = false;
  app.game.gameMode = 2;
  app.game.isDemo = true;
  app.game.clearObstacle();
  app.game.damaged = 0;
  app.game.score = 0;
  for (let i = 0; i < 5; i++) {
    app.game.moveObstacle();
    app.game.prt();
    app.game.score = 0;
  }
  console.log("  Back to demo OK, gameMode=" + app.game.gameMode);
  
  console.log("\\nALL HEADLESS TESTS PASSED");
} catch(e) {
  console.error("ERROR:", e.message);
  console.error(e.stack);
}
`;

eval(code);
