import { hello } from "npm-package-ts";

export default function Home() {
  hello("world");
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <h1 className="font-bold text-6xl text-gray-800">Hello</h1>
      </div>
    </>
  );
}
