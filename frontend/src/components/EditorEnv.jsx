import { Editor } from "@monaco-editor/react";

const EditorEnv = ({ value, handleChange, viewSize }) => {
  return (
    <Editor
      className="pt-[10px]"
      onChange={handleChange}
      value={value}
      height="89vh"
      defaultLanguage="c"
      theme="vs-dark"
      options={{
        fontSize: viewSize,
        minimap: { enabled: true },
        lineNumbers: "on",
        automaticLayout: true,
        tabSize: 4,
        insertSpaces: true,
        lineNumbersMinChars: 3,

        wordWrap: "off",
        scrollbar: {
          horizontal: "visible",
          vertical: "visible",
          alwaysConsumeMouseWheel: false,
        },
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default EditorEnv;
