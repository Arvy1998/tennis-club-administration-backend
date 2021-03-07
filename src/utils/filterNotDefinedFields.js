/* eslint-disable no-param-reassign */
const filterNotDefinedFields = (model) => {
  Object.keys(model).forEach((modelKey) => {
    if (!model[modelKey] || model[modelKey] === 'undefined') {
      delete model[modelKey];
    }
  });

  return model;
};

export default filterNotDefinedFields;
