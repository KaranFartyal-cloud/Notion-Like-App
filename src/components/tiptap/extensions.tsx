import StarterKit from "@tiptap/starter-kit";
import { configureLink } from "@/config/link";
import Highlight from "@tiptap/extension-highlight";
import { TableKit } from "@tiptap/extension-table";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extensions";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Slash } from "@harshtalks/slash-tiptap";
import { ImagePasteRule } from "./pasteRules";
import { CustomTableCell } from "./customtableCell";
import { suggestions } from "./slashCommandConfig";
import ImageResize from 'tiptap-extension-resize-image'


// fix the resize issue

export const extensions = [
  TextStyleKit,
  StarterKit,
  Highlight.configure({ multicolor: true }),
  configureLink,
 
  ImageResize.configure({
    resize: {
      
      enabled: true,
      alwaysPreserveAspectRatio: true,
    },
  }),
  ImagePasteRule,
  TableKit.configure({
    table: { resizable: true },
    tableCell: false,
  }),

  CustomTableCell,
  Slash.configure({
    suggestion: {
      items: () => suggestions,
    },
  }),
  Placeholder.configure({
    placeholder: "Press / to see available commands",
  }),
];
