import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Category() {
  const [edit, setEdit] = useState(false);
  const [editCategory, setEditCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const getCategory = () => {
    axios
      .get('/categories')
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);
  const addCategory = (event) => {
    event.preventDefault();
    const obj = {
      name: event.target.name.value,
      description: event.target.description.value,
    };
    axios.post('/categories', obj).then((res) => {
      getCategory();
      console.log(res.data);
    });
  };
  const deleteItem = (category) => {
    axios
      .delete(`/categories/${category}`)
      .then((res) => {
        console.log(res.data);
        getCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateItem = (category) => {
    setEdit(true);
    setEditCategory(category);
  };
  const saveCategory = (event) => {
    event.preventDefault();
    const obj = {
      name: event.target.name.value,
      description: event.target.description.value,
    };
    axios.put(`/categories/${editCategory.name}`, obj).then((res) => {
      getCategory();
      setEdit(false);
      console.log(res.data);
    });
  };
  return (
    <div className="container">
      {edit ? (
        <div className="form">
          <h1>Edit Category</h1>
          <form onSubmit={saveCategory}>
            <div>
              <b>Enter Category name:</b>
            </div>
            <input type="text" placeholder="enter Category name" name="name" />
            <br />
            <div>
              <b>Enter description:</b>
            </div>
            <textarea placeholder="Description" name="description" />
            <br />
            <button type="submit">Save Category</button>
          </form>
        </div>
      ) : (
        <div className="form">
          <h1>Add Category</h1>
          <form onSubmit={addCategory}>
            <div>
              <b>Enter Category name:</b>
            </div>
            <input type="text" placeholder="enter Category name" name="name" />
            <br />
            <div>
              <b>Enter description:</b>
            </div>
            <textarea placeholder="Description" name="description" />
            <br />
            <button type="submit">Add Category</button>
          </form>
          <button type="button" onClick={() => deleteItem('deleteAll')}>
            Delete all Categories
          </button>
        </div>
      )}

      <div className="list">
        <h1>Categories List</h1>
        <div className="list-box">
          <table>
            <tr>
              <th>Category Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {categories.map((category) => (
              <tr>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button
                    className="del-btn"
                    onClick={() => {
                      updateItem(category);
                    }}
                    type="button"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteItem(category.name);
                    }}
                    type="button"
                    className="del-btn"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
export default Category;
