

const hirestime = function hirestime() {
  let start = Date.now();
  const elapsor = function () {
    return Date.now() - start;
  }

  elapsor.seconds = () => {
    return (Date.now() - start) / 1000;
  }
  return elapsor;
};

export default hirestime;
