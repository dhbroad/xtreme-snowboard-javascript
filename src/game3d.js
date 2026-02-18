class game3d {
  constructor() {
    this.loadedMultiMedia = false;
    this.enableLoadMultiMedia = true;
    this.BIG = true;
    this.DEMO = false;
    this.lang = 0;
    this.userid = null;
    this.isWindows = false;
    this.demoType = 9;
    this.startTime = 0;
    this.sendTime = 0;
    this.sgiThread = null;
    this.game = null;
    // UI label elements
    this.scoreLabel = null;
    this.msgLabel = null;
    this.hiScoreLabel = null;
    this.levelLabel = null;
  }

  async init() {
    this.startTime = performance.now();
    this.BIG = true;
    this.DEMO = false;
    // Get UI elements
    this.scoreLabel = document.getElementById("scoreLabel");
    this.msgLabel = document.getElementById("msgLabel");
    this.hiScoreLabel = document.getElementById("hiScoreLabel");
    this.levelLabel = document.getElementById("levelLabel");
    // Create maingame
    this.game = new maingame(this);
    this.game.init();
    // Show loading
    this.updateLoading(0, 1);
    // Load images
    await this.game.loadImages();
    this.loadedMultiMedia = true;
    // Start the game in demo mode
    this.game.startGame(false);
  }

  updateLoading(loaded, total) {
    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");
    let pct = total > 0 ? loaded / total : 0;
    ctx.fillStyle = "rgb(57,67,128)";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 
            Math.PI / 2, Math.PI / 2 - 2 * Math.PI * pct, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(194,193,214)";
    ctx.font = "32px Arial";
    ctx.fillText("Loading...", canvas.width / 2 - 55, canvas.height / 2);
  }

  setScore(s) { if (this.scoreLabel) this.scoreLabel.textContent = s; }
  setMsg(s) { if (this.msgLabel) this.msgLabel.textContent = s; }
  setHiScore(s) { if (this.hiScoreLabel) this.hiScoreLabel.textContent = s; }
  setLevel(s) { if (this.levelLabel) this.levelLabel.textContent = s; }

  setDifficulty(frameDelay) {
    if (this.game) {
      this.game.frameDelay = frameDelay;
      // Reset game back to demo mode
      this.game._cancelFrame();
      if (this.game.pl_wind === 1) {
        this.game.stopAudio(this.game.wind_loop_au);
        this.game.pl_wind = 0;
      }
      this.game.startFlag = false;
      this.game.isDemo = false;
      this.game.fut = true;
      this.game.gameMode = 1;
      this.game.demo();
    }
  }

  setupEvents() {
    document.addEventListener("keydown", (e) => {
      if (["Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
        e.preventDefault();
      }
      if (this.game) this.game.keyDown(e.code);
    });
    document.addEventListener("keyup", (e) => {
      if (this.game) this.game.keyUp(e.code);
    });
    let canvas = document.getElementById("gameCanvas");
    canvas.addEventListener("mousemove", (e) => {
      if (this.game) {
        let rect = canvas.getBoundingClientRect();
        this.game.mouseMove(e.clientX - rect.left, e.clientY - rect.top);
      }
    });
    canvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (this.game) this.game.mouseDown(e);
    });
    canvas.addEventListener("mouseup", (e) => {
      if (this.game) this.game.mouseUp(e);
    });
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}

// Entry point
window.addEventListener("load", async () => {
  try {
    let app = new game3d();
    window._app = app;
    app.setupEvents();
    // Wire difficulty selector
    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        app.setDifficulty(parseInt(e.target.value));
      });
    });
    await app.init();
  } catch(e) {
    console.error(e);
    let c = document.getElementById("gameCanvas");
    let ctx = c.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = "red";
    ctx.font = "14px monospace";
    ctx.fillText("ERROR: " + e.message, 10, 30);
    ctx.fillText(e.stack ? e.stack.split("\n")[1] : "", 10, 50);
  }
});
window.addEventListener("error", (e) => {
  console.error("Uncaught:", e.error || e.message);
});
