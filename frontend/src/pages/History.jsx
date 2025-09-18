import React from "react";

import HistoryHeader from "../component/historyComponent/HistoryHeader";
import HistoryList from "../component/historyComponent/HistoryList";

export default function History() {
  return (
    <div className="pt-20 sm:pt-24 md:pt-28 p-4 sm:px-6 md:px-8 text-white h-[calc(100vh-80px)] flex flex-col gap-3 sm:gap-4 md:gap-6">
      <HistoryHeader />
      <HistoryList />
    </div>
  );
}
