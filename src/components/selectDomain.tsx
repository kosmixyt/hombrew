import { Website } from "@prisma/client";
import { useState } from "react";

export function SelectDomain(props: {
  domains: Website[];
  onselect: (id: string) => void;
}) {}
