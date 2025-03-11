require('dotenv').config();

const dbConfig = {
  HOST: "mysql-test-server-smabdullahblr-a807.d.aivencloud.com",
  USER: "avnadmin",
  PASSWORD: process.env.DB_PASSWORD,
  DB: "defaultdb",
  PORT: 11821
}

module.exports = dbConfig;