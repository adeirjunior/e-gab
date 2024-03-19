import GoBackwardButton from "@/components/button/go-backward-button";

export default function NotFound() {
  return (
    <div className="grid h-screen w-full place-content-center">
      <h2>Esta página não existe!</h2>
      <p>Retorne a página anterior</p>
      <GoBackwardButton />
    </div>
  );
}
