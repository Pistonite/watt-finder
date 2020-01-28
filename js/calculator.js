const CALC = {};
CALC.check1stFrame = (ballID, trID) => {
  if (ballID < 0 || trID < 0) return -1;
  if (trID >= 50) return -1;
  for (let i = 0; i < DATA.frames.length; i++) {
    if (DATA.frames[i][0] == ballID && DATA.frames[i][1] == trID) return i;
  }
  return -1;
};

CALC.searchBall = (ballStart, trStart, ballTarget, callback) => {
  const startFrame = CALC.check1stFrame(ballStart, trStart);
  if (startFrame < 0) {
    callback(-1);
    return;
  }
  let day = 0;
  for (let i = startFrame; i < DATA.frames.length; i++ , day++) {
    if (DATA.frames[i][0] == ballTarget) {
      callback(day, DATA.frames[i]);
      return;
    }
  }
  for (let i = 0; i < startFrame; i++ , day++) {
    if (DATA.frames[i][0] == ballTarget) {
      callback(day, DATA.frames[i]);
      return;
    }
  }
  callback(-1);
};

CALC.searchTR = (ballStart, trStart, trTarget, callback) => {
  const startFrame = CALC.check1stFrame(ballStart, trStart);
  if (startFrame < 0) {
    callback(-1);
    return;
  }
  let day = 0;
  for (let i = startFrame; i < DATA.frames.length; i++ , day++) {
    if (checkFrameForTR(DATA.frames[i], trTarget)) {
      callback(day, DATA.frames[i]);
      return;
    }
  }
  for (let i = 0; i < startFrame; i++ , day++) {
    if (checkFrameForTR(DATA.frames[i], trTarget)) {
      callback(day, DATA.frames[i]);
      return;
    }
  }
  callback(-1);
};

const checkFrameForTR = (frame, trID) => {
  for (let i = 1; i < frame.length; i++) {
    if (frame[i] == trID) return true;
  }
  return false;
};