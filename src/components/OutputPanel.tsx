import { Editor } from "@tiptap/react";

/**
 * OutputPanel Component
 *
 * Displays the editor's current content in both HTML and JSON formats.
 *
 * Features:
 * - Shows a cleaned HTML output 
 * - Shows a formatted JSON structure of the editor content
 *
 * Props:
 * - editor: The Tiptap editor instance (nullable)
 *
 * Behavior:
 * - HTML output is rendered using `.getHTML()` and processed with `.replace()` to truncate long base64 strings.
 * - JSON output is rendered using `.getJSON()` and filters image sources similarly.
 * 
 * Parent:
 * - Used within the main Editor component
 */


const OutputPanel = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="p-4 mt-4 bg-gray-100 rounded text-sm  text-black dark:bg-gray-900 dark:text-white">
      <h2 className="font-bold mb-2">HTML Output</h2>
      <pre className="p-4 mt-4 border rounded text-sm bg-white text-black dark:bg-gray-900 dark:text-white whitespace-pre-wrap break-words overflow-auto">
        {editor
          .getHTML()
          ?.replace(
            /<img src="data:image\/[^"]+"/g,
            '<img src="[base64 image data truncated]"'
          )}
      </pre>

      <h2 className="font-bold mt-4 mb-2">JSON Output</h2>
      <pre className="p-4 mt-4 border rounded text-sm bg-white text-black dark:bg-gray-900 dark:text-white whitespace-pre-wrap break-words overflow-auto">
        {JSON.stringify(
          (editor
            .getJSON()
            ?.content ?? []).map((item) => {
              if (item.type === "image") {
                return { ...item, attrs: { ...item.attrs, src: "[base64 image data truncated]" } };
              }
              return item;
            }),
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default OutputPanel;
