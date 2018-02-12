import * as mongoose from 'mongoose';
import { config } from './db';

export function connectToDB() {
  let uri;
  const ENV = process.env.NODE_ENV;

  if (ENV !== 'production') {
    uri = process.env.DB_URI || config[`DB_URI_${ENV.toUpperCase()}`];
  } else {
    uri = config.DB_URI_DEVELOPMENT;
  }

  (<any>mongoose).Promise = require('bluebird');
  
  return mongoose.connect(uri);
}



