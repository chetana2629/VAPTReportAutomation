import React from "react";

export default function VulnCard({ vuln, onEdit }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all w-full max-w-3xl mx-auto my-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-blue-600">🔒</span> {vuln.vuln_name}
      </h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">OWASP:</span> {vuln.owasp_category}
        </p>
        <p>
          <span className="font-semibold">CWE:</span> {vuln.cwe_id} –{" "}
          {vuln.cwe_name}
        </p>
        <p>
          <span className="font-semibold">Description:</span> {vuln.description}
        </p>
        <p>
          <strong>Risk:</strong> {vuln.risk || vuln.default_risk}
        </p>

        <p>
          <span className="font-semibold">Recommendations:</span>{" "}
          {vuln.recommendations}
        </p>
        <p>
          <span className="font-semibold">References:</span>{" "}
          <a
            href={vuln.references}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {vuln.references}
          </a>
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onEdit}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          ✏️ Edit
        </button>
      </div>
    </div>
  );
}
