import { Editor } from "@tiptap/react";

/**
 * ImageUpload Component
 *
 * Provides an interface for uploading images from the local device into the Tiptap editor.
 *
 * Features:
 * - Accepts only image files (PNG, JPG, etc.)
 * - Uses FileReader API to convert selected image to a base64 data URL
 * - Inserts the image into the editor using Tiptap's Image extension
 *
 * Props:
 * - 
 *
 * Behavior:
 * - If a valid image is selected, it's read and injected at the current cursor position.
 *
 * Parent:
 * - Used within the main Editor component
 */


const ImageUpload = ({ editor }: { editor: Editor | null }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
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

  return (
    <div className="border-dashed ">
      <input
        className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUpload;
