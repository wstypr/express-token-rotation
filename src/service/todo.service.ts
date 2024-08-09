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
    const newTodo = await todoRepository.create(userId, data);
    return newTodo;
  },
};

export default todoService;
