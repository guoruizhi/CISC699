import React, { Component } from "react";
import "./formCSS.css";
import Button from "@material-ui/core/Button/Button";
import { Dropdown } from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const genderOptions = [
  { key: "male", text: "Male", value: "Male" },
  { key: "female", text: "Female", value: "Female" },
];

class FormExampleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      title: "",
      gender: "",
      cell: "",
      email: "",
      manager: "",
    };
  }
  componentDidMount() {
    this.props.getAllEmployees();
  }

  changeHandler = (event) => {
    const tName = event.target.name;
    const tValue = event.target.value;
    if (tName === "name") {
      this.setState({ name: tValue });
    } else if (tName === "title") {
      this.setState({ title: tValue });
    } else if (tName === "cell") {
      this.setState({ cell: tValue });
    } else if (tName === "email") {
      this.setState({ email: tValue });
    }
  };

  submitHandler = () => {
    let err = [];
    if (this.state.name === "") {
      err.push("Employee should has a name!");
    }
    if (this.state.title === "") {
      err.push("Employee should has a title!");
    }
    if (this.state.gender === "") {
      err.push("Employee should has a gender!");
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
      formData.append("name", this.state.name);
      formData.append("title", this.state.title);
      formData.append("gender", this.state.gender);
      formData.append("level", this.state.level);
      formData.append("cell", this.state.cell);
      formData.append("email", this.state.email);
      formData.append(
        "manager",
        this.state.manager === ("" || "None")
          ? ""
          : JSON.stringify(this.state.manager)
      );
      // formData.append("avatar", this.state.avatar, this.state.avatar.name);
      this.props.createNewEmployee(formData);
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
    // Anyone can be your manager, handling circle is in edit part.
    const managerOptions = this.props.employees.data.map((el) => {
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
            <a className="header item">Create new employee</a>
            <div className="right menu">
              <div className="ui form">
                <div className="inline fields">
                  <div className="field">
                    <div
                      className="ui green button"
                      onClick={() => {
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
                      onChange={this.changeHandler}
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
                    <label>Submit</label>
                    <Button variant="outlined" onClick={this.submitHandler}>
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
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
    createNewEmployee: (newEmployee) => {
      dispatch(actions.createNewEmployee(newEmployee));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormExampleForm);
