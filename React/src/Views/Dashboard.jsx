import { useEffect, useState } from "react";
import PageComponent from "../Components/PageComponent";
import axiosClient from "../AxiosClient/Axios";
import Spinner from "../Components/Core/Spinner";
import DashboardCard from "../Components/DashboardCard";
import TButton from "../Components/Core/TButton";
import { BsLink45Deg, BsBoxArrowUpRight } from "react-icons/bs";

import { TrashIcon } from "@heroicons/react/20/solid";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/dashboard")
      .then((res) => {
        setLoading(false);
        setData(res.data);
        return res;
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  }, []);
  return (
    <PageComponent title="Dashboard">
      {loading && <Spinner />}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700 ">
          <DashboardCard
            className="order-1 lg:order-2"
            title="Total Survays"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-8xl font-semibold flex-1 flex items-center justify-center">
              {data.totalSurvays}
            </div>
          </DashboardCard>
          <DashboardCard
            className="order-3 lg:order-1 row-span-2"
            title="Latest Survay"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="text-8xl font-semibold flex-1 flex items-center justify-center">
              {data.latestSurvay && (
                <div className="mt-2">
                  <img
                    src={data.latestSurvay.image_url}
                    className="w-[240px] mx-auto rounded-md"
                  />
                  <h3 className="ftn-bold text-xl my-3">
                    {data.latestSurvay.title ? data.latestSurvay.title : ""}
                  </h3>
                  <div>
                    <div className="flex justify-between text-sm mb-1 px-4">
                      <div className="text-gray-500">Created Date :</div>
                      <div>{data.latestSurvay.created_at}</div>
                    </div>
                    <div className="flex justify-between text-sm mb-1 px-4">
                      <div className="text-gray-500">Expire Date :</div>
                      <div>{data.latestSurvay.expire_date}</div>
                    </div>
                    {/* <div className="flex justify-between text-sm mb-1 px-4">
                      <div className="text-gray-500">Status :</div>
                      <div>{data.latestSurvay.status ? "Active" : "Draft"}</div>
                    </div> */}
                    {/* <div className="flex justify-between text-sm mb-1 px-4">
                      <div className="text-gray-500">Questions :</div>
                      <div>{data.latestSurvay.questions}</div>
                    </div>
                    <div className="flex justify-between text-sm mb-3 px-4">
                      <div className="text-gray-500">Answers :</div>
                      <div>{data.latestSurvay.answers}</div>
                    </div> */}
                    <div className="flex justify-between flex-col gap-2 mt-7">
                      <TButton
                        to={`/survay/${data.latestSurvay.id}`}
                        color="indigo"
                        className="text-center"
                      >
                        <span className="flex justify-center items-center flex-1">
                          <BsLink45Deg className="w-5 h-5 mr-2" />
                          Edit Survay
                        </span>
                      </TButton>
                      <TButton
                        color="green"
                        href={`/survay/public/${data.latestSurvay.slug}`}
                      >
                        <span className="flex justify-center items-center flex-1">
                          <BsBoxArrowUpRight className="w-5 h-5 mr-2" />
                          View Survay
                        </span>
                      </TButton>
                    </div>
                  </div>
                </div>
              )}
              {!data.latestSurvay && (
                <div className="text-gray-700 text-center py-16">
                  You Don`t Have Any Survays Yet
                </div>
              )}
            </div>
          </DashboardCard>
          <DashboardCard
            className="order-2 lg:order-4"
            title="Total Answers"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-8xl font-semibold flex-1 flex items-center justify-center">
              {data.totalAnswers}
            </div>
          </DashboardCard>
          <DashboardCard
            className="order-4 lg:order-3 row-span-2"
            title="latest Answers"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-xl font-semibold flex-1 flex items-center justify-center">
              {data.latestAnswers.length && (
                <div className="text-left">
                  {data.latestAnswers.map((answer) => (
                    <a
                      href="#"
                      key={answer.id}
                      className="block p-2 hover:bg-gray-100/90"
                    >
                      <div className="font-semibold">{answer.survay.title}</div>
                      <small>
                        Answer Made At :{" "}
                        <i className="font-semibold">{answer.end_date} </i>
                      </small>
                    </a>
                  ))}
                </div>
              )}
              {!data.latestAnswers.length && (
                <div className="text-gray-700 text-center py-16">
                  You Don`t Have Any Answers Yet
                </div>
              )}
            </div>
          </DashboardCard>
        </div>
      )}
    </PageComponent>
  );
}
