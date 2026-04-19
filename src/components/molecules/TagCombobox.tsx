import { Combobox } from "@base-ui/react/combobox";
import { useState } from "react";

import type { Tag } from "../../collections/tagsCollection";

import { createOption, input, option, popup } from "./tagCombobox.css";

interface TagComboboxProps {
  allTags: readonly Tag[];
  appliedTagNames: readonly string[];
  onSelect: (tagName: string) => void;
}

export default function TagCombobox({
  allTags,
  appliedTagNames,
  onSelect,
}: Readonly<TagComboboxProps>) {
  const [inputValue, setInputValue] = useState("");

  const appliedSet = new Set(appliedTagNames.map((n) => n.toLowerCase()));
  const availableNames = allTags.map((t) => t.name).filter((n) => !appliedSet.has(n.toLowerCase()));
  const filtered = availableNames.filter((name) =>
    name.toLowerCase().includes(inputValue.toLowerCase()),
  );
  const exactMatch = availableNames.some(
    (name) => name.toLowerCase() === inputValue.trim().toLowerCase(),
  );

  const items =
    inputValue.trim() !== "" && !exactMatch ? [...filtered, inputValue.trim()] : filtered;

  const handleValueChange = (value: string | null) => {
    if (value !== null && value !== "") {
      onSelect(value);
      setInputValue("");
    }
  };

  return (
    <Combobox.Root
      // oxlint-disable-next-line unicorn/no-null -- base-ui requires null for "no selection"
      value={null}
      onValueChange={handleValueChange}
      onInputValueChange={(val) => {
        setInputValue(val);
      }}
      items={items}
    >
      <Combobox.Input className={input} placeholder="+ tag" />
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup className={popup}>
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className={availableNames.includes(item) ? option : createOption}
                >
                  {availableNames.includes(item) ? item : `Create "${item}"`}
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
