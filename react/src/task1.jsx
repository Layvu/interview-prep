import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

function App() {
  useEffect(() => {
    const subscription = interval(1000)
      .pipe(take(5))
      .subscribe((value) => console.log(`Tick ${value}`));
    return () => subscription.unsubscribe();
  }, []);

  return <div>Check console for RxJS ticks</div>;
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
