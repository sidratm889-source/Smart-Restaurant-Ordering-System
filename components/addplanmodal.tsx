"use client";
import {useState, useEffect} from "react";

export type PlanForm = {
    title: string;
    headline: string;
    price: string;
    features: string;
};
export type SavedPlan = {
    id:  string;
    title: string;
    headline: string;
    price: string;
    features: string[];
};
type Props = {
    onClose: () => void;
    onSave: (plan: SavedPlan) => void;
    initialValues?: PlanForm;
}
const emptyForm: PlanForm = {
    title: "",
    headline: "",
    price: "",
    features: "",

}
export default function addPlanModal({onClose, onSave, initialValues = emptyForm, }: Props){
const [form, setForm] = useState({title: "", headline: "", price: "", features: ""});
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
};
const handleSubmit = () => {
    const newPlan  = {
        id: form.title.toLowerCase().replace(/\s+/g, "-") || `plan-${Date.now()}`,
        title: form.title,
        headline: form.headline,
        price: form.price,
        features: form.features.split("\n").filter((item) => item.trim()!== ""),
    };
    onSave(newPlan);
    onClose();
}
    return (
        <div className = "fixed z-50 inset-0 bg-black/40 flex justify-center items-center"
        role = "dialog"
        aria-modal = "true">

            <div className = "relative bg-white rounded-md w-[400px] h-[500px] p-0" onClick = {(e) => e.stopPropagation}>
                <button type = "button" onClick = {onClose} className = "absolute top-0 right-0 bg-red-700 square-button w-10 h-9">
                    X
                </button>
                <h2 className = "mt-3 ml-5 text-2xl">Add Plan</h2>
                <div className = "flex flex-col ">
                <label className = "mb-0 ml-5 mt-8">Title</label>
                <input 
                type = "text"
                name = "title"
                placeholder = "enter a title"
                value = {form.title}
                onChange = {handleChange}
                className = "border w-70 h-10 p-2  mt-2 rounded-md ml-3"/>
</div>
<div className = "flex flex-col ">
<label className = "mb-0 ml-5 mt-3 mb-1">Headline</label>
                <input 
                type = "text"
                name = "headline"
                placeholder = "enter headline"
                value = {form.headline}
                onChange = {handleChange}
                className = "border w-70 h-10 p-2 mb-3 ml-4 rounded-md"/>
                </div>
                <div className = "flex flex-col ">
                <label className = "mb-1 ml-5 mt-2">Price</label>
                <input 
                type = "number"
                name = "price"
                placeholder = "enter a price"
                value = {form.price}
                onChange = {handleChange}
                className = "border w-70 h-10  p-2 mb-3 ml-4 rounded-md"/>
                </div>
                <div className = "flex flex-col ">
                <label className = "mb-1 ml-5 mt-2">Features</label>
                <textarea 
                
                name = "features"
                placeholder = "enter features"
                value = {form.features}
                onChange = {handleChange}
                className = "border w-70 h-20 p-2 mb-3 ml-4 rounded-md"/>
                </div>
                
                <div className = "flex gap-3">
                    <button onClick = {handleSubmit}
                    className = "bg-red-800 rounded-md w-20 h-10 text-white ml-75">Save</button>
                </div>
            </div>

            </div>
    )
}