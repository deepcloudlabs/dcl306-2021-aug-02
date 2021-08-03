import {useState} from "react";
import Employee from "./model/employee";

function HrApp() {
    let [employee, setEmployee] = useState(new Employee());
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
                               value={employee.identityNo}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Full name:</label>
                        <input type="text"
                               className="form-control"
                               id="fullname"
                               name="fullname"
                               value={employee.fullname}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="iban">Iban:</label>
                        <input type="text"
                               className="form-control"
                               id="iban"
                               name="iban"
                               value={employee.iban}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary">Salary:</label>
                        <input type="text"
                               className="form-control"
                               id="salary"
                               name="salary"
                               value={employee.salary}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthYear">Birth Year:</label>
                        <input type="text"
                               className="form-control"
                               id="birthYear"
                               name="birthYear"
                               value={employee.birthYear}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department:</label>
                        <select className="form-control"
                               id="department"
                               name="department"
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
                            <input type="file" style={{display: "none"}}></input>
                            Load
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fulltime">Fulltime?:</label>
                        <input type="checkbox" id="fulltime" name="fulltime" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HrApp;
