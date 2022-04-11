const searchWhenGet = async (model, role, skip, limit, id, search, fileds) => {
  try {
    let data;
    if (id) {
      // console.log(id);
      data = await model.findOne({ _id: id });
    } else if (search) {
      // console.log(search);
      data = await model
        .find({
          $or: fileds.map((filed) => {
            return { [filed]: { $regex: search } };
          }),
        })
        .limit(limit)
        .skip(skip);
    } else {
      // console.log('**** else');
      data = await model.find(role).limit(limit).skip(skip);
    }
    const total = await model.count(role);
    const totalPages = Math.ceil(total / limit);

    return { data, total, totalPages };
  } catch (error) {
    return error;
  }
};

module.exports = searchWhenGet;
