class XMatrix {
  constructor(a, b, c, d2, e, f, g, h, i) {
    if (a instanceof XMatrix) {
      this._11=a._11; this._12=a._12; this._13=a._13;
      this._21=a._21; this._22=a._22; this._23=a._23;
      this._31=a._31; this._32=a._32; this._33=a._33;
    } else if (arguments.length === 9) {
      this._11=a; this._12=b; this._13=c;
      this._21=d2; this._22=e; this._23=f;
      this._31=g; this._32=h; this._33=i;
    } else if (arguments.length === 1 && typeof a === "number") {
      this._11=a; this._12=0; this._13=0;
      this._21=0; this._22=a; this._23=0;
      this._31=0; this._32=0; this._33=a;
    } else {
      this._11=0; this._12=0; this._13=0;
      this._21=0; this._22=0; this._23=0;
      this._31=0; this._32=0; this._33=0;
    }
  }
  Add(m) {
    this._11+=m._11; this._12+=m._12; this._13+=m._13;
    this._21+=m._21; this._22+=m._22; this._23+=m._23;
    this._31+=m._31; this._32+=m._32; this._33+=m._33;
    return this;
  }
  Clear() {
    this._11=0; this._12=0; this._13=0;
    this._21=0; this._22=0; this._23=0;
    this._31=0; this._32=0; this._33=0;
  }
  Invert(m) {
    let d = m._22*m._33 - m._23*m._32;
    let d2 = m._23*m._31 - m._21*m._33;
    let d3 = m._21*m._32 - m._22*m._31;
    let d4 = m._11*d + m._12*d2 + m._13*d3;
    let d5 = 1.0 / d4;
    let d6 = d5*m._11;
    let d7 = d5*m._12;
    let d8 = d5*m._13;
    this._11 = d5*d;
    this._12 = d5*d2;
    this._13 = d5*d3;
    this._21 = d8*m._32 - d7*m._33;
    this._22 = d6*m._33 - d8*m._31;
    this._23 = d7*m._31 - d6*m._32;
    this._31 = d7*m._23 - d8*m._22;
    this._32 = d8*m._21 - d6*m._23;
    this._33 = d6*m._22 - d7*m._21;
  }
  Mul(a, b) {
    if (b !== undefined) {
      // Mul(XVector in, XVector out)
      b.Set(
        a.x*this._11 + a.y*this._21 + a.z*this._31,
        a.x*this._12 + a.y*this._22 + a.z*this._32,
        a.x*this._13 + a.y*this._23 + a.z*this._33
      );
    } else if (a instanceof XMatrix) {
      // Mul(XMatrix)
      let t = new XMatrix(this);
      this._11 = t._11*a._11 + t._12*a._12 + t._13*a._13;
      this._12 = t._11*a._21 + t._12*a._22 + t._13*a._23;
      this._13 = t._11*a._31 + t._12*a._32 + t._13*a._33;
      this._21 = t._21*a._11 + t._22*a._12 + t._23*a._13;
      this._22 = t._21*a._21 + t._22*a._22 + t._23*a._23;
      this._23 = t._21*a._31 + t._22*a._32 + t._23*a._33;
      this._31 = t._31*a._11 + t._32*a._12 + t._33*a._13;
      this._32 = t._31*a._21 + t._32*a._22 + t._33*a._23;
      this._33 = t._31*a._31 + t._32*a._32 + t._33*a._33;
    }
    return this;
  }
  Set(a) {
    if (a instanceof XMatrix) {
      this._11=a._11; this._12=a._12; this._13=a._13;
      this._21=a._21; this._22=a._22; this._23=a._23;
      this._31=a._31; this._32=a._32; this._33=a._33;
    } else {
      this._11=a; this._12=0; this._13=0;
      this._21=0; this._22=a; this._23=0;
      this._31=0; this._32=0; this._33=a;
    }
  }
  XRot(a) {
    if (a === 0) return;
    let s = Math.sin(a), c = Math.cos(a);
    let d4 = this._21*c - this._31*s;
    let d5 = this._22*c - this._32*s;
    let d6 = this._23*c - this._33*s;
    this._31 = this._21*s + this._31*c;
    this._32 = this._22*s + this._32*c;
    this._33 = this._23*s + this._33*c;
    this._21=d4; this._22=d5; this._23=d6;
  }
  YRot(a) {
    if (a === 0) return;
    let s = Math.sin(a), c = Math.cos(a);
    let d4 = this._11*c + this._31*s;
    let d5 = this._12*c + this._32*s;
    let d6 = this._13*c + this._33*s;
    this._31 = -this._11*s + this._31*c;
    this._32 = -this._12*s + this._32*c;
    this._33 = -this._13*s + this._33*c;
    this._11=d4; this._12=d5; this._13=d6;
  }
  ZRot(a) {
    if (a === 0) return;
    let s = Math.sin(a), c = Math.cos(a);
    let d4 = this._11*c + this._21*s;
    let d5 = this._12*c + this._22*s;
    let d6 = this._13*c + this._23*s;
    this._21 = -this._11*s + this._21*c;
    this._22 = -this._12*s + this._22*c;
    this._23 = -this._13*s + this._23*c;
    this._11=d4; this._12=d5; this._13=d6;
  }
}
