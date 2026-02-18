class XVector {
  constructor(a, b, c) {
    if (a instanceof XVector) { this.x = a.x; this.y = a.y; this.z = a.z; }
    else if (a !== undefined && b !== undefined && c !== undefined) { this.x = a; this.y = b; this.z = c; }
    else { this.x = 0; this.y = 0; this.z = 0; }
  }
  Add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
  AddClone(v) { return new XVector(this.x + v.x, this.y + v.y, this.z + v.z); }
  Clear() { this.x = 0; this.y = 0; this.z = 0; }
  Clone() { return new XVector(this); }
  GetAngleAX() { return Math.atan2(Math.sqrt(this.x * this.x + this.z * this.z), this.y); }
  GetAngleAY() { return Math.atan2(this.z, -this.x); }
  GetLength() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
  GetLength2() { return this.x * this.x + this.y * this.y + this.z * this.z; }
  Mul(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
  MulClone(s) { return new XVector(this.x * s, this.y * s, this.z * s); }
  MulScalar(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
  Neg() { this.x = -this.x; this.y = -this.y; this.z = -this.z; return this; }
  Normalize() { let d = this.GetLength(); if (d === 0) return; d = 1.0 / d; this.x *= d; this.y *= d; this.z *= d; }
  RotX(a) { let s = Math.sin(a), c = Math.cos(a); let ny = this.y * c - this.z * s; this.z = this.y * s + this.z * c; this.y = ny; }
  RotY(a) { let s = Math.sin(a), c = Math.cos(a); let nx = this.x * c + this.z * s; this.z = this.x * -s + this.z * c; this.x = nx; }
  RotZ(a) { let s = Math.sin(a), c = Math.cos(a); let nx = this.x * c - this.y * s; this.y = this.x * s + this.y * c; this.x = nx; }
  Set(a, b, c) {
    if (a instanceof XVector) { this.x = a.x; this.y = a.y; this.z = a.z; }
    else { this.x = a; this.y = b; this.z = c; }
  }
  Sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
  SubClone(v) { return new XVector(this.x - v.x, this.y - v.y, this.z - v.z); }
}
