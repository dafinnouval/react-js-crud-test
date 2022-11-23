import "./App.css";
import { useState } from "react";
import { Container } from "react-bootstrap";
// import { uid } from "uid";

function App() {
  const [users, setUsers] = useState([
    {
      name: "Dafin",
      telp: "08889922123",
    },
    {
      name: "Nouval",
      telp: "08889923123",
    },
  ]);

  // const [isUpdate, setIsUpdate] = useState({id:null, status: false });
  const [isUpdate, setIsUpdate] = useState({ name: null, status: false });
  const [selected, setSelected] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    telp: "",
  });

  const handleChange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("oke");
    // menambahkan user
    let data = [...users];
    if (formData.name === "") {
      return false;
    }
    if (formData.telp === "") {
      return false;
    }

    const check = data.find((user) => user.name === formData.name);

    if (check) {
      alert("nama sudah ada");
    } else {
      data.push({ name: formData.name, telp: formData.telp });
    }

    setUsers(data);
    setFormData({ name: "", telp: "" });
    setIsUpdate({ status: false });
  };

  const handleEdit = (index, name) => {
    console.log(index, name);
    let data = [...users];
    let foundData = data.find((user) => user.name === name);
    setFormData({ name: foundData.name, telp: foundData.telp });
    setIsUpdate({ name: name, status: true });
    console.log(setIsUpdate);
    setSelected({ index, name });
  };

  const handleFinishEdit = () => {
    let data = [...users];

    if (isUpdate.status) {
      data.forEach((user) => {
        if (user.name === isUpdate.name) {
          user.name = formData.name;
          user.telp = formData.telp;
        }
      });
    }

    setUsers(data);
    setFormData({ name: "", telp: "" });
    setIsUpdate({ status: false });
    setSelected([]);
    console.log(isUpdate.name);
  };

  const handleDelete = (name) => {
    let data = [...users];
    let filteredData = data.filter((user) => user.name !== name);

    setUsers(filteredData);
  };

  const handleClear = (e) => {
    // agar tidak reload
    e.preventDefault();
    // membuat form kosong
    setFormData({ name: "", telp: "" });
  };

  return (
    <Container>
      <div className="fixed-top bg-white pb-3 mx-auto" style={{ width: 400 }}>
        <h1 className="px-3 py-3 font-weight-bold">My Contact List</h1>
        <form onSubmit={handleSubmit} className="px-3 py-4">
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input type="text" onChange={handleChange} className="form-control" value={formData.name} name="name" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">No. Telp</label>
            <input type="number" onChange={handleChange} value={formData.telp} className="form-control" name="telp" />
          </div>
          <div>
            <button onClick={handleClear} className="btn btn-secondary text-danger w-100 mt-3">
              Clear
            </button>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="list-group">
        {users.map((user, index) => {
          return (
            <div key={index} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{user.name}</h5>
                <div>
                  {selected.index === index ? (
                    <button onClick={() => handleFinishEdit(index)}>simpan</button>
                  ) : (
                    <div>
                      {/* <button onClick={() => handleFinishEdit(index)}>simpan</button> */}
                      <button onClick={() => handleEdit(index, user.name)} className="btn btn-sm btn-link">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user.name)} className="btn btn-sm btn-link">
                        Del
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="mb-1">{user.telp}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default App;
