import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("First Add Values");
      return;
    }

    if (isUpdate && editItem) {
      const updatedList = list.map((item) =>
        item.id === editItem.id ? { ...item, name, price } : item
      );
      setList(updatedList);
      setIsUpdate(false);
      setEditItem(null);
    } else {
      const newItem = { id: Date.now(), name, price };
      setList([...list, newItem]);
    }

    setName("");
    setPrice("");
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const handleEdit = (item) => {
    setIsUpdate(true);
    setEditItem(item);
    setName(item.name);
    setPrice(item.price);
  };

  return (
    <>
      <div>
        <h1 className="font-bold flex justify-center text-3xl text-amber-300 mt-6">
          Crud Operation
        </h1>

        <div className="h-screen flex items-center justify-center">
          <form
            className="w-full max-w-sm p-4 bg-gray-200 rounded-lg shadow-md"
            onSubmit={handlesubmit}
          >
            <h2 className="text-2xl font-semibold text-center mb-6">
              {isUpdate ? "Update Details" : "Add Details"}
            </h2>
            <div className="mt-6">
              <label>Enter Product Name</label>
              <input
                className="border-2 mt-3 rounded ml-6"
                onChange={handleName}
                type="text"
                value={name}
              />
            </div>
            <div className="mt-6">
              <label>Enter Product Price</label>
              <input
                className="border-2 mt-3 rounded ml-8"
                onChange={handlePrice}
                type="text"
                value={price}
              />
            </div>
            <button
              className="mt-8 ml-28 p-2 bg-green-500 rounded cursor-pointer hover:bg-green-300"
              type="submit"
            >
              {" "}
              {isUpdate ? "Update Details " : "Add Details"}
            </button>
          </form>

          <div className="ml-10 w-full max-w-sm p-4 bg-green-200 rounded-lg shadow-md">
            <h1 className="text-xl text-center">Our Data</h1>
            <ul>
              {list.map((item) => (
                <li key={item.id} className="mt-2 border-2 p-2">
                  <span className="font-bold">{item.name}</span> :{" "}
                  <span>$</span>
                  {item.price}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 p-1 rounded cursor-pointer hover:bg-red-300 ml-3"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-green-500 p-1 rounded cursor-pointer hover:bg-green-300 ml-3"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
