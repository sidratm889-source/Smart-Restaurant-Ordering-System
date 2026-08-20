"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useMenu} from "./menucontext";
import EditModal from "./editmodal";





const categoryDetailPaths: Record<string, string> = {
  Burger: "/app/resdashboard/burgerdetail",
  Pizza: "/app/resdashboard/pizzadetail",
  Wrap: "/app/resdashboard/wrapdetail",
  Drinks: "/app/resdashboard/drinkdetail",
  Deals: "/app/resdashboard/dealdetails",
};

function getDetailPath(item: any) {
  const base = categoryDetailPaths[item.category];
  return base ? `${base}/${item.id}` : `/app/resdashboard`;
}

export default function MenuCard() {
  const { items, updateMenuItem, deleteMenuItem, addMenuItem } = useMenu();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [viewItem, setViewItem] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [isNewItem, setIsNewItem]= useState(false);
  const router = useRouter();
  

   
    
 
   const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsNewItem(false);
        setShowEditModal(true);
       
        // navigate to an edit page or open modal — adjust as needed
        // router.push(`/resmanager/menumanagement/edit/${item.id}`);
      };

      const handleDelete = async (id: string) => {
        await deleteMenuItem(id);
      };
const handleView = (items: any) => {
    setViewItem(items);
    console.log("view items:", items);
}
const handleSave = async (updatedItem: any) => {
  if(isNewItem){
  await addMenuItem(updatedItem);
  }else{
    await updateMenuItem(updatedItem);
  }
  setShowEditModal(false);
  setSelectedItem(null);
  setIsNewItem(false);
};
const handleAdd = () => {
  setSelectedItem(null);
  setIsNewItem(true);
  setShowEditModal(true);
}
        

  


  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="px-6 py-8">
      <div  className="flex flex-wrap rounded-md w-full max-w-[1200px] h-[150px] bg-black/90 items-center justify-between gap-4 mb-8">
        <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className=" ml-5 text-3xl font-bold text-white">Menu Management</h2>
        <button onClick = {handleAdd}  style={{ fontFamily: 'Poppins, sans-serif' }} className="rounded-md bg-red-800 px-5 mr-5 py-2 text-white">
          + Add Menu
        </button>
      </div>

      <div  style={{ fontFamily: 'Poppins, sans-serif' }} className="grid grid-cols-1 gap-6 md:grid-cols-2  xl:grid-cols-3">
        {items.map((item: any) => (
          <div key={item.id} className="rounded-xl border border-gray-200 bg-red-800 p-4 text-white shadow-lg">
            <img
              src={item.image}
              alt={item.name}
              className="mb-4 h-44 w-full rounded-xl object-cover bg-black"
            />
            <div className="mb-3">
              <span className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                {item.category}
              </span>
            </div>
            <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="mt-2 text-sm text-gray-200">{item.ingredients}</p>
            <p className="mt-2 text-sm text-gray-200">{item.description}</p>
            <p className="mt-3 text-lg font-semibold text-white">${Number(item.price).toFixed(2)}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => router.push(getDetailPath(item))}
                className="inline-flex min-w-[95px] items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-medium text-white"
              >
                View
              </button>
              <button
               
                onClick={() => handleEdit(item)}
                className="inline-flex min-w-[95px] items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-red-800"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="inline-flex min-w-[95px] items-center justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showEditModal &&(
        <EditModal
        item = {selectedItem}
        isNew = {isNewItem}
        onSave = {handleSave}
        onClose={() => {
          setShowEditModal(false);
          setSelectedItem(null);
          setIsNewItem(false);
        }}
        />
      )}
    </div>
  );
}