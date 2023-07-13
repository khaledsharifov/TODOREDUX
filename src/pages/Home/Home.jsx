import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import SearchIcon from '@mui/icons-material/Search';


import {
  openModal,
  addTodo,
  completedTodo,
  deleteTodo,
  handleChangeTitle,
  closeModal,
  handleChangeTitleEdit,
  editTodo,
  handleChangeSearch,
  handleChangeSelect,
} from "../../reducers/todos";
import "../../App.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const todos = useSelector(({ todos }) => todos.list);
  const title = useSelector(({ todos }) => todos.title);
  const modal = useSelector(({ todos }) => todos.modal);
  const select = useSelector(({ todos }) => todos.select);
  const search = useSelector(({ todos }) => todos.search);
  const titleEdit = useSelector(({ todos }) => todos.titleEdit);
  console.log(titleEdit);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="container m-[0_auto]">
        <div className="w-[35%] m-auto">
          <div>
            <h1 className="py-[5px] text-[30px] text-center">TODO LIST</h1>
            <div className="pb-4 w-[100%] flex flex-nowrap">
              <input
                className="p-2 w-[100%]"
                placeholder="A d d  t i t l e . . . "
                type="text"
                value={title}
                onChange={(e) => {
                  dispatch(handleChangeTitle(e.target.value));
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ padding: "7px 0px", borderRadius: 0 }}
                size="small"
                onClick={() => {
                  if (title.trim().length === 0) return alert("Enter title");
                  dispatch(addTodo());
                }}
              >
                +ADD
              </Button>
            </div>

            <Box sx={{ minWidth: 120, paddingBottom: 3, display:"flex", gap: 2, }}>
              <FormControl className="w-[45%]  ">
                <InputLabel id="demo-simple-select-label">
                  Select Todo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select}
                  label="Select Todo"
                  onChange={(event) =>
                    dispatch(handleChangeSelect(event.target.value))
                  }
                >
                  <MenuItem value="all">All Todo </MenuItem>
                  <MenuItem value="com">Completed</MenuItem>
                  <MenuItem value="unCom">Uncompleted </MenuItem>
                </Select>
              </FormControl>
              <div className="relative w-[100%]">
                <button className="absolute text-[30px] text-[#a1a1a1] right-[10px] top-[5px]">
                  <SearchIcon/>
                </button>
                <input
                  placeholder="S e a r c h . . ."
                  type="text"
                  value={search}
                  className="border-[1px] w-[100%] shadow-md px-3  py-4 mb-[10px]"
                  onChange={(e) =>dispatch(handleChangeSearch(e.target.value))}
                />
              </div>
            </Box>

            <div className="flex flex-col">
              {todos
                .filter((todo) => {
                  if (select == "com") {
                    return todo.completed;
                  } else if (select == "unCom") {
                    return !todo.completed;
                  } else return todo;
                }).filter((el)=>{
                  return search.toLowerCase() === "" ? el : el.title.toLowerCase().includes(search.toLowerCase())
                })
                .map((todo) => {
                  return (
                    <div
                      key={todo.id}
                      className="flex items-center  justify-between py-2  border-t border-b border-gray-400 bg-[#fff]"
                    >
                      <div className="flex gap-6 pl-2 items-center">
                        <Checkbox
                          {...label}
                          checked={todo.completed}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                          onChange={(e) => {
                            dispatch(
                              completedTodo({
                                id: todo.id,
                                value: e.target.checked,
                              })
                            );
                          }}
                        />
                        {todo.completed ? (
                          <span className="text-[gray]">
                            <s>{todo.title}</s>
                          </span>
                        ) : (
                          <span>{todo.title}</span>
                        )}
                      </div>

                      <div className="flex gap-2 pr-2">
                        <IconButton
                          aria-label="delete "
                          onClick={() => dispatch(deleteTodo(todo.id))}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit "
                          onClick={() =>
                            dispatch(
                              openModal({ id: todo.id, value2: todo.title })
                            )
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}
              ,
            </div>
          </div>
        </div>
      </div>
      {modal == true ? (
        <div className="bgg w-[100%] h-[100vh] fixed top-0 flex justify-center items-center">
          <div className=" ">
            <div className=" relative bg-[#ffffff] py-[40px] w-[400px] flex items-center justify-center rounded-[10px]">
              <div className="text-[16px] w-[80%]">
                <p className=" text-[16px] text-[gray]">Edit todo</p>
                <input
                  value={titleEdit}
                  type="text"
                  className="border p-2 w-[100%]"
                  onChange={(e) =>
                    dispatch(handleChangeTitleEdit(e.target.value))
                  }
                />
                <div className=" pt-4">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => dispatch(editTodo())}
                    >
                      submit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => dispatch(closeModal())}
                    >
                      cancel
                    </Button>
                  </Stack>
                </div>
                <span
                  onClick={() => dispatch(closeModal())}
                  className=" absolute top-2 right-4 cursor-pointer text-[26px] text-gray-500 hover:text-[#000]"
                >
                  &times;
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
