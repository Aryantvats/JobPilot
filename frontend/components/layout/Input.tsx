const Input = ({ label, ...props }:any) => (
  <div>
    <label className="block text-sm text-gray-300 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="
        w-full rounded-xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        px-4 py-2.5
        text-white
        outline-none
        focus:ring-2 focus:ring-indigo-400/40
      "
    />
  </div>
);

export default Input;