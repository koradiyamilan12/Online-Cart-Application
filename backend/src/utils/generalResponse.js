const generalResponse = (res, result, Status) => {
  const response = {
    data: result,
    status: Status,
  };
  res.json(response);
};

module.exports = generalResponse;
