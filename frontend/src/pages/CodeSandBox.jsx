import { MdAdd } from "react-icons/md";
import { useState } from "react";
import EditorEnv from "../components/EditorEnv";
import { RiSubtractLine } from "react-icons/ri";
import { setCode } from "../store/codeSlice";
import { useSelector, useDispatch } from "react-redux";

const CodeSandBox = () => {
  const dispatch = useDispatch();
  const { code } = useSelector((state) => state.codeSlice);

  const [viewSize, setViewSize] = useState(18);
  function handleChange(code) {
    dispatch(setCode(code));
  }
  function handleViewIncrease() {
    setViewSize((prev) => Math.min(prev + 2, 40));
  }

  function handleViewDecrese() {
    setViewSize((prev) => Math.max(prev - 2, 12));
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
          value={code}
          viewSize={viewSize}
          path="main.js"
        />
        <div className="text-white font-[40px]">{code}</div>
      </div>

      <div className="w-[45%] h-[94vh] bg-gray-900 flex flex-col justify-center items-center ">
        <h1 className="text-white font-extrabold">output here</h1>
      </div>
    </div>
  );
};

export default CodeSandBox;
