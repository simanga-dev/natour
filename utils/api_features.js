class APIFeatures {
  constructor(query, query_str) {
    this.query = query;
    this.query_str = query_str;
  }

  filter() {
    //REMOVE  UNRECOGNISE QUERY
    const queryObj = { ...this.query_str };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // ADVANCE FILTING
    let query_str = JSON.stringify(queryObj);
    query_str = query_str.replace(/\b(gte|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(query_str));

    return this;
  }

  sort() {
    // SORTING THE RESPONSE
    if (this.query_str.sort) {
      const sort_by = this.query_str.sort.split(',').join(' ');
      this.query = this.query.sort(sort_by);
    } else {
      this.query = this.query.sort('-created_at');
    }
    return this;
  }

  limitFields() {
    //LIMITING THE NUMBER OF FILDS
    if (this.query_str.fields) {
      const fields = this.query_str.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    //PAGINATION
    const page = this.query_str.page * 1 || 1;
    const limit = this.query_str.limit * 1 || 5;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
