class XCamera {
  constructor(d, dx, dy, maxX, maxY) {
    this.d = d || 1.85;
    this.dx = dx || 3.2;
    this.dy = dy || 2.0;
    this.maxX = maxX || 0;
    this.maxY = maxY || 0;
    this.trans = new XVector();
    this.speedFr = new XVector();
    this.accFr = new XVector();
    this.mtx = new XMatrix(1.0);
    this.invMtx = new XMatrix();
    this.invMtx.Invert(this.mtx);
    this.minAngZ = -0.25;
    this.maxAngZ = 0.25;
    this.state = 0;
    this.stateCounter = 0;
    this.y0 = 0;
    this.y = 0;
    this.v0 = 0;
    this.v = 0;
    this.gravity = 0;
    this.jumpCounter = 0;
    this.jumpType = 0;
    this.spaceJump = false;
    this.superJump = false;
    this.launchObjType = -1;
    this.v11 = new XVector();
    this.v22 = new XVector();
    this.superJumpCounter = 0;
    this._0=0; this._1=0; this._2=0; this._3=0; this._4=0; this._5=0; this._6=0;
    this.__0=0; this.__1=0; this.__2=0; this.__3=0;
    this._7=0; this._8=0; this._9=0; this._10=0;
  }

  ApplyDynamics() {
    ++this.stateCounter;
    if (this.state === 2) {
      if (this.stateCounter > 5) { this.state = 0; this.stateCounter = 0; }
      return;
    }
    if (this.state === 0) return;
    ++this.jumpCounter;
    this.v = this.v0 + this.jumpCounter * this.gravity;
    this.trans.y = this.y = this.y0 + this.v0 * this.jumpCounter + this.gravity * this.jumpCounter * this.jumpCounter / 2.0;
    if ((this.gravity < 0 && this.trans.y < -2.0) || (this.gravity > 0 && this.trans.y > -2.0)) {
      this.state = 2;
      this.trans.y = -2.0;
      this.stateCounter = 0;
      this.superJump = false;
    }
  }

  FOVX() { return this.dx / this.d; }
  FOVY() { return this.dy / this.d; }

  Jump(d, d2, bl, n, n2) {
    if (!bl) {
      this.spaceJump = false;
      this.launchObjType = n;
      this.jumpType = n2;
      this.y = this.y0 = this.trans.y;
      this.v = this.v0 = d;
      this.gravity = d2;
      this.state = 1;
      this.jumpCounter = 0;
      this.stateCounter = 0;
      this.calcJumpParams();
    } else if (this.state === 0 || this.state === 10) {
      this.spaceJump = true;
      this.launchObjType = -1;
      this.jumpType = n2;
      this.y = this.y0 = this.trans.y;
      this.v = this.v0 = d;
      this.gravity = d2;
      this.state = 1;
      this.jumpCounter = 0;
      this.stateCounter = 0;
      this.calcJumpParams();
    } else if (this.state === 1) {
      if (this.spaceJump) return;
      if (this.getJumpPhase() === 1) {
        switch (this.launchObjType) {
          case 1:
            this.spaceJump = true;
            this.launchObjType = -1;
            this.jumpType -= 3;
            this.v0 = -3.5;
            this.calcJumpParams();
            break;
          case 20:
            this.spaceJump = true;
            this.launchObjType = -1;
            this.jumpType += 6;
            if (this.jumpType > 8) this.jumpType -= 3;
            this.superJump = true;
            ++this.superJumpCounter;
            this.doSuperJump();
            break;
        }
      }
    }
  }

  Render(xVector, renderedXY) {
    this.TransformToLocal(xVector);
    if (this.v22.z < 0) {
      renderedXY.x = this.maxX + 1;
      renderedXY.y = this.maxY + 1;
      return false;
    }
    let px = this.v22.x * this.d / (this.d + this.v22.z);
    renderedXY.x = Math.trunc(px * this.maxX / this.dx);
    let py = this.v22.y * this.d / (this.d + this.v22.z);
    renderedXY.y = Math.trunc(py * this.maxY / this.dy);
    return true;
  }

  TransformToLocal(xVector) {
    this.v11.Set(xVector);
    this.v11.Sub(this.trans);
    this.invMtx.Mul(this.v11, this.v22);
  }

  ZRot(d) {
    this.mtx.ZRot(d);
    this.invMtx.Invert(this.mtx);
  }

  calcJumpParams() {
    this._5 = this._0 = -2.0;
    this._6 = this._0 - this.v0 * this.v0 / (2.0 * this.gravity);
    this._2 = this._1 = this._6 - (this._6 - this._0) / 7.0;
    this._4 = this._3 = this._6 - (this._6 - this._0) / 49.0;
    this.__0 = this.__3 = this._0;
    this.__2 = this.__1 = this._6 - (this._6 - this.__0) / 20.0;
  }

  calcSuperJumpParams() {
    this._5 = this._0 = -2.0;
    this._6 = this._0 - this.v0 * this.v0 / (2.0 * this.gravity);
    this._1 = this._2 = this._6 - (this._6 - this._0) / 2.0;
    this._3 = this._4 = this._6 - (this._6 - this._0) / 4.5;
    this._7 = this._8 = this._6 - (this._6 - this._0) / 15.0;
    this._9 = this._10 = this._6 - (this._6 - this._0) / 100.0;
  }

  getJumpPhase() {
    if (this.state === 2) return 10;
    if (this.state === 0) return 0;
    if (this.superJump) return this.getSuperJumpPhase();
    if (this.v * this.gravity < 0) {
      if (this.jumpType === 0) {
        if ((this.y - this.__0) * (this.y - this.__1) <= 0) return 1;
        return 2;
      }
      if ((this.y - this._0) * (this.y - this._1) <= 0) return 1;
      if ((this.y - this._1) * (this.y - this._3) <= 0) return 2;
      return 3;
    }
    if (this.jumpType === 0) {
      if ((this.y - this.__3) * (this.y - this.__2) <= 0) return 6;
      return 5;
    }
    if ((this.y - this._5) * (this.y - this._2) <= 0) return 6;
    if ((this.y - this._2) * (this.y - this._4) <= 0) return 5;
    return 4;
  }

  getJumpType() { return this.jumpType; }
  getLaunchObjType() { return this.launchObjType; }

  getSuperJumpPhase() {
    if (this.state === 2) return 10;
    if (this.state === 0) return 0;
    if (!this.superJump) return this.getJumpPhase();
    if (this.v * this.gravity < 0) {
      if ((this.y - this._0) * (this.y - this._1) <= 0) return 1;
      if ((this.y - this._1) * (this.y - this._3) <= 0) return 2;
      if ((this.y - this._3) * (this.y - this._7) <= 0) return 3;
      if ((this.y - this._7) * (this.y - this._9) <= 0) return 4;
      return 5;
    }
    if ((this.y - this._5) * (this.y - this._2) <= 0) return 9;
    if ((this.y - this._2) * (this.y - this._4) <= 0) return 8;
    if ((this.y - this._4) * (this.y - this._8) <= 0) return 7;
    if ((this.y - this._8) * (this.y - this._10) <= 0) return 6;
    return 5;
  }

  isSpaceJump() { return this.spaceJump; }
  isSuperJump() { return this.superJump; }

  killJump() {
    this.state = 0;
    this.stateCounter = 0;
    this.trans.y = -2.0;
    this.superJump = false;
  }

  doSuperJump() {
    this.v0 = -7.0;
    this.calcSuperJumpParams();
  }
}
