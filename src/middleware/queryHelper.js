// Middleware to parse query parameters for filtering, sorting, pagination

const parseQuery = (req, res, next) => {
  const { _page, _limit, _sort, _order, q, ...filters } = req.query;

  // Pagination
  req.pagination = {
    page: parseInt(_page) || 1,
    limit: parseInt(_limit) || 0 // 0 means no limit
  };
  req.pagination.skip = (req.pagination.page - 1) * req.pagination.limit;

  // Sorting
  req.sortOptions = {};
  if (_sort) {
    req.sortOptions[_sort] = _order === 'desc' ? -1 : 1;
  }

  // Search
  req.searchQuery = q || null;

  // Filters (userId, postId, completed, etc.)
  req.filters = {};
  for (const [key, value] of Object.entries(filters)) {
    // Convert 'true'/'false' strings to boolean
    if (value === 'true') req.filters[key] = true;
    else if (value === 'false') req.filters[key] = false;
    // Convert numeric strings to numbers
    else if (!isNaN(value)) req.filters[key] = parseInt(value);
    else req.filters[key] = value;
  }

  next();
};

// Helper to build MongoDB query
const buildQuery = (model, req) => {
  let query = model.find(req.filters);

  // Text search
  if (req.searchQuery) {
    query = model.find({
      ...req.filters,
      $or: [
        { title: { $regex: req.searchQuery, $options: 'i' } },
        { body: { $regex: req.searchQuery, $options: 'i' } },
        { name: { $regex: req.searchQuery, $options: 'i' } }
      ]
    });
  }

  // Sorting
  if (Object.keys(req.sortOptions).length > 0) {
    query = query.sort(req.sortOptions);
  }

  // Pagination
  if (req.pagination.limit > 0) {
    query = query.skip(req.pagination.skip).limit(req.pagination.limit);
  }

  return query;
};

module.exports = { parseQuery, buildQuery };
