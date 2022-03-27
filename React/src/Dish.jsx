import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dish() {
  const [edit, setEdit] = useState(false);
  const [editDish, setEditDish] = useState({});
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const getDish = () => {
    axios
      .get('/dishes')
      .then((res) => {
        console.log(res.data);
        setDishes(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategories = () => {
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
    getDish();
    getCategories();
  }, []);
  const addDish = (event) => {
    event.preventDefault();
    const obj = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      category: event.target.category.value,
    };
    axios.post('/dishes', obj).then((res) => {
      getDish();
      console.log(res.data);
    });
  };
  const deleteItem = (dish) => {
    axios.delete(`/dishes/${dish}`).then((res) => {
      console.log(res.data);
      getDish();
    });
  };
  const updateItem = (dish) => {
    setEdit(true);
    setEditDish(dish);
  };
  const saveDish = (event) => {
    event.preventDefault();
    const obj = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      category: event.target.category.value,
    };
    axios.put(`/dishes/${editDish.name}`, obj).then((res) => {
      getDish();
      setEdit(false);
      console.log(res.data);
    });
  };
  return (
    <div className="container">
      {edit ? (
        <div className="form">
          <h1>Edit Dish</h1>
          <form onSubmit={saveDish}>
            <div>
              <b>Enter Dish name:</b>
            </div>
            <input type="text" placeholder="enter Dish name" name="name" />
            <br />
            <div>
              <b>Enter description:</b>
            </div>
            <textarea placeholder="Description" name="description" />
            <br />
            <div>
              <b>Enter Price:</b>
            </div>
            <input type="number" placeholder="enter Price" name="price" />
            <br />
            <div>
              <b>Select Category:</b>
            </div>
            <select name="category" placeholder="Select Category">
              {categories.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
            <button type="submit">Save Dish</button>
          </form>
        </div>
      ) : (
        <div className="form">
          <h1>Add Dish</h1>
          <form onSubmit={addDish}>
            <div>
              <b>Enter Dish name:</b>
            </div>
            <input type="text" placeholder="enter Dish name" name="name" />
            <br />
            <div>
              <b>Enter description:</b>
            </div>
            <textarea placeholder="Description" name="description" />
            <br />
            <div>
              <b>Enter Price:</b>
            </div>
            <input type="number" placeholder="enter Price" name="price" />
            <br />
            <div>
              <b>Select Category:</b>
            </div>
            <select name="category" placeholder="Select Category">
              {categories.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
            <button type="submit">Add Dish</button>
          </form>
          <button type="button" onClick={() => deleteItem('deleteAll')}>
            Delete all Dishes
          </button>
        </div>
      )}

      <div className="list">
        <h1>Dishes List</h1>
        <div className="list-box">
          <table>
            <tr>
              <th>Category Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {dishes.map((dish) => (
              <tr>
                <td>{dish.id}</td>
                <td>{dish.name}</td>
                <td>{dish.description}</td>
                <td>{dish.category}</td>
                <td>{dish.price}</td>
                <td>
                  <button
                    className="del-btn"
                    onClick={() => {
                      updateItem(dish);
                    }}
                    type="button"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="del-btn"
                    onClick={() => {
                      deleteItem(dish.name);
                    }}
                    type="button"
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
export default Dish;
