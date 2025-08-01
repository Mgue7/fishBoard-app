import React, { useEffect, useState } from "react";
import { CatchData } from "../types/CatchData";
import GlobalGroup from "./GlobalGroup";

function HeaviestBass() {
  console.log("heaviest bass rendered");
  const [heaviest, setHeaviest] = useState<CatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/catches")
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return JSON.parse(text);
      })
      .then((data: any[]) => {
        const bassCatches = data.filter(
          (c) => c.species.toLowerCase() === "bass"
        );

        if (bassCatches.length === 0) {
          setHeaviest(null);
        } else {
          const biggest = bassCatches.reduce((a, b) =>
            a.weight > b.weight ? a : b
          );

          const mappedBiggest: CatchData = {
            username: biggest.username,
            species: biggest.species,
            weight: biggest.weight,
            length: biggest.length,
            photoUrl: biggest.photo_filename
              ? `/uploads/${biggest.photo_filename}`
              : null,
          };

          setHeaviest(mappedBiggest);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading the heaviest bass…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!heaviest) return <p>No bass catches found.</p>;

  console.log("Heaviest bass:", heaviest);

  return <GlobalGroup {...heaviest} />;
}

export default HeaviestBass;
