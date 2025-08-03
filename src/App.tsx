import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Card, Text, TextField } from "@radix-ui/themes";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";

const App = () => {
  const [thing, setThing] = useState<string>("");

  const [list, setList] = useState<string[]>([]);

  // Change事件实时绑定输入框的值
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setThing(event.target.value);
  }

  // onKeyDown事件，提交任务时触发
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.code !== "Enter" || !thing.trim()) return;
    setList([...list, thing]);
    setThing("");
  }

  return (
    <div className="h-lvh w-full flex items-center justify-center">
      <div className="w-3xl flex flex-col items-center space-y-6">
        <TextField.Root
          placeholder="请输入待办事项"
          size={"3"}
          className="w-full"
          value={thing}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Box className="w-full">
          <div className="space-y-2">
            {list.map((item, index) => (
              <Card key={index}>
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {item}
                  </Text>
                </Box>
              </Card>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default App;
