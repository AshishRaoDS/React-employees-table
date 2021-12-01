import React from 'react'





function AddEmployeeButton({ addDataState,setAddDataState,data,setData  }) {


    const handleAddFormSubmit=(e)=>{
        e.preventDefault();
        const newEmployee={
        firstName:addDataState.firstName,
        userName:addDataState.userName,
        phone:addDataState.phone,
        email:addDataState.email,
        age:addDataState.age,
        gender:addDataState.gender
        }
        
        const  newEmployeeData=[...data,newEmployee]
        setData(newEmployeeData)
        setAddDataState({
            firstName:"",
            userName:"",
            phone:"",
            email:"",
            age:"",
            gender:""
          })
        
        }



    const onChangeHandler= (e)=>{
        e.preventDefault();
        const fieldName=e.target.getAttribute('name');
        const fieldValue=e.target.value
        const newData={...addDataState}
        newData[fieldName]=fieldValue
    setAddDataState(newData)
      }
    return (
        <div className="addEmployee">
            <form
               onSubmit={handleAddFormSubmit}
            ><div className="inputDiv">
                <table >
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                User-Name
                            </th>
                            <th>
                                Phone
                            </th>
                            <th>
                                e-mail
                            </th>
                            <th>
                                Age
                            </th>
                            <th>
                                Gender
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" required 
                                name="firstName"
                                value={addDataState.firstName}
                                onChange={onChangeHandler} 
                                />
                            </td>
                            <td>
                                <input type="text" required 
                                 name="userName"
                                 value={addDataState.userName}
                                 onChange={onChangeHandler}
                                />
                            </td>
                            <td>
                                <input type="text" required 
                                 name="phone"
                                 value={addDataState.phone}
                                onChange={onChangeHandler} 
                                />
                            </td>
                            <td>
                                <input type="email" required 
                                 name="email"
                                 value={addDataState.email}
                                 onChange={onChangeHandler}
                                />
                            </td>
                            <td>
                                <input type="text" required 
                                 name="age"
                                 value={addDataState.age}
                                onChange={onChangeHandler} 
                                />
                            </td>
                            <td>
                                <select class="form-select" required 
                                 name="gender"
                                 value={addDataState.gender}
                                    onChange={onChangeHandler} 
                                    aria-label="Default select example">
                                    <option selected>Choose one below</option>
                                    <option  value="Male">Male</option>
                                    <option  value="Female">Female</option>
                                    <option  value="Other">Other</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div>
                <button className="submitButton" type="submit">Add Employee</button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployeeButton
