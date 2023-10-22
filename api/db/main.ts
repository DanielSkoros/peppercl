import { connect } from "mongoose";

class Database {
  server: string;
  database: string;

  constructor(server = '127.0.0.1:27017', database = 'peppercl') {
    this.server = server;
    this.database = database;
    this._connect();
  }
  _connect() {
    connect(`mongodb://${this.server}/${this.database}`)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('err');
      });
  }
}

export default new Database();