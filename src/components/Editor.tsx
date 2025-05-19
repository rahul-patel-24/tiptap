import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Toolbar from "./Toolbar";
import ImageUpload from "./ImageUpload";
import { useEffect } from "react";
import OutputPanel from "./OutputPanel";

/**
 * Editor Component
 *
 * A rich text editor built with Tiptap (v2), supporting:
 * - Standard formatting (bold, italic, underline, lists, blockquotes)
 * - Headings (H1–H3)
 * - Inline links
 * - Code blocks with syntax highlighting (via lowlight)
 * - Local image upload (via button and drag-and-drop)
 * - Placeholder support
 * - Dark mode compatible styling
 * - HTML and JSON output preview
 *
 * Extensions used:
 * - StarterKit (Paragraph, List, Bold, Italic, Blockquote, etc.)
 * - Underline
 * - Image
 * - Link (with custom HTML attributes)
 * - Placeholder
 * - CodeBlockLowlight with lowlight language set
 *
 * Children:
 * - Toolbar: Renders formatting buttons
 * - ImageUpload: Handles image file input
 * - OutputPanel: Displays HTML and JSON output
 * - EditorContent: Main editor area
 */


const Editor = () => {
  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose md:prose-lg lg:prose-xl xl:prose-2xl focus:outline-none max-w-full min-h-[300px] p-4 border rounded-md border-gray-300 bg-white text-black dark:prose-invert dark:bg-gray-800 dark:text-white",
      },
      handlePaste(view, event) {
        const text = event.clipboardData?.getData("text/plain");
        if (text?.startsWith("# ")) {
          event.preventDefault();
          view.dispatch(view.state.tr.insertText(text));
          return true;
        }
        return false;
      },
    },
  });

  // Drag and drop image support
  useEffect(() => {
    if (!editor) return;
    const el = editor.view.dom;
    const handleDrop = (event: DragEvent) => {
      const file = event.dataTransfer?.files?.[0];
      if (file && file.type.startsWith("image/")) {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result as string })
            .run();
        };
        reader.readAsDataURL(file);
      }
    };
    el.addEventListener("drop", handleDrop);
    return () => el.removeEventListener("drop", handleDrop);
  }, [editor]);

  return (
    <div className="space-y-4">
      <Toolbar editor={editor} />
      <ImageUpload editor={editor} />
      <EditorContent editor={editor} />
      <OutputPanel editor={editor} />
    </div>
  );
};

export default Editor;
