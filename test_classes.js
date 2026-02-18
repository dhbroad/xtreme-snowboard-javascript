const fs = require('fs');
const files = ['XVector.js','XMatrix.js','RenderedXY.js','XCamera.js','obstacle.js','BackgroundObject.js','freeobj.js'];
let code = '';
for (const f of files) { code += fs.readFileSync('src/'+f,'utf8') + '\n'; }
code += `
// Simulate game initialization and first few frames
var width = 480, height = 300;
var centerX = width/2, centerY = height/2;
var startZ = 75.0;

// Camera
var cam = new XCamera(1.85, 3.2, 2.0, centerX, centerY);
cam.trans.y = -2;

// Background object
var bgD = (cam.d + startZ) * Math.sqrt(cam.dx*cam.dx + cam.dy*cam.dy) / cam.d;
var bgObj = new BackgroundObject(startZ, 7.5, -bgD, bgD);
console.log("bgD:", bgD, "bgObj.numPoints:", bgObj.numPoints);

// Floor
var floorMin = [], floorMax = [];
for (var fi = 0; fi < 8; fi++) { floorMin[fi] = new XVector(); floorMax[fi] = new XVector(); }

// Test renderBackground simulation
var polyX = new Array(200).fill(0);
var polyY = new Array(200).fill(0);
var absCoord = new XVector();
var xyR = new RenderedXY();

// Set bgObj trans like moveObstacle does
bgObj.trans.y = 100.0; // bgMinY
bgObj.speedFr.Set(0, 0, 0);
bgObj.ApplyDynamics();

var n = 0, n2 = 0;
while (n2 < bgObj.numPoints) {
  if (n2 === bgObj.leftFirst) {
    bgObj.GetAbsCoord(bgObj.rightFirst, absCoord);
    absCoord.y = 100.0;
    cam.Render(absCoord, xyR);
    polyX[n2 + n] = xyR.x + centerX;
    polyY[n2 + n] = xyR.y + centerY;
    bgObj.GetAbsCoord(bgObj.leftFirst, absCoord);
    absCoord.y = 100.0;
    cam.Render(absCoord, xyR);
    ++n;
    polyX[n2 + n] = xyR.x + centerX;
    polyY[n2 + n] = xyR.y + centerY;
    ++n;
  }
  bgObj.GetAbsCoord(n2, absCoord);
  cam.Render(absCoord, xyR);
  polyX[n2 + n] = xyR.x + centerX;
  polyY[n2 + n] = xyR.y + centerY;
  ++n2;
}
console.log("renderBackground: rendered", bgObj.numPoints + 2, "points OK");

// Test obstacle creation and rendering
var obstacles = new freeobj();
var Head = null;
var myPos = new XVector(0, 0, 0);
var mySpeed = 2.0;
var vx = 0;

var obj = obstacles.getObj();
obj.next = Head;
obj.prev = null;
Head = obj;
var objStart = new XVector(5, 0, startZ);
var rnd = Math.random();
var objType = rnd > 0.728 ? 1 : (rnd > 0.66 ? 20 : (rnd > 0.33 ? 10 : 0));
obj.type = objType;
obj.buildObj(objStart, 0.9 * 2.0);
console.log("Created obstacle type:", objType, "numPoints:", obj.numPoints);

// Simulate obstacle movement and rendering
absCoord.Set(myPos);
absCoord.Sub(obj.trans);
absCoord.x = 0;
absCoord.Normalize();
absCoord.Mul(mySpeed);
absCoord.x = mySpeed * vx;
obj.speedFr.Set(absCoord);
obj.ApplyDynamics();

var visible = true;
for (var i = 0; i < obj.numPoints; i++) {
  obj.GetAbsCoord(i, absCoord);
  if (!cam.Render(absCoord, xyR)) {
    visible = false;
    break;
  }
  polyX[i] = xyR.x + centerX;
  polyY[i] = xyR.y + centerY;
}
console.log("Obstacle render visible:", visible);

if (visible) {
  var polyX1 = new Array(200).fill(0);
  var polyY1 = new Array(200).fill(0);
  var n3 = 0;
  var n2p = 0;
  while (n2p < obj.numPolygons) {
    var n4 = 0;
    do {
      var n5 = obj.first[n3];
      while (n5 <= obj.last[n3]) {
        polyX1[n4 + n5 - obj.first[n3]] = polyX[n5];
        polyY1[n4 + n5 - obj.first[n3]] = polyY[n5];
        ++n5;
      }
      n4 += obj.last[n3] - (obj.first[n3] - 1);
    } while (++n3 < obj.numPolyStruct && obj.polyStruct[n3] === obj.polyStruct[n3 - 1]);
    console.log("  Polygon", n2p, "color:", obj.colors[n2p], "points:", n4);
    ++n2p;
  }
}

// Test camera jump
cam.Jump(-2.0, 0.75, true, -1, 3);
console.log("Jump phase:", cam.getJumpPhase(), "jumpType:", cam.jumpType);
cam.ApplyDynamics();
console.log("After dynamics, jumpY:", cam.jumpY);

console.log("ALL SIMULATION TESTS PASSED");
`;
eval(code);
