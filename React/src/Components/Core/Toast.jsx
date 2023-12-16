import { useStateContext } from "../../Contexts/ContextProvider";

export default function Toast() {
  const { toast } = useStateContext();
  return (
    <>
      {toast.show && (
        <div className="px-4 py-4 bg-green-600 rounded-md text-white fixed bottom-4 right-4 z-50 w-[400px] text-center shadow-md animate-fade-in-down">
          {toast.message}
        </div>
      )}
    </>
  );
}
