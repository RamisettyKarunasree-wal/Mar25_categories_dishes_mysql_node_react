const connector = require('../connect');
const createCategoriesTable = (req, res) => {
  var sql =
    'create table categories(id int AUTO_INCREMENT,name varchar(100) NOT NULL UNIQUE ,description text,PRIMARY KEY(id))';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};

const getCategories = (req, res) => {
  var sql = 'select * from categories';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};
const viewCategory = (req, res) => {
  var sql = `select * from categories where name=?`;
  connector.query(sql, [req.params.name], function (err, results) {
    res.json({ err, results });
  });
};
const postCategories = (req, res) => {
  const { name, description } = req.body;
  var sql = `insert into categories (name,description) values (?,?)`;
  connector.query(sql, [name, description], function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
const deleteCategories = (req, res) => {
  let sql;
  if (req.params.name === 'deleteAll') {
    sql = 'truncate table categories';
  } else {
    sql = `delete from categories where name=?`;
  }
  connector.query(sql, [req.params.name], function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
const updateCategories = (req, res) => {
  const { name, description } = req.body;
  var sql = `update categories set name=?,description=? where name=?`;
  connector.query(
    sql,
    [name, description, req.params.name],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
};
module.exports = {
  getCategories,
  postCategories,
  deleteCategories,
  updateCategories,
  createCategoriesTable,
  viewCategory,
};
