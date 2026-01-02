import { useEffect, useState } from "react";

export default function LivePlaceholder() {
  const texts = [
    "Search for a cuisine...",
    "Search for a dish...",
    "Biryani, Pizza, Momos..."
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[index];

    const interval = setTimeout(() => {
      setPlaceholder(currentText.slice(0, charIndex + 1));
      setCharIndex(prev => prev + 1);
    }, 100); // typing speed

    if (charIndex === currentText.length) {
      setTimeout(() => {
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 1000); // pause before next word
    }

    return () => clearTimeout(interval);
  }, [charIndex, index, texts]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full outline-none  text-gray-700 placeholder-gray-400"
    />
  );
}
