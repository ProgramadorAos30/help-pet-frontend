import { Connection } from "@data/database/Connection";

export class ExampleRepository {
  private connection: Connection;
  constructor() {
    this.connection = new Connection();
  }

  getExamples() {
    return ["item 1", "item 2"];
  }

  getExampleById(id: number) {
    return "item 1";
  }

  createExample(item: Record<string, unknown>): Record<string, unknown> {
    return { id: 1, description: "description" };
  }

  updateExample(item: Record<string, unknown>): Record<string, unknown> {
    return { id: 2, description: "description" };
  }

  deleteExample(id: number) {
    return true;
  }
}
