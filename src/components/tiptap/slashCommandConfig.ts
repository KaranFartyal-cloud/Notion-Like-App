import { createSuggestionsItems } from "@harshtalks/slash-tiptap";

export const suggestions = createSuggestionsItems([
  {
    title: "text",
    searchTerms: ["paragraph"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "Bullet List",
    searchTerms: ["unordered", "point"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Ordered List",
    searchTerms: ["ordered", "point", "numbers"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Add a column",
    searchTerms: ["add", "a", "column"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).addColumnAfter().run();
    },
  },
  {
    title: "Delete a column",
    searchTerms: ["delete", "a", "column"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).deleteColumn().run();
    },
  },
  {
    title: "Add row after",
    searchTerms: ["Add", "row", "after"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).addRowAfter().run();
    },
  },
  {
    title: "Delete row",
    searchTerms: ["delete", "row"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).deleteRow().run();
    },
  },
  {
    title: "Insert Table",
    searchTerms: ["insert", "table"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
  {
    title: "Heading 1",
    searchTerms: ["h1", "heading 1"],
    command: ({ editor }) => {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
  },
  {
    title: "Delete Table",
    searchTerms: ["delete", "table"],
    command: ({ editor }) => {
      editor.chain().focus().deleteTable().run();
    },
  },
]);
