"use client";

type Props = {
    onClose: () => void;
};

export default function PremiumPlansDetails({onClose}: Props){
    return(
        <div>
            <div className = "fixed z-50 inset-0 bg-black/40 flex justify-center items-center p-4"
            role = "dialog"
            arial-model = "true"
            onClick = {onClose}>
                <div className = "relative bg-white p-6 rounded-md  p-6 shadow-md" onClick= {(e) => e.stopPropagation()}>


                <div className="bg-white rounded-md w-100 h-110">
        <button type = "button" onClick = {() => onClose()} className = "absolute top-0 right-0 bg-red-700 square-button w-10 h-9">X</button> 
        <h2 className="text-2xl font-bold">Premium Plan details</h2>
                        <p className="text-gray-800">Best for businesses & advanced users</p>
                        <h2 className="mt-8 ml-12 text-black text-5xl font-bold">
                            $75<span className="ml-2 text-gray-800 text-sm">/monthly</span>
                        </h2>
                        <p className="text-gray-800">active subscriber</p>
                        <h2 className="mt-4">FEATURES INCLUDED</h2>
                        <div className="flex flex-row gap-2 mt-8">
                            <div className="bg-black/85 p-2 rounded-md w-60 h-10 ">
                                <p className="text-gray-800 text-white">✓ Advanced dashboard access</p>
                            </div>
                            <div className="bg-black/85 p-2 rounded-md w-60 h-10">
                                <p className="text-gray-800 text-white">✓ Advance analytics</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 mt-5">
                            <div className="bg-black/85 p-2 rounded-md w-65 h-10 ">
                                <p className="text-gray-800 text-white">✓ unlimited user account</p>
                            </div>
                            <div className="bg-black/85 p-2 rounded-md w-65 h-10">
                                <p className="text-gray-800 text-white">✓ priority 24/7 support</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 mt-6">
                            <div className="bg-black/85 p-2 rounded-md w-60 h-10">
                                <p className="text-gray-800 text-white">✓team collaboration</p>
                            </div>
                            <div className="bg-black/85 p-2 rounded-md w-60 h-10">
                                <p className="text-gray-800 text-white">✓ full api access</p>
                            </div>
                        </div>
                        <div className="bg-black/85 p-2 rounded-md w-60 h-10 mt-3">
                                <p className="text-gray-800 text-white">✓ Role-based access controls</p>
                            </div>
                    </div>
                </div>
            </div>
            </div>
        
    );
}

  