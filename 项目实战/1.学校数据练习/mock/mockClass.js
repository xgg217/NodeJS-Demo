const Mock = require('mockjs');
const Classes = require("./../models/Class")

const arr = Mock.mock({
  "datas|16": [
    {
      "id|+1": 1,
      "name": "前端第 @id 期",
      "openingTime": "@date"
    }
  ]
}).datas;

Classes.bulkCreate(arr);

