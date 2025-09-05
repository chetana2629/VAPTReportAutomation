import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchVulns, addVuln, updateVuln, deleteVuln } from "../features/vulns/vulnSlice";
import VulnForm from "./VulnForm";

export default function VulnList() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.vulns);
  const [editing, setEditing] = useState(null);

  useEffect(() => { dispatch(fetchVulns()); }, [dispatch]);

  const handleAdd = (form) => dispatch(addVuln(form));
  const handleUpdate = (form) => { dispatch(updateVuln({ id: editing._id, vuln: form })); setEditing(null); };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Vulnerabilities</h2>

      <h3 className="font-bold">Add New</h3>
      <VulnForm onSubmit={handleAdd} />

      {editing && (
        <>
          <h3 className="font-bold">Edit</h3>
          <VulnForm initialData={editing} onSubmit={handleUpdate} />
        </>
      )}

      <div className="mt-6">
        {items.map((v) => (
          <div key={v._id} className="border p-3 mb-2 rounded shadow">
            <p><b>{v.vuln_name}</b></p>
            <p>OWASP: {v.owasp_category}</p>
            <p>CWE: {v.cwe_id} - {v.cwe_name}</p>
            <p>Risk: {v.risk}</p>
            <p>{v.description}</p>
            <p>{v.recommendations}</p>
            <p><a href={v.references} target="_blank" rel="noreferrer">{v.references}</a></p>
            <button onClick={() => setEditing(v)} className="bg-yellow-500 px-2 text-white mr-2">Edit</button>
            <button onClick={() => dispatch(deleteVuln(v._id))} className="bg-red-500 px-2 text-white">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
