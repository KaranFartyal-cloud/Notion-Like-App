"use client";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "@/styles/styles.scss";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { Button } from "@/components/tiptap-ui-primitive/button";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Redo,
  SquareDashedBottomCode,
  Undo,
} from "lucide-react";
import { StrikeIcon } from "./tiptap-icons/strike-icon";

const extensions = [
  TextStyleKit,
  StarterKit,
  Highlight.configure({ multicolor: true }),
];

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,

    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor?.isActive("strike") ?? false,
        canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor?.isActive("code") ?? false,
        canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor?.isActive("paragraph") ?? false,
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,

        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <Toolbar variant="fixed">
      <ToolbarGroup className="control-group">
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={
            "flex items-center" + editorState.isBold ? "is-active" : ""
          }
        >
          <Bold width={15} />
        </Button>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : ""}
        >
          <Italic width={15} />
        </Button>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : ""}
        >
          <StrikeIcon width={15} />
        </Button>
      </ToolbarGroup>
      <ToolbarSeparator />
      <Button
        data-style="ghost"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        className={editorState.isCode ? "is-active" : ""}
      >
        <Code width={15} />
      </Button>
      <ToolbarSeparator />
      <ToolbarGroup className="control-group">
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          H1
        </Button>
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : ""}
        >
          H2
        </Button>
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : ""}
        >
          H3
        </Button>
      </ToolbarGroup>
      <ToolbarSeparator />
      <Button
        data-style="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editorState.isBulletList ? "is-active" : ""}
      >
        <List width={15} />
      </Button>
      <Button
        data-style="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editorState.isOrderedList ? "is-active" : ""}
      >
        <ListOrdered width={15} />
      </Button>
      <ToolbarSeparator />
      <Button
        data-style="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editorState.isCodeBlock ? "is-active" : ""}
      >
        <SquareDashedBottomCode width={15} />
      </Button>
      <ToolbarSeparator />
      <ToolbarGroup>
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()
          }
          className={
            editor?.isActive("highlight", { color: "#ffc078" })
              ? "is-active"
              : ""
          }
        >
          <div className="h-[15px] w-[15px] rounded-full bg-[#ffc078]"></div>
        </Button>
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#8ce99a" }).run()
          }
          className={
            editor?.isActive("highlight", { color: "#8ce99a" })
              ? "is-active"
              : ""
          }
        >
          <div className="h-[15px] w-[15px] rounded-full bg-[#8ce99a]"></div>
        </Button>
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#74c0fc" }).run()
          }
          className={
            editor?.isActive("highlight", { color: "#74c0fc" })
              ? "is-active"
              : ""
          }
        >
          <div className="h-[15px] w-[15px] rounded-full bg-[#74c0fc]"></div>
        </Button>
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#b197fc" }).run()
          }
          className={
            editor?.isActive("highlight", { color: "#b197fc" })
              ? "is-active"
              : ""
          }
        >
          <div className="h-[15px] w-[15px] rounded-full bg-[#b197fc]"></div>
        </Button>
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: " #ffa8a8" }).run()
          }
          className={
            editor?.isActive("highlight", { color: " #ffa8a8" })
              ? "is-active"
              : ""
          }
        >
          <div className="h-[15px] w-[15px] rounded-full bg-[#ffa8a8]"></div>
        </Button>
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#F8EE97" }).run()
          }
          className={
            editor?.isActive("highlight", { color: "#F8EE97" })
              ? "is-active"
              : ""
          }
        >
          <div className="h-[15px] w-[15px] rounded-full bg-[#F8EE97]"></div>
        </Button>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          disabled={!editor?.isActive("highlight")}
        >
          Unset highlight
        </Button>
      </ToolbarGroup>
      <ToolbarSeparator />{" "}
      <ToolbarGroup>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Undo width={15} />
        </Button>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <Redo width={15} />
        </Button>
      </ToolbarGroup>
    </Toolbar>
  );
}

export default () => {
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    content: `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`,
  });

  const getData = () => {
    console.log(JSON.stringify(editor?.getJSON()));
  };

  return (
    <div>
      <MenuBar editor={editor} />
      <button onClick={getData}>get data</button>
      <EditorContent editor={editor} className="notion-editor" />
    </div>
  );
};
