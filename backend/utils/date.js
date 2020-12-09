class CustomDate {
  constructor(date = undefined) {
    if (!date) {
      this.date = new Date();
      this.addHours(-3); // Corrije Timezone
    } else {
      this.date = new Date(date);
    }
  }

  ISO() {
    return this.date.toISOString();
  }

  getTime() {
    return this.date.getTime();
  }

  addSeconds(seconds) {
    this.date = new Date(this.date.getTime() + seconds * 1000);
    return this;
  }

  addMinutes(minutes) {
    this.date = new Date(this.date.getTime() + minutes * 60 * 1000);
    return this;
  }

  addHours(hours) {
    this.date = new Date(this.date.getTime() + hours * 60 * 60 * 1000);
    return this;
  }

  addDays(hours) {
    this.date = new Date(this.date.getTime() + hours * 24 * 60 * 60 * 1000);
    return this;
  }
}

module.exports = CustomDate;
