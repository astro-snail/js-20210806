const createSelector = name =>{
  const rules = {
    pick: rule => rule,
    omit: rule => !rule
  };

  const rule = rules[name];

  return (obj, ...path) => {
    const result = {};

    for (const key of Object.keys(obj)) {
      if (rule(path.includes(key))) {
        result[key] = obj[key];
      }
    }

    return result;
  };
};

export const pick = createSelector('pick');
export const omit = createSelector('omit');
