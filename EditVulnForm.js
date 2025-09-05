import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateVuln } from "../features/vulns/vulnSlice";

export default function EditVulnForm({ vuln, onCancel, onSaved }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...vuln });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateVuln({ id: vuln._id, updates: formData }))
      .unwrap()
      .then(() => {
        if (onSaved) onSaved();
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 space-y-6 w-full max-w-3xl mx-auto border border-gray-100 transition-all"
    >
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <span className="text-blue-600">✏️</span> Edit Vulnerability
      </h2>

      {/* Vulnerability Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Vulnerability Name
        </label>
        <input
          name="vuln_name"
          value={formData.vuln_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* OWASP Category */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          OWASP Category
        </label>
        <input
          name="owasp_category"
          value={formData.owasp_category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* CWE ID + CWE Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            CWE ID
          </label>
          <input
            name="cwe_id"
            value={formData.cwe_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            CWE Name
          </label>
          <input
            name="cwe_name"
            value={formData.cwe_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Risk (free text instead of dropdown) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Risk
        </label>
        <textarea
          name="risk"
          value={formData.risk || ""}
          onChange={handleChange}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Recommendations */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Recommendations
        </label>
        <textarea
          name="recommendations"
          value={formData.recommendations}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* References */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          References
        </label>
        <input
          name="references"
          value={formData.references}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:scale-95 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}
