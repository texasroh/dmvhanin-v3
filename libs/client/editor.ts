import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const editorStateToObject = (editorState: EditorState) =>
  convertToRaw(editorState.getCurrentContent());
export const editorStateToString = (editorState: EditorState) =>
  JSON.stringify(editorStateToObject(editorState));
export const editorStateToHTML = (editorState: EditorState) =>
  draftToHtml(editorStateToObject(editorState));
