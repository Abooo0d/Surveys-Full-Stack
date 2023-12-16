import React, { useEffect, useState } from "react";
import Page from "../Components/PageComponent";
import { HiOutlinePhoto } from "react-icons/hi2";
import TButton from "../Components/Core/TButton";
import axiosClint from "../AxiosClient/Axios";
import axiosClient from "../AxiosClient/Axios";
import { useNavigate, useParams } from "react-router-dom";
import SurvayQuestions from "../Components/SurvayQuestions";
import Spinner from "../Components/Core/Spinner";
import { useStateContext } from "../Contexts/ContextProvider";
import { TrashIcon } from "@heroicons/react/20/solid";
import { BsLink45Deg } from "react-icons/bs";

export default function SurvayView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(false);
  const onSubmit = (ev) => {
    setLoading(true);
    ev.preventDefault();
    const payload = { ...survay };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/survay/${id}`, payload);
    } else {
      res = axiosClient.post("/survay", payload);
    }
    res
      .then((res) => {
        setLoading(false);
        navigate("/survay");
        if (id) {
          showToast("The Survay Was Updated Successfully");
        } else {
          showToast("The Survay Was Created Successfully");
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.response) {
          const title = err.response.data.errors.title;
          const status = err.response.data.errors.status;
          setErrorMessage({
            ...errorMessage,
            title_error: title,
            status_error: status,
          });
        }
      });
  };
  const onImageChange = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      if (reader.readyState === 2) {
        setSurvay({
          ...survay,
          image: file,
          image_url: reader.result,
        });
        ev.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };
  const onQuestionsUpdate = (questions) => {
    setSurvay({ ...survay, questions });
  };
  const onDelete = () => {};
  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClint
        .get(`/survay/${id}`)
        .then(({ data }) => {
          setSurvay(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);
  return (
    <Page
      title={!id ? "Create New Survay" : "Update Survay"}
      buttons={
        <div className="flex gap-x-3">
          <TButton color="green" href={`/survay/public/${survay.slug}`}>
            <BsLink45Deg className="h-5 w-5 mr-2" />
            Public Link
          </TButton>
          <TButton color="red" onClick={onDelete}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </TButton>
        </div>
      }
    >
      {loading && <Spinner />}
      {!loading && (
        <form action="#" method="post" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white py-5 px-4 sm:p6">
              {/* Image */}
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer "
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {survay.image_url && (
                    <img
                      src={survay.image_url}
                      alt={survay.title}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  )}
                  {!survay.image_url && (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <HiOutlinePhoto className="w-8 h-8" />
                    </span>
                  )}
                  <button
                    type="button"
                    className=" relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3
                              text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50
                              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={onImageChange}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/* Image */}
              {/* Title */}
              <div className="col-span-6 ms:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Survay Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={survay.title}
                  placeholder="Survay Title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(ev) =>
                    setSurvay({ ...survay, title: ev.target.value })
                  }
                />
                {errorMessage.title_error && (
                  <div className="text-red-600 py-2 px-3">
                    {errorMessage.title_error}
                  </div>
                )}
              </div>
              {/* Title */}
              {/* Description */}
              <div className="col-span-6 ms:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Survay Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={survay.description || ""}
                  placeholder="Survay Description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(ev) =>
                    setSurvay({ ...survay, description: ev.target.value })
                  }
                ></textarea>
              </div>
              {/* Description */}
              {/* Expire Date */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="expire_date"
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Expire Date
                </label>
                <input
                  type="date"
                  name="expire_date"
                  id="expire_date"
                  value={survay.expire_date}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(ev) => {
                    setSurvay({ ...survay, expire_date: ev.target.value });
                    console.log(ev.target.value);
                  }}
                />
              </div>
              {/* Expire Date */}
              {/* Active */}
              <div className="flex items-start flex-wrap">
                <div className="flex h5 items-center">
                  <input
                    type="checkbox"
                    name="status"
                    id="status"
                    // checked={survay.status}
                    value={survay.status}
                    placeholder="Survay Title"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={survay.status}
                    onChange={(ev) => {
                      setSurvay({ ...survay, status: ev.target.checked });
                    }}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="status"
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    Active
                  </label>
                  <p className="text-gray-500">
                    Whether To Make The Survay Publicly Available
                  </p>
                </div>
                {errorMessage.status_error && (
                  <div className="text-red-600 py-2 px-3 w-full">
                    {errorMessage.status_error}
                  </div>
                )}
              </div>
              {/* Active */}
              <SurvayQuestions
                questions={survay.questions}
                onQuestionsUpdate={onQuestionsUpdate}
              />
            </div>
            <div className="bg-gray-50 px-4 py-4 text-right sm-px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </form>
      )}
    </Page>
  );
}
