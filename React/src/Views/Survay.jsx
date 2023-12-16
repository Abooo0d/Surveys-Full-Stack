import PageComponent from "../Components/PageComponent";
import SurvaysListItem from "../Components/SurvaysListItem";
import { useStateContext } from "../Contexts/ContextProvider";
import image1 from "../Assets/ffffffff.jpg";
import image2 from "../Assets/iced-americano.png";
import image3 from "../Assets/vegetables.jpg";
import { BsPlusCircle } from "react-icons/bs";
import TButton from "../Components/Core/TButton";
import { useEffect, useState } from "react";
import axiosClient from "../AxiosClient/Axios";
import PaginationLinks from "../Components/PaginationLinks";
import Spinner from "../Components/Core/Spinner";
// import { Spinner } from "@material-tailwind/react";
let images = [image1, image2, image3];
export default function Survay() {
  // const { survays } = useStateContext();
  const [survays, setSurvays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const { showToast } = useStateContext();

  const onDeleteClick = (id) => {
    if (window.confirm("Are You Sure To Delete This Survay!!")) {
      axiosClient.delete(`/survay/${id}`).then(() => {
        getSurvays();
        showToast("The Survay Was Deleted Successfully");
      });
    }
  };
  function onPageClick(link) {
    getSurvays(link.url);
  }
  const getSurvays = (url) => {
    url = url || "/survay";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setSurvays(data.data);
        setMeta(data.meta);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSurvays();
  }, []);
  return (
    <PageComponent
      title="Survay"
      buttons={
        <TButton color="green" to="/survay/create">
          <BsPlusCircle className="h-6 w-6 mr-2" />
          Create New Survay
        </TButton>
      }
    >
      {loading && <Spinner />}
      {!loading && (
        <div>
          {survays.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              You hae No Survays Created
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {survays.map((survay, index) => (
              <SurvaysListItem
                survay={survay}
                key={survay.id}
                onDeleteClick={onDeleteClick}
                img={images[index]}
              />
            ))}
          </div>
          {survays.length > 0 && (
            <PaginationLinks meta={meta} onPageClick={onPageClick} />
          )}
        </div>
      )}
    </PageComponent>
  );
}
