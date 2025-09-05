// src/components/Login/LoginInput.jsx
export default function LoginInput({ label, type = "text", value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}
