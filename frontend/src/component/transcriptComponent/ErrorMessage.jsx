import React from "react";

import { useTranscript } from "../../hooks/useTranscript";

export default function ErrorMessage() {
  const { error } = useTranscript();
  if (!error) return null;
  return <div className="text-red-400 text-sm font-medium mt-2">{error}</div>;
}
