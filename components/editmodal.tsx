import {useRef, useState} from "react";
import { toSlugId } from "./menucontext";
import imageCompression from "browser-image-compression";

async function compressImage(file: File) {
const options = {
  maxWidthOrHeight: 800,
  initialQuality: 0.75,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(file, options);

  return compressedFile;
}
async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert blob to data URL"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


type Props = {
    item: {
        id: string;
        name: string;
        price: number;
        description: string;
        ingredients: string[];
        image: string;
        category?: string;


    } | null;
    isNew?: boolean;
    onClose:() =>  void;
  
    onSave: (data: any) => void;
};

export default function EditModal({item, isNew = false, onSave, onClose,}: Props){
    const [form, setForm] =
    useState({name: item?.name || "",
      description:
        item?.description || "",
      ingredients:
        item?.ingredients || "",
      price: item?.price || "",
      image: item?.image || "",
      category: item?.category || "",
    });
    const [name, setName] = useState("");
    const[ingredient, setIngredient] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState(form.price);
    const[uploading, setUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const uploadPromiseRef = useRef<Promise<string | null> | null>(null);
    const uploadedImageRef = useRef("");
    
    const handleChange = (e:any) => {
        const{
            name, 
            value,
        } = e.target;
        setForm((prev: any) => ({
            ...prev,
            [name]: value,
            
        }));
    };
    //image upload
    const handleImageUpload = async(e: any) => {
        const file = e.target.files[0];
        if(!file) return;
        setPreviewImage(URL.createObjectURL(file));
        setUploading(true);

        const uploadTask = (async () => {
          try {
            const compressed = await compressImage(file);
            try {
              const formData = new FormData();
              formData.append(
                "file",
                new File([compressed], "menu.jpg", { type: "image/jpeg" })
              );
              const res = await fetch("/api/upload-menu-image", {
                method: "POST",
                body: formData,
              });
              if (!res.ok) throw new Error("Upload failed");
              const data = await res.json();
              return data.url as string;
            } catch (uploadError) {
              console.warn("Server upload unavailable, saving in browser:", uploadError);
              return await blobToDataUrl(compressed);
            }
          } catch (error) {
            console.error("Image processing failed:", error);
            alert("Could not process image. Try a smaller file.");
            return null;
          }
        })();

        uploadPromiseRef.current = uploadTask;

        try {
          const imageUrl = await uploadTask;
          if (imageUrl) {
            uploadedImageRef.current = imageUrl;
            setForm((prev) => ({ ...prev, image: imageUrl }));
            setPreviewImage(imageUrl);
          } else {
            setPreviewImage("");
          }
        } finally {
          setUploading(false);
        }
    };
    const handleSave = async () => {
        if (uploading) {
          alert("Please wait for the image upload to finish.");
          return;
        }
        let image = uploadedImageRef.current || form.image;
        if (uploadPromiseRef.current) {
          const uploadedUrl = await uploadPromiseRef.current;
          if (uploadedUrl) image = uploadedUrl;
        }
        const ingredients = Array.isArray(form.ingredients)
    ? form.ingredients
    : String(form.ingredients)
        .split(",")
        .map((ingredients) => ingredients.trim())
        .filter(Boolean);
        const id = item?.id || `${toSlugId(form.name)}-${Date.now()}`;
        onSave({ 
            ...item,
            ...form,
        id,
            ingredients,
            price: Number(form.price),
            image,
        });
        onClose();
    };
    return(
        <div className = "fixed z-50 inset-0 bg-black/40 justify-center items-center p-0 "
        role = "dialog"
        arial-modal = "true"
        onClick = {onClose}
        >
            <div  className = "bg-white w-[400px] ml-100 h-600px relative rounded-md " onClick = {(e) => e.stopPropagation()}>
                <div className = "bg-white rounded-md w-[530px] ">
                    <button type = "button" onClick = { () => onClose()}className = "absolute  top-0 ml-123 bg-red-700 square-button w-10 h-9">
                        X
                    </button>
                    <h2 style={{fontFamily: 'Poppins, sans-serif'}} className = "text-2xl mt-3 ml-3 ">{isNew ? "Add New Menu": "Edit your Menu"}</h2>

                    <input type = "file" accept = "image/*" onChange= {handleImageUpload} className = "w-[200px] mt-3"/>
                    <img src = {previewImage || form.image}  className="mb-4 h-44 w-[250px] rounded-xl object-cover bg-black"/>
                    <div>
                        <div>
                            <label style={{fontFamily: 'Poppins, sans-serif'}} className = "mt-2 ml-3 text-1xl font-bold">Category</label>
                            <select name = "category"
                            value = {form.category}
                            onChange = {handleChange}
                            style={{fontFamily: 'Poppins, sans-serif'}}
                            className =  "w-[400px] ml-3 h-10 border rounded-md mt-2">
                                <option value = "Burger">Burger</option>
                                <option value = "Pizza">Pizza</option>
                                <option value = "Wrap">Wrap</option>
                                <option value = "Drinks">Drinks</option>
                                <option value = "Deals">Deals</option>
                            </select>
                            </div>
                  <label style={{fontFamily: 'Poppins, sans-serif'}} className = "mt-2 ml-3 text-1xl font-bold">Item name</label>
                    <input type = "text" name = "name" value={form.name} onChange={handleChange} style={{fontFamily: 'Poppins, sans-serif'}} className = "w-[400px] ml-3 h-10 border rounded-md mt-2" placeholder = "name" />
                   </div>
                   <div>
                    <label style={{fontFamily: 'Poppins, sans-serif'}} className = "mt-2 ml-3 text-1xl font-bold">Ingredients</label>
                   <input type = "text" name = "ingredients" value={Array.isArray(form.ingredients) ? form.ingredients.join(", ") : form.ingredients} onChange ={handleChange} style={{fontFamily: 'Poppins, sans-serif'}} className = "w-[400px] ml-3  h-10 border rounded-md mt-2" placeholder = "ingredients"/>
                   </div>
                   <div>
                    <label style={{fontFamily: 'Poppins, sans-serif'}} className = "mt-2 ml-3 text-1xl font-bold">Description</label>
                   <textarea name = "description" value={form.description} onChange = {handleChange} style={{fontFamily: 'Poppins, sans-serif'}} className = "w-[400px] ml-3  h-10 border rounded-md mt-2" placeholder="description"/>
                             </div>
                             <div>
                    <label style={{fontFamily: 'Poppins, sans-serif'}} className = "mt-2 ml-3 text-1xl font-bold">Price</label>
                              <input type = "number" name = "price"  value={form?.price} onChange={handleChange}   className = "w-[400px] ml-15  h-10 mt-3 border rounded-md" placeholder="price"/>
                              </div>
               
                <button onClick = {handleSave} disabled={uploading} className = "w-20 h-10 rounded-md bg-red-800 mt-2 ml-107 text-white mb-2 disabled:opacity-50">{uploading ? "..." : "Save"}</button>
            
                
                </div>
            </div>

        </div>
    );
}