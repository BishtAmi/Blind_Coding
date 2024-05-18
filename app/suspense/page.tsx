import { Suspense } from "react";

// Import the components
import QuestionForm from "../ide/page";
import Problems from "../problems/page";

// Wrap both components with the same Suspense
export default function Sus() {
  return (
    <Suspense>
      <QuestionForm/>
      <Problems />
    </Suspense>
  );
}
