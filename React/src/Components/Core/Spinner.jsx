export default function Spinner() {
  return (
    <div className="spinner-con top-1/2 left-1/2 flex justify-center items-center h-12 w-12 absolute">
      <div className="spinner w-14 h-14 absolute border-4 border-gray-300 rounded-full transition-transform border-t-indigo-500 animate-spin"></div>
      <div className="spinner w-8 h-8 absolute border-4 border-indigo-500 rounded-full transition-transform border-b-gray-300 animate-spin"></div>
      <div className="center-dot w-3 h-3 bg-indigo-500 rounded-full"></div>
    </div>
  );
}
