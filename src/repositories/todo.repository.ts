import todoModel from "../schemas/todo.schema";

const todoRepository = {
  create: async (data: {
    userId: string;
    content: string;
    isDone: boolean;
  }) => {
    const newTodo = await new todoModel(data).save();
    return newTodo;
  },
};

export default todoRepository;
