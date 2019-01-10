const moment = require('moment');
const currentGames = {
};
function trackTime(id) {
  const defaultTime = 180; // 3 min
  currentGames[id] = {
    startTime: defaultTime,
    whiteTime: defaultTime / 2,
    blackTime: defaultTime / 2,
    currentMove: 'w',
    lastMoveTimestamp: null,
  }
  console.log('Time tracked for ', id, currentGames);
}
function updateTime(id) {
  let defaultDecrement = 0;
  const current = currentGames[id];

  if (!current) {
    return;
  }

  if (current['lastMoveTimestamp']) {
    const then = moment(current['lastMoveTimestamp']);
    const now = moment()
    const diff = now.diff(then, 'seconds');
    defaultDecrement = diff;
  }
  if (current.currentMove === 'w') {
    current['whiteTime'] = current['whiteTime'] - defaultDecrement;
    current['currentMove'] = 'b';
  } else if(current.currentMove === 'b') {
    current['blackTime'] = current['blackTime'] - defaultDecrement;
    current['currentMove'] = 'w';
  }
  current['lastMoveTimestamp'] = moment().valueOf();
}
function getTime(id) {
  const current = currentGames[id];

  if (!current) {
    return null;
  }

  const { whiteTime, blackTime } = current;
  return {
    whiteTime,
    blackTime
  };
}
module.exports.trackTime = trackTime;
module.exports.updateTime = updateTime;
module.exports.getTime = getTime;
