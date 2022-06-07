const Mock = require('mockjs');
const Student = require("./../models/Student");

const arr = Mock.mock({
  'datas|500-700': [
    {
      'name': '@cname',
      'dateOfBirth': '@date',
      'sex|1-2':true,
      'phone|10000000000-19999999999': 11111111111,
      'ClassId|1-16': 1
    }
  ]
}).datas;

Student.bulkCreate(arr);

