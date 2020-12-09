class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //////////////////////////////////////////////////////////////////////////////////
    // Hasta ahora se banca un filter por field. Soporta operadores: <, <=, >, >=, <>
    //////////////////////////////////////////////////////////////////////////////////

    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // Operators: gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace('&lt;', '<');
    queryStr = JSON.parse(queryStr);

    Object.keys(queryStr).forEach((el, index) => {
      let queryFilter = [];

      if (typeof queryStr[el] === 'string') {
        queryFilter = [el, queryStr[el]];
      } else {
        const operator = Object.keys(queryStr[el])[0];
        queryFilter = [el, operator, queryStr[el][operator]];
      }

      if (index === 0) {
        this.query = this.query.where(...queryFilter);
      } else {
        this.query = this.query.andWhere(function () {
          this.where(...queryFilter);
        });
      }
    });

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      if (sortBy.startWith('.')) {
        this.query = this.query.orderBy(sortBy, 'desc');
      } else {
        this.query = this.query.orderBy(sortBy);
      }
    } else {
      this.query = this.query.orderBy('createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }

    return this;
  }

  paginate() {
    const limit = this.queryString.limit * 1 || 100;
    const page = this.queryString.page * 1 || 1;
    const skip = (page - 1) * limit;
    this.query = this.query.offset(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
