import { Editor } from '@tiptap/react'

/**
 * Toolbar Component
 *
 * Provides a formatting toolbar for the Tiptap rich text editor. 
 * Enables users to apply various formatting options to the selected content.
 *
 * Features:
 * - Text formatting: Bold, Italic, Underline
 * - Headings: H1, H2, H3
 * - Lists: Bullet and Ordered
 * - Block elements: Blockquote, Code block, Horizontal rule
 * - History: Undo / Redo
 * - Inline Links: Prompt-based URL insertion
 *
 * Props:
 * - editor: The Tiptap editor instance (nullable)
 *
 * Behavior:
 * - Each button runs a specific editor chain command to modify the content
 * - Link button prompts for a URL and applies it to the selected text
 *
 * Parent:
 * - Typically used inside the main Editor component
 */


interface Props {
  editor: Editor | null
}

const Toolbar = ({ editor }: Props) => {
  if (!editor) return null

  const btn =
    'px-3 py-1 border border-gray-300 dark:border-gray-600 rounded mx-1 text-sm font-medium ' +
    'bg-white text-black hover:bg-gray-200 ' +
    'dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 transition';

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 mb-4  rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
      <button className={btn} onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝ Quote</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</button>
      <button className={btn} onClick={() => editor.chain().focus().setHorizontalRule().run()}>― HR</button>
      <button className={btn} onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button className={btn} onClick={() => editor.chain().focus().redo().run()}>Redo</button>
      <button className={btn} onClick={() => {
        const url = prompt('Enter URL')
        if (url) editor.chain().focus().setLink({ href: url }).run()
      }}>🔗 Link</button>
    </div>
  )
}

export default Toolbar
