import todoModel from "../schemas/todo.schema";

const todoRepository = {
  create: async (
    userId: string,
    data: {
      content: string;
      isDone: boolean;
    }
  ) => {
    const newTodo = await new todoModel({
      userId,
      content: data.content,
      isDone: data.isDone,
    }).save();
    return newTodo;
  },
  getAll: async (userId: string) => {
    const allTodos = todoModel.find({ userId });
    return allTodos;
  },
  update: async (
    todoId: string,
    data: { content: string; isDone: boolean }
  ) => {
    const updatedTodo = await todoModel.findOneAndUpdate({ id: todoId }, data);
    return updatedTodo;
  },
};

export default todoRepository;
