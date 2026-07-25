import {
  Building2,
  FileText,
  Handshake,
  Landmark,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ReactElement } from "react";

export const practiceAreaIcons: Record<string, ReactElement> = {
  "governanca-societaria-e-acordo-de-socios": <Handshake />,
  "contratos-estrategicos-e-gestao-de-risco": <FileText />,
  "compliance-regulatorio-setorial": <ShieldCheck />,
  "reestruturacao-societaria-e-ma": <Building2 />,
  "sucessao-empresarial-e-planejamento-patrimonial": <Users />,
  "presenca-no-conselho-de-administracao": <Landmark />,
};
