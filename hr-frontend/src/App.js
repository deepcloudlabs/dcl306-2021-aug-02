import {useState} from "react";
import Employee from "./model/employee";

function HrApp() {
    let [employee, setEmployee] = useState(new Employee());

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
                </div>
            </div>
        </div>
    );
}

export default HrApp;
