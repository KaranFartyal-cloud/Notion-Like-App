import { Extension, nodePasteRule } from "@tiptap/core";

export const imageRegex = /!\[(.*?)\]\((.*?)\)/g;

export const ImagePasteRule = Extension.create({
  name: "imagePasteRule",

  addPasteRules() {
    return [
      nodePasteRule({
        find: imageRegex,
        type: this.editor.schema.nodes.image,
        getAttributes: (match) => ({
          alt: match[1],
          src: match[2],
        }),
      }),
    ];
  },
});
