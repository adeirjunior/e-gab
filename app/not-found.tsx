import GoBackwardButton from "./_ui/components/button/GoBackwardButton";

export default function NotFound() {
  return (
    <div className="grid place-content-center w-full h-screen">
      <h2>Esta página não existe!</h2>
      <p>Retorne a página anterior</p>
      <GoBackwardButton />
    </div>
  );
}
