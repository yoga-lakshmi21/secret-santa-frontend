import React, { useState } from 'react'
import axios from "axios";
import './santa.css'

const Santa = () => {
    const [employees, setEmployees] = useState(null);
    const [lastYear, setLastYear] = useState(null);
    const [result, setResult] = useState([]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("employees", employees);
        formData.append("lastYear", lastYear);

        const res = await axios.post("http://localhost:5000/generate", formData);

        setResult(res.data);
    };

    return (
        <div className="container">
            <h2>Secret Santa Generator</h2>

            <div className="card">
                <div>
                    <h4>Upload Employee Details</h4>
                    <input type="file" accept=".csv" onChange={(e) => setEmployees(e.target.files[0])} />

                    <h4>Upload Last Year Details</h4>
                    <input type="file" accept=".csv" onChange={(e) => setLastYear(e.target.files[0])} />
                </div>
                <button onClick={handleSubmit} disabled={!employees || !lastYear}>
                    Generate
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee Secret Child</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, i) => (
                        <tr key={i}>
                            <td>{item.Employee_Name}</td>
                            <td>{item.Secret_Child_Name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Santa