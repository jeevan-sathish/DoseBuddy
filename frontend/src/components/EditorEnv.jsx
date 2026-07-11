import { Editor } from "@monaco-editor/react";

const EditorEnv = ({ value, handleChange, viewSize, path }) => {
  return (
    <Editor
      path={path}
      className="pt-2.5"
      onChange={(value) => handleChange(value ?? "")}
      value={value}
      height="89vh"
      language="javascript"
      theme="vs-dark"
      options={{
        fontSize: viewSize,
        minimap: {
          enabled: true,
        },

        automaticLayout: true,

        quickSuggestions: {
          other: true,
          comments: true,
          strings: true,
        },

        suggestOnTriggerCharacters: true,

        acceptSuggestionOnCommitCharacter: true,

        acceptSuggestionOnEnter: "on",

        tabCompletion: "on",

        parameterHints: {
          enabled: true,
        },

        wordBasedSuggestions: "allDocuments",

        autoClosingBrackets: "always",

        autoClosingQuotes: "always",

        autoIndent: "full",

        formatOnPaste: true,

        formatOnType: true,

        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default EditorEnv;
