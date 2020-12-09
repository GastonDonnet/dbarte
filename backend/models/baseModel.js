const { Model } = require('objection');
const CustomDate = require('../utils/date');

class BaseModel extends Model {
  $beforeInsert() {
    const now = new CustomDate().ISO();
    this.createdAt = now;
    this.updatedAt = now;
  }

  $beforeUpdate() {
    this.updatedAt = new CustomDate().ISO();
  }
}

module.exports = BaseModel;
