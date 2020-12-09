const filterObj = (obj, ...allowedFields) => {
  const filteredObj = obj;
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      filteredObj[el] = obj[el];
    }
  });

  return filteredObj;
};

module.exports = {
  filterObj,
};
