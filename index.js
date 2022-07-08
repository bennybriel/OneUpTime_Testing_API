const express = require('express');
const app = express();

//const utils = require('./utils/employee-schema');

app.use(express.json());

const Joi = require('joi');

const employeeSchema  = Joi.object().keys({
    name: Joi.string().min(5).required(),
    gender : Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    department: Joi.string().min(3)
});

const employees =
 [
    {
        id:1,
        name:'Emloyee ABC',
        gender:'male',
        email: 'employee1@gmail.com',
        department: 'Account',

    },
    {
        id:2,
        name:'Emloyee ICT',
        gender:'female',
        email: 'employee2@gmail.com',
        department: 'ICT',

    },
    {
        id:3,
        name:'Emloyee Library ',
        gender:'male',
        email: 'employee3@gmail.com',
        department: 'Library',
    },
    {
        id:4,
        name:'Registry ABC',
        gender:'female',
        email: 'employee4@gmail.com',
        department: 'Registry',

    },
    {
        id:5,
        name:'Emloyee HR',
        gender:'female',
        email: 'employee5@gmail.com',
        department: 'HR',

    },
];

//GET Verb
app.get("/api/employees", (req, res)=>
{
    res.send(employees);
});

//GET BY Employee ID
app.get("/api/employees/:id", (req, res)=>
{
    const employeeID = req.params.id;
    const employee = employees.find(employee=>employee.id === parseInt(employeeID));
    if(!employee) return res.status(404).send("The employee with the ID provided does not exist.");
    res.send(employee);
});

//POST VERB
app.post("/api/employees", (req, res)=>
{
    
    const { err } = employeeSchema.validate(req.body);
     if(err) return res.status(400).send("The name should be at least 5 characters long.");

     const employee = {
        id: employees.length + 1,
        name:req.body.name,
        gender:req.body.gender,
        email:req.body.email,
        department: req.body.department,       
     };

     employees.push(employee);
     res.status(201).send(employee);
});

//PUT VERB
app.put('/api/employees/:id', (req, res)=>
{
    const employeeID = req.params.id;
    const employee = employees.find(employee =>employee.id === parseInt(employeeID));
    if(!employee) return res.status(404).send("The employee with ID provided does not exist.");

    const  err  = employeeSchema.validate(req.body);

    console.log(err.error);
    if(err.error) return res.status(400).send("The name should be at least 5 characters long.");

    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.gender = req.body.gender;
    employee.department = req.body.department;
    res.send(employee);
});

//PATCH 

app.patch('/api/employees/:id', (req, res)=>
{
    const employeeID = req.params.id;
    const employee = employees.find(employee =>employee.id === parseInt(employeeID));
    if(!employee) return res.status(404).send("The employee with ID provided does not exist.");

    const  err  = employeeSchema.validate(req.body);

    if(err.error) return res.status(400).send("The name should be at least 5 characters long.");

    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.gender = req.body.gender;
    employee.department = req.body.department;
    res.send(employee);
});

//DELETE 

app.delete("/api/employees/:id", (req, res)=>
{
    const employeeID = req.params.id;
    const employee  = employees.find(employee => employee.id === parseInt(employeeID));
    if(!employee) return res.status(404).send("The employee with ID provided does not exist.");

    const index = employees.indexOf(employee);
    employees.splice(index, 1);
    res.send(employee);
});

const port = process.env.PORT || 3000;
module.exports = app.listen(port, ()=> console.log(`Listening on port ${port}......`))
