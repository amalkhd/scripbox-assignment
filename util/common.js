exports.getPagination = ({ query }) => {
    let { pageNum, pageSize: limit, sort } = query;
    sort = sort ? "-_id" : "";
    limit = +limit;
    return { skip: (pageNum - 1) * limit, limit, sort };
  };