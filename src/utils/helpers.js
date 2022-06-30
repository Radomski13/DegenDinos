export const isStoreReleased = () => {
  const releaseTimestamp = 1648843200,
        currentTimestamp = ~~(Date.now() / 1000),
        timeLeft = releaseTimestamp - currentTimestamp;

  if(timeLeft > 0) return false;
  return true;
}