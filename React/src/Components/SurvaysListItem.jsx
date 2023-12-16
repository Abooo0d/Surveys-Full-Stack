import { BsPencil } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import TButton from "./Core/TButton";
export default function SurvaysListItem({ survay, onDeleteClick, img }) {
  return (
    <div className="flex flex-col py-6 px-6 shadow-md bg-white hover:bg-gray-50 h-[450px] rounded-lg">
      <img
        src={survay.image_url}
        alt={survay.title}
        className="w-full h-48  object-cover rounded-md"
      />
      <h4 className="mt-4 text-lg font-bold">{survay.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: survay.description }}
        className="overflow-hidden flex-1"
      ></div>
      <div className="flex justify-between items-center mt-3 w-[70%] mx-auto gap-3">
        <div className="flex flex-col gap-2 flex-1">
          <TButton to={`/survay/${survay.id}`}>
            <BsPencil className="w-5 h-5 mr-2" />
            Edit
          </TButton>
          <TButton color="green" href={`/survay/public/${survay.slug}`}>
            <span className="flex justify-center items-center flex-1">
              <BsBoxArrowUpRight className="w-5 h-5 mr-2" />
              View Survay
            </span>
          </TButton>
        </div>
        <div className="flex items-center justify-center h-full rounded-md bg-red-500 w-[70px]">
          {/* <TButton href={`/view/survay/${survay.slug}`} circle link>
            <BsBoxArrowUpRight className="w-5 h-5" />
          </TButton> */}
          {survay.id && (
            <>
              <TButton
                onClickEvent={(ev) => onDeleteClick(survay.id)}
                circle
                link
                color="red"
              >
                <FaTrash className="w-5 h-5 text-white" />
              </TButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
