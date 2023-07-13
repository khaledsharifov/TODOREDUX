import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  title: "",
  modal: false,
  titleEdit: "",
  idx: null,
  select: "",
  search: ""
};

export const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    handleChangeTitle(state, action) {
      state.title = action.payload;
    },
    handleChangeTitleEdit(state, action) {
      state.titleEdit = action.payload;
    },
    handleChangeSelect(state, action) {
      state.select = action.payload;
    },
    handleChangeSearch(state, action) {
      state.search = action.payload;
    },


    addTodo(state) {
      state.list.push({
        id: new Date().getTime(),
        title: state.title,
        completed: false,
      });
      state.title = ""
    },
    deleteTodo(state, action) {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    completedTodo(state, action) {
      const { id, value } = action.payload;
      state.list = state.list.map((todo) => {
        if (todo.id === id) {
          todo.completed = value;
        }
        return todo;
      });
    },
    openModal(state, action){
      const {id, value2} = action.payload
      state.modal = true,
      state.titleEdit = value2,
      state.idx = id
    },
    closeModal(state, action){
      state.modal = false
    },
    editTodo(state, action){
      state.list = state.list.map((todo)=>{
        if (todo.id == state.idx){
          todo.title = state.titleEdit
        }
        return todo
      })
      state.modal = false
    }
  },
});
export const { addTodo,handleChangeSearch, editTodo,handleChangeSelect, deleteTodo, selectTodo, completedTodo, handleChangeTitle,openModal,closeModal,handleChangeTitleEdit } =
  slice.actions;

export default slice.reducer;
