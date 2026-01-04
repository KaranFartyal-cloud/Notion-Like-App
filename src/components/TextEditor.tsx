"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { MenuBar } from "./Menubar";
import { callAI } from "@/app/actions/askAI";
import { storeData } from "@/app/actions/pages/storeContent";
import type { JSONContent } from "@tiptap/core";
import "@/components/tiptap-node/image-node/image-node.scss";
import { extensions } from "./tiptap/extensions";
import {
  SlashCmdProvider,
  enableKeyboardNavigation,
} from "@harshtalks/slash-tiptap";
import { suggestions } from "./tiptap/slashCommandConfig";
import { SlashCmd } from "@harshtalks/slash-tiptap";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon, CircleArrowUp, Sparkles } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  id: string | undefined;
  userId: string | undefined;
  title: string | undefined;
  icon: string | null | undefined;
  banner: string | null | undefined;
  JsonDoc: string | JSONContent;
};

const SynapsoEditor: React.FC<Props> = ({
  id,
  title,
  icon,
  banner,
  JsonDoc,
}) => {
  const [showCommandInput, setShowCommandInput] = useState(false);
  const [commandText, setCommandText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [changeColor, setChangeColor] = useState(false);
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
    content: JsonDoc,
    editorProps: {
      handleDOMEvents: {
        keydown: (_, v) => enableKeyboardNavigation(v),
      },
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",

        spellcheck: false,
      },
    },
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
      const text = editor.getText();
      const result = await callAI(text, commandText);

      editor.chain().focus().insertContent(String(result)).run();
    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setCommandText("");
      setShowCommandInput(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCommandText(value);
    setChangeColor(value.trim().length > 0);
  };

  return (
    <EditorContext.Provider value={{ editor }}>
      <SlashCmdProvider>
        <MenuBar editor={editor} />
        {showCommandInput && (
          <div className="absolute bottom-0 -translate-y-[7vh] translate-x-[9vw] z-50 bg-[#FEFDFE] rounded-lg w-1/2">
            <InputGroup>
              <InputGroupButton className={"h-full flex items-center"}>
                <Sparkles />
              </InputGroupButton>
              <InputGroupInput
                ref={inputRef}
                className="bg-transparent outline-none text-black w-full"
                value={commandText}
                onChange={handleChange}
                placeholder="press Esc to exit"
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
              <Separator orientation="vertical" className="!h-4 mr-3" />
              <InputGroupAddon align={"inline-end"}>
                <InputGroupButton
                  variant="default"
                  className={`rounded-full  ${
                    changeColor ? "bg-blue-500" : "bg-gray-400"
                  }`}
                  size="icon-xs"
                  disabled
                >
                  <ArrowUpIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        )}
        <EditorContent
          className="mt-10 text-white"
          placeholder="Press ctrl + space to ask from synapso AI.."
          editor={editor}
        />
        <SlashCmd.Root editor={editor}>
          <SlashCmd.Cmd className="bg-white rounded-lg h-[200px] overflow-hidden">
            <SlashCmd.Empty className="text-black ">
              No commands available
            </SlashCmd.Empty>
            <SlashCmd.List className="slash-menu-root ">
              {suggestions.map((item, index) => {
                return (
                  <SlashCmd.Item
                    className="slash-menu-item"
                    value={item.title}
                    onCommand={(val) => {
                      item.command(val);
                    }}
                    key={item.title}
                  >
                    <p>{item.title}</p>
                  </SlashCmd.Item>
                );
              })}
            </SlashCmd.List>
          </SlashCmd.Cmd>
        </SlashCmd.Root>
      </SlashCmdProvider>
    </EditorContext.Provider>
  );
};

export default SynapsoEditor;
