import { Command, CommandRunner } from "nest-commander";
import { UsersPublisher } from "../publisher/user.publisher";

@Command({
  name: "dispatch",
  description: "run publisher",
})
export class PublishCommand extends CommandRunner {
  constructor(private publisher: UsersPublisher) {
    super();
  }
  async run(): Promise<void> {
    await this.publisher.publishPendingMessages();
  }
}