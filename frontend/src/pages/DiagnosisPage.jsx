import { MdAdd } from "react-icons/md";
import { useState } from "react";
import EditorEnv from "../components/EditorEnv";
import { RiSubtractLine } from "react-icons/ri";
const DiagnosisPage = () => {
  const [value, setvalue] = useState(`#include <iostream>

using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}`);

  const [viewSize, setViewSize] = useState(18);
  function handleChange(value) {
    setvalue(value);
  }
  function handleViewIncrease() {
    setViewSize((prev) => prev + 1);
  }

  function handleViewDecrese() {
    setViewSize((prev) => prev - 2);
  }
  return (
    <div className="w-full h-screen flex flex-row justify-center gap-3 items-center ">
      <div className="w-[52%] ">
        <nav className="full h-[40px] bg-zinc-900 flex flex-row justify-between p-2 items-center">
          <span className="text-white">Write your Embeded Code </span>
          <div className="tools w-auto h-[30px] bg-black p-2  gap-3 flex flex-row justify-center items-center">
            <button onClick={handleViewIncrease}>
              <MdAdd className="text-[20px] text-white" />
            </button>
            <button onClick={handleViewDecrese}>
              <RiSubtractLine className="text-[20px] text-white" />
            </button>
          </div>
        </nav>

        <EditorEnv
          handleChange={handleChange}
          value={value}
          viewSize={viewSize}
        />
      </div>

      <div className="w-[45%] h-[94vh] bg-gray-900 flex flex-col justify-center items-center ">
        <h1 className="text-white font-extrabold">output here</h1>
      </div>
    </div>
  );
};

export default DiagnosisPage;
