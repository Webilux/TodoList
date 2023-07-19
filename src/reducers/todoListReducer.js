function todoListReducer(state, action) {
  switch (action.type) {
    case "FETCH_TODO_LISTS": {
      return {
        ...state,
        todoLists: action.todoLists,
      }
    }

    case "ADD_TODO_LIST": {
      return {
        ...state,
        todoLists: [...state.todoLists, action.todoLists],
      }
    }
    case "DELETE_TODO_LIST": {
      return {
        ...state,
        todoLists: state.todoLists.filter(
          (t) => t._id !== action.todoLists._id
        ),
      }
    }
    // case "UPDATE_TODO_LIST": {
    //   return {
    //     ...state,
    //     todoList: state.todoList.map((t) =>
    //       t._id === action.todo._id ? action.todo : t
    //     ),
    //   }
    // }
    default: {
      throw new Error("action inconnu")
    }
  }
}
export default todoListReducer
