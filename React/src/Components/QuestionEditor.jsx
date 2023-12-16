import { useState, useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function QuestionEditor({
  index,
  question,
  addQuestion,
  deleteQuestion,
  questionChange,
}) {
  const [model, setModel] = useState({ ...question });
  const { questionTypes } = useStateContext();
  useEffect(() => {
    questionChange(model);
  }, [model]);
  function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function shouldHasOptions(type = null) {
    type = type || model.type;
    return ["select", "radio", "checkbox"].includes(type);
  }
  function onTypeChange(ev) {
    let newModel = {
      ...model,
      type: ev.target.value,
    };
    if (!shouldHasOptions(model.type) && shouldHasOptions(newModel.type)) {
      newModel.data = {
        options: [{ uuid: uuidv4(), text: "" }],
      };
    }else if(shouldHasOptions(model.type) && !shouldHasOptions(newModel.type)){
      newModel.data = {};
    }
    setModel(newModel);
  }
  function addOption() {
    model.data.options.push({
      uuid: uuidv4(),
      text: "",
    });
    console.log(model);
    setModel({ ...model });
  }
  function deleteOption (op){
    model.data.options = model.data.options.filter(option => option.uuid != op.uuid);
    setModel({...model});
  }
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h4>
          {index + 1} . {model.question}
        </h4>
        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center text-ms py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
            onClick={() => addQuestion(index + 1)}
          >
            <AiOutlinePlusCircle className="w-4" />
            Add
          </button>
          <button
            type="button"
            className="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold"
            onClick={() => deleteQuestion(question)}
          >
            <FaTrash className="w-4" />
            Delete
          </button>
        </div>
      </div>
      <div className="flex gap-3 justify-between md-3">
        {/* Question Text */}
        <div className="flex-1">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Question
          </label>
          <input
            type="text"
            name="question"
            id="question"
            value={model.question}
            onChange={(ev) => setModel({ ...model, question: ev.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Question Text */}
        {/* Question Type */}
        <div>
          <label
            htmlFor="questionsType"
            className="block text-sm font-medium text-gray-700 w-40"
          >
            Question Type
          </label>
          <select
            id="questionType"
            name="questionType"
            onChange={onTypeChange}
            value={model.type}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
              py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {questionTypes.map((type, index) => (
              <option value={type} key={index}>
                {upperCaseFirst(type)}
              </option>
            ))}
          </select>
        </div>
        {/* Question Type */}
      </div>
      {/* Question Description  */}
      <div className="flex-1 mb-4">
        <label
          htmlFor="question"
          className="block text-sm font-medium text-gray-700"
        >
          Question Description
        </label>
        <textarea
          name="questionDescription"
          id="questionDescription"
          value={model.description || ""}
          onChange={(ev) =>
            setModel({ ...model, description: ev.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      {/* Question Description  */}
      {shouldHasOptions() && (
        <>
          <h4 className="text-sm font-semibold mb-2 flex justify-between items-center">
            Options
            <button
              type="button"
              className="flex items-center text-sm py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700 transition-all"
              onClick={addOption}
            >
              Add
            </button>
          </h4>
          {model.data.options.length === 0 && (
            <div className="text-xs text-gray-600 text-center "></div>
          )}
          {model.data.options.length === 0 && (
            <div className="text-gray-700 text-center py-4 text-sm">You Don`t Have Any Options Defined</div>
          )}
          {model.data.options.length > 0 && (
            <div>
              {model.data.options.map((op, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="w-fit text-xs mr-2 ">Option {index + 1}.</span>
                  <input
                    type="text"
                    value={op.text}
                    className="flex-1 transition-colors rounded-sm py-1 px-2 text-sm border outline-none border-gray-300 focus:border-indigo-500 hover:border-indigo-500"
                    onInput={ev => {op.text = ev.target.value;setModel({...model})}}
                  />
                  <button
                    type="button"
                    onClick={ev => deleteOption(op)}
                    className="flex p-1  ml-2 rounded-md items-center justify-center border-2 border-transparent transition-colors hover:border-red-500 hover:text-red-500"
                  >
                    <FaTrash className="text-red-500 w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
{
  /* Question Description */
}

{
  /* Question Description */
}
