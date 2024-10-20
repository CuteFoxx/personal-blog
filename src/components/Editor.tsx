import Bold from "@tiptap/extension-bold";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import { useCallback } from "react";

const Editor = ({ setData }: { setData: any }) => {
  const editor = useEditor({
    extensions: [
      Bold,
      Document,
      Paragraph,
      Text,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      Dropcursor,
    ],
    content: `Heres some sample text`,
    onUpdate({ editor }) {
      setData(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }
  if (editor) {
    const addImage = useCallback(() => {
      const url = window.prompt("URL");

      if (url) {
        editor.chain().focus()?.setImage({ src: url }).run();
      }
    }, [editor]);

    if (!editor) {
      return null;
    }

    return (
      <div className="editor">
        <div className="control-group">
          <div className="button-group">
            {/* LISTS END CODE BLOCK */}
            <button
              title="Code block"
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleCodeBlock().run();
              }}
              className={editor.isActive("codeBlock") ? "is-active" : ""}
            >
              <img src="/editor/code.png" alt="Code block" />
            </button>
            <button
              title="Bullet list"
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleBulletList().run();
              }}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              <img src="/editor/b-list.png" alt="Bullet list" />
            </button>
            <button
              title="Numbered list"
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleOrderedList().run();
              }}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              <img src="/editor/o-list.png" alt="Ordered list" />
            </button>
          </div>
          <div className="button-group">
            <button title="image" onClick={addImage}>
              <img src="/editor/image.png" alt="Image" />
            </button>
            {/* TEXT ALIGN */}
            <button
              title="align left"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "is-active" : ""
              }
            >
              <img src="/editor/align-left.png" alt="Align left" />
            </button>
            <button
              title="align center"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "is-active" : ""
              }
            >
              <img src="/editor/align-center.png" alt="Align center" />
            </button>
            <button
              title="align right"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "is-active" : ""
              }
            >
              <img src="/editor/align-right.png" alt="Align right" />
            </button>
          </div>
          <div className="button-group">
            {/* STYLING */}
            <button
              title="bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <img src="/editor/bold.png" alt="Bold" />
            </button>
            <button
              onClick={(e) => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                e.preventDefault();
              }}
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              onClick={(e) => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                e.preventDefault();
              }}
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={(e) => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                e.preventDefault();
              }}
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              H3
            </button>
          </div>
        </div>

        <EditorContent editor={editor} />
      </div>
    );
  }
};

export default Editor;
