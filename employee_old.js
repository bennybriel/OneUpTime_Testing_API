let chai = require("chai");
let chaiHttp = require('chai-http');
let server = require('./index');

chai.should();

chai.use(chaiHttp);

describe('Employee API', () =>{
     // 
     // Test the GET VERB route
     //
     describe("GET /api/employees", () => {
        it("It should GET all the employees", (perform)=>{
            chai.request(server)
                .get("/api/employees")
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(5);
                perform();
                });
        });

        it("It should NOT GET all the tasks", (perform) =>{
            chai.request(server)
                .get("/api/employee")
                .end((err, res)=>{
                    res.should.have.status(404);
                perform();
                });
        });
     });

     // 
     // Test the GET BY Employee ID route
     //
     describe("GET /api/employees/:id", () =>{
        it("It should GET an Employee By ID", (perform)=>{
            const employeeID = 1;
            chai.request(server)
                .get("/api/employees/" + employeeID)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('gender');
                    res.body.should.have.property('department');
                    res.body.should.have.property('id').eq(1);
                    perform();
                });
        });

        it("It should NOT GET an employee BY ID", (perform)=>{
            const employeID = 123;
            chai.request(server)
                .get("/api/employees/" + employeID)
                .end((err, res)=>{
                    res.should.have.status(404);
                    res.text.should.be.eq("The employee with the ID provided does not exist.");
                perform();
                });
        });
     });

     describe("POST /api/employees" , ()=>{
        it("It should POST a new Employee Record",(perform)=>{
            const employee ={
                name: "Employee Record 6",
                gender: "Male",
                email: "employee6@gmail.com",
                department: "Bursary Unit",
            };
            chai.request(server)
                .post("/api/employees")
                .send(employee)
                .end((err, res)=>{
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eq(6);
                    res.body.should.have.property('name').eq('Employee Record 6');
                    res.body.should.have.property('gender').eq('Male');
                    res.body.should.have.property('email').eq('employee6@gmail.com');
                    res.body.should.have.property('department').eq('Bursary Unit');
                perform();
                });
        });

     });

     describe("PUT /api/employees/:id", () =>{
        it("It should PUT an existing employee record", (perform)=>{
            const employeeID = 1;
            const employee1 = {
                name: "Employee Record 1 Changed",
                department:'ICT',  
                gender: "Male",
                email: "test@gmail.com",
            };

            chai.request(server)
                .put("/api/employees/" + employeeID)
                .send(employee1)
                .end((er, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eq(1);
                    res.body.should.have.property('name').eq('Employee Record 1 Changed');
                perform();
                });
        });

        // it("It should NOT PUT an existing employee name with less than 5 characters ", (perform)=>{
        //     const employeeID = 1;
        //     const employee = {
        //         name:'ICT',  
        //         gender: "Male",
        //         email: "test@gmail.com",
        //         department :"UIC"
        //     };

        //     chai.request(server)
        //         .put('/api/employees/', + employeeID)
        //         .send(employee)
        //         .end((err, res)=>{
        //             res.should.have.status(400);
        //             res.text.should.be.eq("The name should be at least 5 characters long.");
        //         perform();
        //         });
        // });
     });

     describe("PATCH /api/employees/:id",() =>{
        it("It should PATCH existing employee record",(perform)=>{
            const employeeID = 1;
            const employee = {
                name:'New ICT',  
                gender: "Male",
                email: "test@gmail.com",
                department :"UIC"
            };

            chai.request(server)
                .patch('/api/employees/' + employeeID)
                .send(employee)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.have.be.a('object');
                    res.body.should.have.property('name').eq('New ICT');
                    //res.body.should.have.property('gender').eq('Male');
                perform();
                });
        });

        // it("It should NOT PATCH existing employee name with less than 5 characters", ()=>{
        //     const employeeID  = 1;
        //     const employee = {
        //         name:'CT',  
        //         gender: "Male",
        //         email: "test@gmail.com",
        //         department :"UIC"
        //     };

        //     chai.request(server)
        //         .patch('/api/employee/'+ employeeID)
        //         .send(employee)
        //         .end((err, res)=>{
        //             res.should.have.status(400);
        //             res.text.should.be.eq('The name should be at least 5 characters long.');
        //         perform();
        //         })

        // });
     });

     describe("DELETE /api/employees", ()=>{
        it("It should DELETE employee Record", (perform)=>{
            const employeeID = 1;

            chai.request(server)
                .delete('/api/employees/'+ employeeID)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('id').eq(1);
                perform();
                });
        });

   


     });
});