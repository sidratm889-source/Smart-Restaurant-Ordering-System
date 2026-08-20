import {useState} from "react";



   export default function EmployeeForm({form, onSave, onClose,  setForm}: any){
    
    const[name, setName] = useState("");
    const[address, setAddress] = useState("");
    const[number, setNumber] = useState("");
    const[role, setRole] = useState("");
  
 
    return(
        
        <div className = "fixed inset-0 bg-black/40 bg-opacity-20 flex items-center justify-center z-50 p-4">
                <div className = " mx-auto mt-8 bg-white rounded-lg w-[500px] h-120">
                    <button type = "button" onClick = { () => onClose()}className = "float-right ml-123 bg-red-700 square-button w-10 h-9">
                        X
                    </button>

            <h2 className = "mt-4 mb-3 font-bold text-2xl ml-4">Add Employee</h2>
            <div>
            <label className = "text-1xl font-bold  block text-gray-700 font-sembold  mt-10 ml-4">Name</label>
            <input placeholder = "enter name"
            value={form.name}onChange={(e) => setForm({...form, name: e.target.value})}
            className = "w-100 h-10 rounded-md border mt-3 mb-3 ml-4"/>
            </div>
            <div>
                <label className = "text-1xl font-bold text-gray-700 font-semibold mt-1 mb-2 block ml-4">Phone Number</label>
            <input placeholder = "enter phoneNumber" value={form.number}onChange={(e) => setForm({...form, number: e.target.value})} className = "w-100 h-10 rounded-md border ml-4"/>
            </div>
            <div>
            <label className = "text-1xl font-bold text-gray-700 font-semibold mt-1 mb-2  block ml-3">Address</label>
            <input placeholder = "enter address" value={form.address}onChange={(e) => setForm({...form, address: e.target.value})} className = "w-100 h-10 rounded-md border ml-4"/>
            </div>
            <div>
                <label className= "text-1xl font-bold text-gray-800 font-semibold mt-1 mb-2 block ml-3">Employee Role</label>
            <select value = {form.role} onChange={(e) => setForm({...form, role: e.target.value})} className = "w-100 h-10 rounded-md border ml-4">
            <option value = "manager">Manager</option> 
                <option value = "chef">Chef</option>
                <option value = "waiter">Waiter</option>
                <option value = "deliveryboy">Delivery Boy</option>
                <option value = "cleaner">Cleaner</option>
                <option value = "helper">Packaging Helper</option> 
            </select>
            </div>
            <button onClick={onSave} className = "bg-red-800 w-20 h-10 rounded-md ml-100 text-white mt-3">Save</button>
            
        
</div>
       
    </div>
    )
   }
   