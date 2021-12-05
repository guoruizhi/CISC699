import React, { Component } from "react";
import "./formCSS.css";
import Button from "@material-ui/core/Button/Button";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../actions";
import { Dropdown } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const genderOptions = [
  { key: "male", text: "Male", value: "Male" },
  { key: "female", text: "Female", value: "Female" },
];

class FormExampleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.employees.employee };
  }
  // componentDidMount() {
  //     this.props.getAllEmployees();
  // }

  changeHandler = (event) => {
    const tName = event.target.name;
    const tValue = event.target.value;
    if (tName === "title") {
      this.setState({ title: tValue });
    } else if (tName === "cell") {
      this.setState({ cell: tValue });
    } else if (tName === "email") {
      this.setState({ email: tValue });
    }
  };

  submitHandler = () => {
    let err = [];
    if (this.state.title === "") {
      err.push("Employee should has a title!");
    }
    const regexEmail = /[\w-]+@([\w-]+\.)+[\w-]/;
    const regexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (this.state.cell !== "" && !regexPhone.test(this.state.cell)) {
      err.push("Cell number is not valid!");
    }
    if (this.state.email !== "" && !regexEmail.test(this.state.email)) {
      err.push("Email is not valid!");
    }
    if (err.length === 0) {
      const formData = new FormData();
      formData.append("id", this.state._id);
      formData.append("title", this.state.title);
      formData.append("gender", this.state.gender);
      formData.append("level", this.state.level);
      formData.append("cell", this.state.cell);
      formData.append("email", this.state.email);
      formData.append("manager", JSON.stringify(this.state.manager));
      // formData.append("avatar", this.state.avatar, this.state.avatar.name);
      this.props.updateEmployee(formData);
      this.props.resetEmployeeToEdit();
      this.props.history.push(`/`);
    } else {
      err.forEach((el) => {
        alert(el);
      });
    }
  };

  managerHandler = (e, { value }) => this.setState({ manager: value });
  genderHandler = (e, { value }) => this.setState({ gender: value });

  fileChangeHandler = (event) => {
    this.setState({ avatar: event.target.files[0] });
  };

  render() {
    // Edit DFS
    let data = this.props.employees.data;
    let filterSet = [],
      set = [];
    set.push(this.state._id);
    while (set.length !== 0) {
      const el = set.pop();
      for (let node of data) {
        if (node.manager !== undefined && node.manager.id === el) {
          set.push(node._id);
        }
      }
      filterSet.push(el);
    }
    const managerOptions = data
      .filter((el) => !filterSet.includes(el._id))
      .map((el) => {
        return {
          key: el._id,
          text: el.name,
          value: {
            id: el._id,
            name: el.name,
          },
        };
      });
    managerOptions.unshift({ key: "none", text: "None", value: "None" });

    return (
      <div>
        <div className="ui fixed borderless inverted menu">
          <div className="ui container">
            <a className="header item">Edit employee</a>
            <div className="right menu">
              <div className="ui form">
                <div className="inline fields">
                  <div className="field">
                    <div
                      className="ui green button"
                      onClick={() => {
                        this.props.resetScrollCount();
                        this.props.history.push(`/`);
                      }}
                    >
                      HOME
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui grid massive message">
          <div className="ui container">
            <div className="row">
              <form className="ui form">
                <div className="two fields">
                  <div className="field">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                    />
                  </div>
                  <div className="field">
                    <label>Gender</label>
                    <Dropdown
                      placeholder="Select Gender"
                      fluid
                      selection
                      options={genderOptions}
                      onChange={this.genderHandler}
                      value={this.state.gender}
                    />
                  </div>
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={this.state.title}
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div className="field">
                    <label>Manager</label>
                    <Dropdown
                      placeholder="Select Manager"
                      fluid
                      selection
                      options={managerOptions}
                      onChange={this.managerHandler}
                      value={this.state.manager}
                    />
                  </div>
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>Cell Phone</label>
                    <input
                      type="text"
                      name="cell"
                      placeholder="Cell Phone"
                      value={this.state.cell}
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>Upload Avatar</label>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="outlined-button-file"
                      type="file"
                      onChange={this.fileChangeHandler}
                    />
                    <label htmlFor="outlined-button-file">
                      <Button
                        variant="outlined"
                        component="span"
                        onClick={() => console.log(1)}
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                  <div className="field">
                    <label>Save</label>
                    <Button variant="outlined" onClick={this.submitHandler}>
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
        <div className="ui hidden divider" />
        <div className="ui container">
          <div className="ui stackable grid">
            <div className="row">
              <div className="column">
                <div className="ui divider" />
                <footer>&copy; 2021 CISC 699</footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Action to get all the employees
    getAllEmployees: () => {
      dispatch(actions.getAllEmployees());
    },
    updateEmployee: (obj) => {
      dispatch(actions.updateEmployee(obj));
    },
    resetEmployeeToEdit: () => {
      dispatch(actions.resetEmployeeToEdit());
    },
    resetScrollCount: () => {
      dispatch({ type: "RESET_SCROLL_COUNT" });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormExampleForm);
