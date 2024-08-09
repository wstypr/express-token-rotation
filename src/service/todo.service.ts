import todoRepository from "../repositories/todo.repository";

const todoService = {
  getAll: async (userId: string) => {
    const allTodos = await todoRepository.getAll(userId);
    return allTodos;
  },
  create: async (
    userId: string,
    data: { content: string; isDone: boolean }
  ) => {
    // input validation
    if (data.content.length === 0)
      throw new Error("content and isdone must be provided");

    const newTodo = await todoRepository.create(userId, data);
    return newTodo;
  },
};

export default todoService;
