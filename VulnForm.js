import { useState, useEffect } from "react";

export default function VulnForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    vuln_name: "", owasp_category: "", cwe_id: "", cwe_name: "",
    description: "", risk: "", recommendations: "", references: ""
  });

  useEffect(() => { if (initialData) setForm(initialData); }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-2">
      {Object.keys(form).map((field) => (
        <div key={field}>
          <label className="block font-bold">{field.replace("_", " ")}:</label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>
      ))}
      <button className="bg-green-600 text-white px-4 py-2">Save</button>
    </form>
  );
}
