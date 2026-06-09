"use client";




type OrderItem = {
  id?: string | number;
  name?: string;
  quantity?: number;
  price?: number;
};

type Order = {
  id?: string;
  orderId?: string;
  fullName?: string;
  cart?: OrderItem[];
  grandTotal?: number;
  selected?: string;
  phoneNumber?: string;
  address?: string;
};

type Props = {
  order: Order;
  onClose: () => void;
};

export default function OrderForm({ order, onClose }: Props) {
  return (
    <div
      className="fixed z-50 inset-0 bg-black/40 flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-120  p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <button
            className="text-white bg-red-800 rounded-md w-10 h-10 hover:text-red"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <h3 className="font-medium">Order ID: {order.orderId}</h3>
        <p className="mt-2">Customer: {order.fullName}</p>

        <div className="mt-4 ">
          {order.cart?.map((item: OrderItem, index: number) => (
            <div key={item.id ?? index} className="flex justify-between gap-4">
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>${item.price?.toFixed?.(2) ?? item.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-left">
          <p className="font-semibold">Grand Total:  ${order.grandTotal}</p>
          <p>Payment: {order.selected}</p>
          <p>Phone: {order.phoneNumber}</p>
          <p>Address: {order.address}</p>
        </div>
      </div>
    </div>
    
  );
}
       

       