import Editor, { OnMount } from "@monaco-editor/react";

export default function EditorPanel() {
  const handleMount: OnMount = (monacoEditor, monaco) => {
    monaco.editor.defineTheme("tron-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "", foreground: "00ffff", background: "000000" },
        { token: "comment", foreground: "007777" },
        { token: "keyword", foreground: "00eaff", fontStyle: "bold" },
        { token: "string", foreground: "00ff9d" },
        { token: "variable", foreground: "b3f7ff" },
        { token: "number", foreground: "00ffd5" },
      ],
      colors: {
        "editor.background": "#00000000",
        "editorWidget.background": "#00000000",
        "editorGutter.background": "#00000000",
        "editorGroup.border": "#00000000",
        "editorPane.background": "#00000000",
        "editorHoverWidget.background": "#00000000",
        "editorSuggestWidget.background": "#00000000",
        "editorCursor.foreground": "#00ffff",
        "editor.lineHighlightBackground": "#0a0f1e55",
        "editorLineNumber.foreground": "#0fe0ff80",
        "editor.selectionBackground": "#00c7ff55",
        "editorBracketMatch.border": "#00fff2",
      },
    });

    monaco.editor.setTheme("tron-dark");
  };

  return (
    <Editor
    height={"100vh"}
      defaultLanguage="javascript"
      defaultValue="// NeoTron Editor Ready"
      theme="tron-dark"
      onMount={handleMount}
      options={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 14,
        minimap: { enabled: false },
        smoothScrolling: true,
        cursorBlinking: "smooth",
        roundedSelection: false,
        padding: { top: 10 },
        lineDecorationsWidth: 16,
        lineNumbersMinChars: 3,
      }}
    />
  );
}
