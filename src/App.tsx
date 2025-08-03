import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

const App = () => {
  const [thing, setThing] = useState<string>("");

  const [list, setList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("list");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Change事件实时绑定输入框的值
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setThing(event.target.value);
  }

  // onKeyDown事件，提交任务时触发
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.code !== "Enter" || !thing.trim()) return;
    const newList = [...list, thing];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setThing("");
  }

  // 删除事项
  function handleTrash(event: MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.id;
    console.log(id);
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
            {list &&
              list.map((item, index) => (
                <Card key={index}>
                  <Box>
                    <Flex justify={"between"}>
                      <Text
                        as="div"
                        size="3"
                        weight="bold"
                        className="flex items-center"
                      >
                        {item}
                      </Text>
                      <IconButton
                        color="crimson"
                        variant="soft"
                        data-id={index}
                        onClick={handleTrash}
                      >
                        <TrashIcon width="18" height="18" />
                      </IconButton>
                    </Flex>
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
