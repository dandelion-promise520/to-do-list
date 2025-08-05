import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

type InterList = Array<{ id: number; content: string }>;

const App = () => {
  const [things, setThings] = useState<string>("");

  const [list, setList] = useState<InterList>(() => {
    try {
      const stored = localStorage.getItem("list");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Change事件实时绑定输入框的值
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setThings(event.target.value);
  }

  // onKeyDown事件，提交任务时触发
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.code !== "Enter" || !things.trim()) return;
    const newList = [...list, { id: Date.now(), content: things }];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setThings("");
  }

  // 删除事项
  function handleTrash(event: MouseEvent<HTMLButtonElement>) {
    const id = Number(event.currentTarget.dataset.id);
    if (!id) return;
    const res = list.filter((item) => id !== item.id);
    setList(res);
    localStorage.setItem("list", JSON.stringify(res));
  }

  return (
    <div className="h-dvh w-full flex pt-8 justify-center">
      <div className="w-3xl flex flex-col items-center space-y-6">
        <TextField.Root
          placeholder="请输入待办事项"
          size={"3"}
          className="w-full"
          value={things}
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
              list.map((item) => (
                <Card key={item.id}>
                  <Box>
                    <Flex justify={"between"}>
                      <Text
                        as="div"
                        size="3"
                        weight="bold"
                        className="flex items-center"
                      >
                        {item.content}
                      </Text>
                      <div className="flex items-center space-x-2">
                        <div>{new Date(item.id).toDateString()}</div>
                        <IconButton
                          color="crimson"
                          variant="soft"
                          data-id={item.id}
                          onClick={handleTrash}
                        >
                          <TrashIcon width="18" height="18" />
                        </IconButton>
                      </div>
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
