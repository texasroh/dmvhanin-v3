import {
  BoldButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from "@draft-js-plugins/buttons";
import Editor from "@draft-js-plugins/editor";
import PluginEditor from "@draft-js-plugins/editor/lib/Editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import { EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useEffect, useRef, useState } from "react";

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

interface DraftEditorProps {
  placeholder?: string;
  readonly?: boolean;
  onChange?: (state: EditorState) => void;
  emptySwitch?: boolean;
}

const DraftEditor = ({
  placeholder,
  onChange,
  readonly,
  emptySwitch,
}: DraftEditorProps) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editorRef = useRef<PluginEditor>(null);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const focus = () => {
    editorRef.current?.focus();
  };

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, [emptySwitch]);

  return (
    <div className="space-y-4 rounded border p-4" onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={(state) => {
          setEditorState(state);
          onChange?.(state);
        }}
        handleKeyCommand={handleKeyCommand}
        plugins={[staticToolbarPlugin]}
        ref={editorRef}
        placeholder={placeholder}
        readOnly={readonly}
      />
      <Toolbar>
        {(externalProps) => (
          <div>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
          </div>
        )}
      </Toolbar>
    </div>
  );
};

export default DraftEditor;
