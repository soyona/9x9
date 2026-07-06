import { ConceptVisualizer } from "@/components/ConceptVisualizer";
import { GameController } from "@/components/GameController";
import { TrainingMatrix } from "@/components/TrainingMatrix";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="9乘9 MathGrid 首页">
          <strong>9×9</strong>
          <span>MathGrid</span>
        </a>

        <div className="page-title">
          <h1>让乘法变得一目了然</h1>
          <p>先理解，再熟练</p>
        </div>

        <GameController />
      </header>

      <div className="page-shell">
        <ConceptVisualizer />
        <TrainingMatrix />
      </div>
    </main>
  );
}
