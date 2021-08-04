import {useState} from "react";
import Employee from "./model/employee";

function HrApp() {
    let [employee, setEmployee] = useState(new Employee());
    let [employees, setEmployees] = useState([]);

    //region handle change methods
    function handleInputChange(event){
        const value = event.target.value;
        const name = event.target.name;
        let emp = {...employee} ; //cloning employee
        if (name === "fulltime"){
            emp.fulltime = !emp.fulltime;
        } else {
            emp[name] = value;
        }
        setEmployee(emp);
    }

    function handleFileInput(event){
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e) => {
            let emp = {...employee} ; //cloning employee
            emp.photo = e.target.result;
            setEmployee(emp)
        }
    }
    //endregion

    //region employee operations
    function hireEmployee(){
        fetch('http://localhost:4001/employees',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(res => alert("Employee is hired!"))
    }

    function updateEmployee(){
        fetch('http://localhost:4001/employees',{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(res => alert("Employee is updated!"))
    }

    function fireEmployee(calisan){
        fetch(`http://localhost:4001/employees/${calisan.identityNo}`,{
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            // .then(emp => setEmployee(emp))
            .then((emp) =>{
                setEmployee(emp);
                setEmployees( employees.filter( e => e.identityNo !== calisan.identityNo ) );
            })
    }

    function fireEmployeeByIdentityNo(){
        fetch(`http://localhost:4001/employees/${employee.identityNo}`,{
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            // .then(emp => setEmployee(emp))
            .then(setEmployee)
    }

    function findEmployee(){
        fetch(`http://localhost:4001/employees/${employee.identityNo}`,{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            // .then(emp => setEmployee(emp))
            .then(setEmployee)
    }

    function retrieveEmployees(){
        fetch("http://localhost:4001/employees",{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            // .then(emps => setEmployees(emps))
            .then(setEmployees)
    }

    //endregion
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">Employee</div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="identityNo">Identity No:</label>
                        <input type="text"
                               className="form-control"
                               id="identityNo"
                               name="identityNo"
                               onChange={handleInputChange}
                               value={employee.identityNo}></input>
                        <button  onClick={findEmployee}
                                 className="btn btn-success">Find Employee</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Full name:</label>
                        <input type="text"
                               className="form-control"
                               id="fullname"
                               name="fullname"
                               onChange={handleInputChange}
                               value={employee.fullname}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="iban">Iban:</label>
                        <input type="text"
                               className="form-control"
                               id="iban"
                               name="iban"
                               onChange={handleInputChange}
                               value={employee.iban}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary">Salary:</label>
                        <input type="text"
                               className="form-control"
                               id="salary"
                               name="salary"
                               onChange={handleInputChange}
                               value={employee.salary}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthYear">Birth Year:</label>
                        <input type="text"
                               className="form-control"
                               id="birthYear"
                               name="birthYear"
                               onChange={handleInputChange}
                               value={employee.birthYear}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department:</label>
                        <select className="form-control"
                               id="department"
                               name="department"
                               onChange={handleInputChange}
                               value={employee.department}>
                            <option>IT</option>
                            <option>Sales</option>
                            <option>Finance</option>
                            <option>HR</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photo:</label>
                        <img id="photo" src={employee.photo} />
                        <label className="btn btn-success">
                            <input type="file"
                                   onChange={handleFileInput}
                                   style={{display: "none"}}></input>
                            Load
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fulltime">Fulltime?:</label>
                        <input type="checkbox"
                               id="fulltime"
                               checked={employee.fulltime}
                               onChange={handleInputChange}
                               name="fulltime" />
                    </div>
                    <div className="form-group">
                        <button onClick={hireEmployee}
                            className="btn btn-success">Hire Employee</button>
                        <button  onClick={updateEmployee}
                            className="btn btn-warning">Update Employee</button>
                        <button onClick={fireEmployeeByIdentityNo}
                            className="btn btn-danger">Fire Employee</button>
                        <button
                            onClick={retrieveEmployees}
                            className="btn btn-info">Retrieve All</button>
                    </div>
                    <p></p>
                    <div className="form-group">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <td>No</td>
                                    <td>Identity No</td>
                                    <td>Fullname</td>
                                    <td>Iban</td>
                                    <td>Salary</td>
                                    <td>BirthYear</td>
                                    <td>Department</td>
                                    <td>Photo</td>
                                    <td>Full time</td>
                                    <td>Operations</td>
                                </tr>
                            </thead>
                            <tbody>{
                                employees.map( (emp,idx) =>
                                    <tr key={emp.identityNo}>
                                        <td>{idx+1}</td>
                                        <td>{emp.identityNo}</td>
                                        <td>{emp.fullname}</td>
                                        <td>{emp.iban}</td>
                                        <td>{emp.salary}</td>
                                        <td>{emp.birthYear}</td>
                                        <td>{emp.department}</td>
                                        <td><img src={emp.photo} /></td>
                                        <td>{emp.fulltime ? 'FULL TIME' : 'PART TIME'}</td>
                                        <td><button onClick={ () => fireEmployee(emp) }
                                            className="btn btn-danger">Fire Employee</button> </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HrApp;
