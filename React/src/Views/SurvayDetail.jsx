import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../AxiosClient/Axios";
import Spinner from "../Components/Core/Spinner";

export default function SurvayDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState({
    title_error: "",
    date_error: "",
    status_error: "",
  });
  const [survay, setSurvay] = useState({
    title: "",
    slug: "",
    status: "",
    description: "",
    image: "",
    image_url: "",
    expire_date: "",
    questions: [],
  });
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/survay/${id}`)
      .then(({ data }) => {
        setSurvay(data.data);
        console.log(survay);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="container mx-auto py-10">
      {loading && <Spinner />}
      {!loading && (
        <div className="flex gap-24 h-full items-center">
          <div className="image rounded-md shadow-lg w-fit">
            <img
              src={survay.image_url}
              alt="Item Image"
              className="w-[500px] h-[500px] rounded-md"
            />
          </div>
          <div className="flex-1 flex justify-start items-start gap-2 min-h-full flex-col">
            <h1 className="text-indigo-500 text-4xl font-bold mb-5">
              {survay?.title}
            </h1>
            <p className="text-gray-500 font-semibold text-md">
              {survay?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
