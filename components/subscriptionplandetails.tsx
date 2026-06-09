"use client";


type Props = {
    onClose: () => void;
}

export default function SubscriptionPlansDetails({onClose}: Props){
    return(
       <div>
        <div>
            <div className = "fixed z-50 inset-0 bg-black/40 flex justify-center items-center p-4"
            role = "dialog"
            aria-modal = "true"

            onClick = {onClose}>
            <div className = "relative bg-white p-6 rounded-md shadow-md"
            onClick = {(e) => e.stopPropagation()}>
            <div className = "bg-white rounded-md w-full max-w-[28rem] h-auto">
                <button type = "button" onClick= {() => onClose()} className = "absolute top-0 right-0 bg-red-700 square-button w-10 h-9 ">X</button>
                <h2 className = "text-2xl font-bold">Free Plan Details</h2>
                <p className = "mt-2">Best for testing / small users</p>
                <h2 className = "mt-8 ml-12 text-black text-5xl font-bold">$0<span className = " ml-2 text-gray-800 text-sm">/trial</span></h2>
                <p className = "text-sm text-gray-800 ">active subscribers</p>
                <h2 className = "mt-10 ">FEATURES INCLUDED</h2>
                <div className = "flex flex-row gap-2 mt-10">
                <div className = "bg-black/85 p-2 rounded-md w-60 h-10 ">
                <p className = "text-gray-800 text-white">✓ Limited dashboard access</p>
                </div>
                <div className = "bg-black/85 p-2 rounded-md w-60 h-10">
                <p className = "text-gray-800 text-white">✓ Basic analytics</p>
                </div>
                </div>
                <div className = "flex flex-row gap-2 mt-6">
                <div className = "bg-black/85 p-2 rounded-md w-65 h-10 ">
                <p className = "text-gray-800 text-white">✓ 1 user account</p>
                </div>
                <div className = "bg-black/85 p-2 rounded-md w-65 h-10">
                <p className = "text-gray-800 text-white">✓ Email support only</p>
                </div>
                </div>
                <div className = "flex flex-row gap-2 mt-7">
                <div className = "bg-black/85 p-2 rounded-md w-60 h-10">
                <p className = "text-gray-800 text-white">✓ No team collaboration</p>
                </div>
                <div className = "bg-black/85 p-2 rounded-md w-60 h-10">
                <p className = "text-gray-800 text-white">✓ No real-time updates</p>
                </div>
                </div>
                </div>
                
                </div>
                
                </div>

</div>
</div>
            
    
    )
}