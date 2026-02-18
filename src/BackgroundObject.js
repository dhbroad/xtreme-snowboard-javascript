class BackgroundObject extends obstacle {
  constructor(startZ, yPos, xLeft, xRight) {
    super();
    this.leftFirst = 0;
    this.rightFirst = 0;
    this.xLeft = xLeft || 0;
    this.xRight = xRight || 0;
    if (startZ !== undefined) {
      this.build(new XVector(0, 0, startZ), yPos);
      this.leftFirst = 0;
      this.rightFirst = this.numPoints - 1;
    }
  }

  build(xVector, d) {
    this.trans = xVector;
    this.numPoints = 69;
    this.numPolygons = 1;
    this.colors[0] = "rgb(154,235,235)";
    this.numPolyStruct = 1;
    this.first[0] = 0;
    this.last[0] = this.numPoints - 1;
    this.polyStruct[0] = 0;
    this.x[0]=-70*d; this.y[0]=-2*d;
    this.x[1]=-68*d; this.y[1]=-3*d;
    this.x[2]=-63*d; this.y[2]=-9*d;
    this.x[3]=-61*d; this.y[3]=-10*d;
    this.x[4]=-59*d; this.y[4]=-9*d;
    this.x[5]=-58*d; this.y[5]=-8*d;
    this.x[6]=-57*d; this.y[6]=-8*d;
    this.x[7]=-56*d; this.y[7]=-10*d;
    this.x[8]=-54*d; this.y[8]=-11*d;
    this.x[9]=-52*d; this.y[9]=-14*d;
    this.x[10]=-50*d; this.y[10]=-13*d;
    this.x[11]=-45*d; this.y[11]=-9*d;
    this.x[12]=-44*d; this.y[12]=-10*d;
    this.x[13]=-42*d; this.y[13]=-8*d;
    this.x[14]=-41*d; this.y[14]=-5*d;
    this.x[15]=-39*d; this.y[15]=-8*d;
    this.x[16]=-38*d; this.y[16]=-8*d;
    this.x[17]=-36*d; this.y[17]=-6*d;
    this.x[18]=-35*d; this.y[18]=-7*d;
    this.x[19]=-32*d; this.y[19]=-6*d;
    this.x[20]=-31*d; this.y[20]=-7*d;
    this.x[21]=-29*d; this.y[21]=-4*d;
    this.x[22]=-26*d; this.y[22]=-8*d;
    this.x[23]=-22*d; this.y[23]=-11*d;
    this.x[24]=-20*d; this.y[24]=-10*d;
    this.x[25]=-16*d; this.y[25]=-12*d;
    this.x[26]=-14*d; this.y[26]=-15*d;
    this.x[27]=-11*d; this.y[27]=-17*d;
    this.x[28]=-9*d; this.y[28]=-16*d;
    this.x[29]=-8*d; this.y[29]=-14*d;
    this.x[30]=-7*d; this.y[30]=-14*d;
    this.x[31]=-3*d; this.y[31]=-11*d;
    this.x[32]=-1*d; this.y[32]=-9*d;
    this.x[33]=0*d; this.y[33]=-10*d;
    this.x[34]=1*d; this.y[34]=-10*d;
    this.x[35]=2*d; this.y[35]=-8*d;
    this.x[36]=4*d; this.y[36]=-9*d;
    this.x[37]=6*d; this.y[37]=-12*d;
    this.x[38]=8*d; this.y[38]=-11*d;
    this.x[39]=9*d; this.y[39]=-7*d;
    this.x[40]=13*d; this.y[40]=-6*d;
    this.x[41]=15*d; this.y[41]=-9*d;
    this.x[42]=18*d; this.y[42]=-12*d;
    this.x[43]=20*d; this.y[43]=-12*d;
    this.x[44]=23*d; this.y[44]=-13*d;
    this.x[45]=24*d; this.y[45]=-13*d;
    this.x[46]=24*d; this.y[46]=-14*d;
    this.x[47]=27*d; this.y[47]=-16*d;
    this.x[48]=29*d; this.y[48]=-15*d;
    this.x[49]=34*d; this.y[49]=-7*d;
    this.x[50]=35*d; this.y[50]=-8*d;
    this.x[51]=36*d; this.y[51]=-10*d;
    this.x[52]=37*d; this.y[52]=-11*d;
    this.x[53]=39*d; this.y[53]=-11*d;
    this.x[54]=43*d; this.y[54]=-8*d;
    this.x[55]=44*d; this.y[55]=-6*d;
    this.x[56]=45*d; this.y[56]=-7*d;
    this.x[57]=47*d; this.y[57]=-7*d;
    this.x[58]=51*d; this.y[58]=-4*d;
    this.x[59]=55*d; this.y[59]=-6*d;
    this.x[60]=58*d; this.y[60]=-9*d;
    this.x[61]=60*d; this.y[61]=-9*d;
    this.x[62]=61*d; this.y[62]=-8*d;
    this.x[63]=62*d; this.y[63]=-10*d;
    this.x[64]=65*d; this.y[64]=-12*d;
    this.x[65]=66*d; this.y[65]=-12*d;
    this.x[66]=69*d; this.y[66]=-7*d;
    this.x[67]=71*d; this.y[67]=-8*d;
    this.x[68]=77*d; this.y[68]=-2*d;
    for (let i = 0; i < this.numPoints; i++) this.z[i] = 0;
  }

  ApplyDynamics() {
    super.ApplyDynamics();
    while (this.x[this.leftFirst] + this.trans.x >= this.xLeft) {
      let n2 = this.rightFirst === 0 ? this.numPoints - 1 : this.rightFirst - 1;
      let n = this.rightFirst;
      this.x[n] = this.x[this.leftFirst] - (this.x[this.rightFirst] - this.x[n2]);
      this.leftFirst = n;
      this.rightFirst = n2;
    }
    while (this.x[this.rightFirst] + this.trans.x <= this.xRight) {
      let n2 = this.leftFirst === this.numPoints - 1 ? 0 : this.leftFirst + 1;
      let n = this.leftFirst;
      this.x[n] = this.x[this.rightFirst] + (this.x[n2] - this.x[this.leftFirst]);
      this.leftFirst = n2;
      this.rightFirst = n;
    }
  }
}
