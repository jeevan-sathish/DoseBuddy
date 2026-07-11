import { loader } from "@monaco-editor/react";

loader.init().then((monaco) => {
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    allowJs: true,
    checkJs: true,
    target: monaco.languages.typescript.ScriptTarget.ESNext,
  });

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
});
