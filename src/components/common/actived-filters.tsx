"use client";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { CarnavalFiltersProps } from "@/types/carnaval.types";
import { useRouter, useSearchParams } from "next/navigation";

interface ActivedFiltersProps {
  filters: CarnavalFiltersProps;
}

export default function ActivedFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilters = Object.fromEntries(searchParams.entries());
  const activeFilters = Object.entries(currentFilters).filter(
    ([, value]) => value !== ""
  );

  function handleRemoveFilter(filterKey: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(filterKey);
    router.push(`?${newParams.toString()}`, { scroll: false });
  }

  const showFilters =
    activeFilters.length > 0 && activeFilters[0][0] !== "page";
  return (
    <div className={`flex flex-col gap-2 ${showFilters ? "block" : "hidden"}`}>
      Filtros Ativos:{" "}
      <div className=" flex flex-wrap gap-1">
        {activeFilters.map(([key, value]) => (
          <Badge
            key={key}
            onClick={() => handleRemoveFilter(key)}
            variant="outline"
            className={` items-center gap-2 cursor-pointer hover:bg-border transition-colors ${
              key === "page" ? "hidden" : "flex"
            }`}
          >
            {`${value}`} <X size={16} />
          </Badge>
        ))}
      </div>
    </div>
  );
}
