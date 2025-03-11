import TextFiglet from "./components/text-figlet";

export default async function Home() {
  return (
    <div className="font-mono flex flex-col items-center justify-center p-4">
      <TextFiglet />
      Hello, je m&apos;appelle simone Je suis un musicist
    </div>
  );
}
