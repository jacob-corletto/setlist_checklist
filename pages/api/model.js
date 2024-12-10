import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { load } from "protobufjs";

export default function Model() {
  const [model, setModel] = useState(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel("music_model/model.json");
      setModel(model);
      const summary = [];
      model.summary(null, (line) => summary.push(line));
      setSummary(summary.join("\n"));
    };
    loadModel();
  }, []);
  return (
    <div>
      <h1>Model</h1>
      <pre>{summary}</pre>
    </div>
  );
}
