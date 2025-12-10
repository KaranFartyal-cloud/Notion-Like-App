"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { configureLink } from "@/config/link";
import Highlight from "@tiptap/extension-highlight";
import { MenuBar } from "./Menubar";
import { callAI } from "@/app/actions/askAI";
import { storeData } from "@/app/actions/pages/storeContent";
import type { JSONContent } from "@tiptap/core";

const extensions = [
  TextStyleKit,
  StarterKit,
  Highlight.configure({ multicolor: true }),
  configureLink,
];

type Props = {
  id: string | undefined;
  userId: string | undefined;
  title: string | undefined;
  icon: string | null | undefined;
  banner: string | null | undefined;
};

const SynapsoEditor: React.FC<Props> = ({ id, title, icon, banner }) => {
  const [showCommandInput, setShowCommandInput] = useState(false);
  const [commandText, setCommandText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSave = useCallback(
    (json: JSONContent) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const serialized = JSON.stringify(json);

          await storeData(
            serialized,
            id,
            title,
            icon ?? undefined,
            banner ?? undefined
          );
          console.log("Autosaved to Neon");
        } catch (err) {
          console.error("Autosave error:", err);
        }
      }, 1500);
    },
    [id, title, icon, banner]
  );

  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    content: ``,
    onUpdate({ editor }) {
      const json = editor.getJSON();
      debouncedSave(json); // 👈 hook autosave into editor updates
    },
  });

  // focus editor on mount
  useEffect(() => {
    if (!editor) return;

    const t = setTimeout(() => {
      editor.commands.focus("end");
    }, 0);

    return () => clearTimeout(t);
  }, [editor]);

  // Track cursor position for command input placement
  useEffect(() => {
    if (!editor) return;

    const handler = () => {
      const pos = editor.view.coordsAtPos(editor.state.selection.from);
      setCoords({
        top: pos.bottom,
        left: pos.left,
      });
    };

    editor.on("selectionUpdate", handler);
    return () => {
      editor.off("selectionUpdate", handler);
    };
  }, [editor]);

  // Focus input when shown
  useEffect(() => {
    if (showCommandInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showCommandInput]);

  // Global key handler: Ctrl+Space & Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        setShowCommandInput(true);
        return;
      }

      if (e.key === "Escape") {
        setShowCommandInput(false);
        setCommandText("");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (!editor) return null;

  const handleAskAI = async () => {
    try {
      const result = await callAI();
      editor.chain().focus().insertContent(String(result)).run();
    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setCommandText("");
      setShowCommandInput(false);
    }
  };

  return (
    <EditorContext.Provider value={{ editor }}>
      <MenuBar editor={editor} />

      {showCommandInput && (
        <div
          className="absolute z-50 bg-[#1f1f1f] border border-gray-700 rounded-lg p-2 w-1/2"
          style={{ top: coords.top + 4, left: coords.left }}
        >
          <input
            ref={inputRef}
            className="bg-transparent outline-none text-white w-full"
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            placeholder="Ask Synapso AI… (not used yet)"
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await handleAskAI();
              }
              if (e.key === "Escape") {
                setShowCommandInput(false);
                setCommandText("");
              }
            }}
          />
        </div>
      )}

      <EditorContent
        className="mt-10 text-white"
        placeholder="Press ctrl + space to ask from synapso AI.."
        editor={editor}
      />
    </EditorContext.Provider>
  );
};

export default SynapsoEditor;
