export default function SurvayPublicQuestion({
  question,
  index,
  answerChanged,
}) {
  let selectedOptions = [];
  function onCheckboxChanged(option, $event) {
    if ($event.target.checked) {
      selectedOptions.push(option.text);
    } else {
      selectedOptions = selectedOptions.filter((op) => op != option.text);
    }
    answerChanged(selectedOptions);
  }
  return (
    <>
      <fieldset className="mb-4">
        <div>
          <legend className="text-base font-medium text-gray-900">
            Question: {index + 1} - {question.question}
          </legend>
          <p className="text-gray-500 text-sm">
            Description: {question.description}
          </p>
        </div>
        <div className="mt-3 pl-5">
          {question.type === "select" && (
            <div key={index}>
              <select
                className="mt-1 block w-full py-2 px-3 borer border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm-text-sm"
                onChange={(ev) => answerChanged(ev.target.value)}
              >
                <option value="">Please Select Your Answer</option>
                {question.data.options.map((option) => (
                  <option value={option.text} key={option.uuid}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          )}
          {question.type === "radio" && (
            <div key={index}>
              {question.data.options.map((option) => (
                <div key={option.uuid} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={"question" + question.id}
                    value={option.text}
                    onChange={(ev) => answerChanged(ev.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-500 border-gray-300"
                    id={option.uuid}
                  />
                  <label
                    htmlFor={option.uuid}
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === "checkbox" && (
            <div key={index}>
              {question.data.options.map((option) => (
                <div className="flex items-center mb-2" key={option.uuid}>
                  <input
                    type="checkbox"
                    onChange={(ev) => onCheckboxChanged(option, ev)}
                    id={option.uuid}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={option.uuid}
                    className="ml-3 block text-sm font-medium text-gray"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === "text" && (
            <div key={index}>
              <input
                type="text"
                onChange={(ev) => answerChanged(ev.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          )}
          {question.type === "textarea" && (
            <div key={index}>
              <textarea
                onChange={(ev) => answerChanged(ev.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
          )}
        </div>
      </fieldset>
      <hr className="mb-4 border-gray-300" />
    </>
  );
}
