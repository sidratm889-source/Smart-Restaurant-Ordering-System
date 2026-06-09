"use client";
import { useEffect, useState } from "react";

export type PlanForm = {
  title: string;
  headline: string;
  price: string;
  features: string;
};

export type SavedPlan = {
  id: string;
  title: string;
  headline: string;
  price: string;
  features: string[];
};

type Props = {
  onClose: () => void;
  onSave: (plan: SavedPlan) => void;
  initialValues: PlanForm;
  plan?: string;
};

const emptyForm: PlanForm = {
  title: "",
  headline: "",
  price: "",
  features: "",
};

export default function EditPlanModal({
  onClose,
  onSave,
  initialValues = emptyForm,
  plan = "",
}: Props) {
  const [form, setForm] = useState<PlanForm>(initialValues ?? emptyForm);

  useEffect(() => {
    setForm(initialValues ?? emptyForm);
  }, [initialValues]);

  const handleSubmit = () => {
    if (!plan || !form) return;

    onSave({
      id: plan,
      title: form.title,
      headline: form.headline,
      price: String(form.price).startsWith("$")
        ? String(form.price)
        : `$${form.price}`,
      features: String(form.features)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    });
  };

  return (
    <div
      className="fixed z-50 inset-0 bg-black/40 flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white rounded-md w-120 h-125 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-700 square-button w-10 h-9"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mt-2">Edit Your Plan</h2>
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <label className="mb-2 ml-3 mt-7">Plan Name</label>
            <input
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              value={form?.title ?? ""}
              type="text"
              placeholder="plan name"
              className="mt-0 w-50 h-10 rounded-lg bg-white border border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 mt-6 ml-3">Price</label>
            <input
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              value={form?.price ?? ""}
              type="number"
              placeholder="plan price"
              className="w-50 h-10 mt-2 rounded-lg bg-white border border-gray-300"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 mt-2 ml-3"> Headline</label>
          <input
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
            value={form?.headline ?? ""}
            type="text"
            placeholder="plan headline"
            className="w-70 h-15 mt-2 rounded-lg bg-white border border-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 mt-2 ml-3">Features</label>
          <textarea
            rows={10}
            value={form?.features ?? ""}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            placeholder="plan features "
            className="w-80 h-30 mt-2 rounded-lg bg-white border border-gray-300"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-red-800 mb-3 rounded-md w-20 h-10 ml-90 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
