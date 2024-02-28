import { hello } from "npm-package-ts";

async function bootstrap() {
  console.log("App started");
  hello("word")
}
bootstrap();
