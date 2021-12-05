const express = require("express");
const path = require("path");
const multer = require("multer");
const Employee = require("../models/Employee");

const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/");
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

module.exports = function(app) {
  app.get("/employees", (req, res) => {
    Employee.find({}, function(err, users) {
      if (err) throw err;
      console.log(`GET all employees`);
      res.status(200).json(users);
    });
  });

  app.get("/employees/:id", (req, res) => {
    let id = String(req.params.id);
    Employee.findOne({ _id: id }, function(err, user) {
      if (err) throw err;
      console.log(`GET employee with id ${id}`);
      res.status(200).json(user);
    });
  });

  app.post("/employees", upload.single("avatar"), (req, res) => {
    const employee = new Employee({
      name: req.body.name,
      title: req.body.title,
      gender: req.body.gender,
      cell: req.body.cell,
      email: req.body.email,
      manager: req.body.manager === "" ? "" : JSON.parse(req.body.manager),
      avatar: req.file === undefined ? "Icon" : req.file.filename
    });
    employee.save((err, data) => {
      if (err) return res.send(err);
      console.log(`POST Create new ${data._id}`);

      if (data.manager.id !== undefined) {
        Employee.findOneAndUpdate(
          { _id: data.manager.id },
          { $push: { direct_reports: data._id } },
          err => {
            if (err) {
              console.log(
                `Putting new ${data._id} into manager ${
                  data.manager.id
                } failed!\n` + err
              );
              return res.send(err);
            }
            console.log(
              `Putting new id ${data._id} into manager ${
                data.manager.id
              } succeed!`
            );
            res.send({ message: "Employee add success" });
          }
        );
      } else {
        console.log(`POST new ${data._id} without DR handling finished.`);
        res.send({ message: "Employee add success" });
      }
    });
  });

  app.put("/employees/:id", upload.single("avatar"), (req, res) => {
    let id = String(req.body.id);
    Employee.findOne({ _id: id }, function(err, user) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const originalManagerId = user.manager.id;
      const originalAvatar = user.avatar;
      const employee = {
        title: req.body.title,
        gender: req.body.gender,
        cell: req.body.cell,
        email: req.body.email,
        manager:
          req.body.manager === "undefined" ? "" : JSON.parse(req.body.manager),
        avatar: req.file === undefined ? originalAvatar : req.file.filename
      };
      Employee.findOneAndUpdate({ _id: id }, employee, err => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        console.log(`Update employee ${id} own information.`);

        const newMangerId = employee.manager.id;
        if (originalManagerId !== newMangerId) {
          console.log(`Update employee ${id} Manager changes`);
          Employee.findOneAndUpdate(
            { direct_reports: id },
            { $pull: { direct_reports: id } },
            err => {
              if (err) {
                console.log(err);
                return res.send(err);
              }
              if (originalManagerId !== undefined) {
                console.log(`Delete${id} from original manager`);
              } else {
                console.log(`Update success`);
              }
              Employee.findOneAndUpdate(
                { _id: newMangerId },
                { $push: { direct_reports: id } },
                err => {
                  if (err) {
                    console.log(err);
                    return res.send(err);
                  }
                  if (newMangerId !== undefined) {
                    console.log(`Add${id} to new manager`);
                  } else {
                    console.log(`${id}has no manager`);
                  }
                  console.log(`${id} change manager finished`);
                  return res.send(`${id} change manager finished`);
                }
              );
            }
          );
        } else {
          if (newMangerId !== undefined) {
            console.log(`${id}manager does not change`);
          } else {
            console.log(`${id} never has manager`);
          }
          console.log(`${id} update finished`);
          return res.send(`${id} update finished`);
        }
      });
    });
  });

  app.delete("/employees/:id", (req, res) => {
    let id = String(req.params.id);
    Employee.deleteOne({ _id: id }, err => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      console.log(`Delete employee ${id}`);

      Employee.updateMany(
        { "manager.id": id },
        { $set: { manager: "" } },
        (err, user) => {
          if (err) {
            console.log(err);
            return res.send(err);
          }
          console.log(`Delete manager ${id}`);

          Employee.findOneAndUpdate(
            { direct_reports: id },
            { $pull: { direct_reports: id } },
            err => {
              if (err) {
                console.log(err);
                return res.send(err);
              }
              console.log(`Delete ${id} from manger`);
              console.log(`Delete ${id} finished`);
              res.send("Delete finished");
            }
          );
        }
      );
    });
  });
};
