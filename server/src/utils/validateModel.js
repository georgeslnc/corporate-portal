const validateModel = async (modelDB, condition) => {
  const entity = await modelDB.findOne({ where: condition }, { raw: true });
  return entity ? entity.id : null;
};

module.exports = validateModel;
