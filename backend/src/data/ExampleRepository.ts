import Connection from "./database/Connection";

const getConnection = () => {
  return Connection.getConnection();
};

const getExamples = () => {
  return ["item 1", "item 2"];
};

const getExampleById = (id: number) => {
  return "item 1";
};

const createExample = (item: Record<string, unknown>): Record<string, unknown> => {
  return { id: 1, description: "description" };
};

const updateExample = (item: Record<string, unknown>): Record<string, unknown> => {
  return { id: 2, description: "description" };
};

const deleteExample = (id: number) => {
  return true;
};

export { getExamples, getExampleById, createExample, updateExample, deleteExample };
