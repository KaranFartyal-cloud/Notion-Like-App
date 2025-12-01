import { useColorHighlight } from "@/components/tiptap-ui/color-highlight-button";
import { Badge } from "@/components/tiptap-ui-primitive/badge";
import { parseShortcutKeys } from "@/lib/tiptap-utils";

export function MyColorHighlightButton({ editor }) {
  const myEditor = editor;
  const {
    isVisible,
    isActive,
    canColorHighlight,
    handleColorHighlight,
    label,
    shortcutKeys,
  } = useColorHighlight({
    editor: myEditor,
    highlightColor: "var(--tt-color-highlight-blue)",
    label: "Blue Highlight",
    hideWhenUnavailable: true,
    onApplied: ({ color, label }) => console.log(`Applied: ${label}`),
  });

  if (!isVisible) return null;

  return (
    <button
      onClick={handleColorHighlight}
      disabled={!canColorHighlight}
      aria-label={label}
      aria-pressed={isActive}
      style={{ backgroundColor: isActive ? highlightColor : "transparent" }}
    >
      {label}
      {shortcutKeys && <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>}
    </button>
  );
}
