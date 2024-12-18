export type DomainVerificationStatusProps =
  | "Valid Configuration"
  | "Invalid Configuration"
  | "Pending Verification"
  | "Domain Not Found"
  | "Unknown Error";

// From https://vercel.com/docs/rest-api/endpoints#get-a-project-domain
export interface DomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export type SearchResult = {
  public_id: string;
  tags: string[];
  resource_type: "auto" | "video" | "image" | "raw";
};

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export type AuthenticatedUser = {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
};

// From https://vercel.com/docs/rest-api/endpoints#get-a-domain-s-configuration
export interface DomainConfigResponse {
  /** How we see the domain's configuration. - `CNAME`: Domain has a CNAME pointing to Vercel. - `A`: Domain's A record is resolving to Vercel. - `http`: Domain is resolving to Vercel but may be behind a Proxy. - `null`: Domain is not resolving to Vercel. */
  configuredBy?: ("CNAME" | "A" | "http") | null;
  /** Which challenge types the domain can use for issuing certs. */
  acceptedChallenges?: ("dns-01" | "http-01")[];
  /** Whether or not the domain is configured AND we can automatically generate a TLS certificate. */
  misconfigured: boolean;
}

// From https://vercel.com/docs/rest-api/endpoints#verify-project-domain
export interface DomainVerificationResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export type PartyDataType = {
  id: string;
  sigla: string;
  nome: string;
  uri: string;
};

export type PartiesDataType = {
  dados: PartyDataType[];
  links: {
    rel: string;
    href: string;
  }[];
};

export type ExcludeKeys<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Representa a métrica retornada (e.g., activeUsers, screenPageViews)
export interface Metric {
  name: string;
  values: string[]; // Os valores geralmente são retornados como strings
}

// Representa a dimensão (e.g., hostname, pagePath)
export interface Dimension {
  name: string;
  values: string[];
}

// Cada linha da resposta contém dimensões e métricas
export interface Row {
  dimensionValues: { value: string }[]; // Lista de valores das dimensões
  metricValues: { value: string }[]; // Lista de valores das métricas
}

// Estrutura geral da resposta do relatório
export interface ReportResponse {
  dimensionHeaders: Dimension[]; // Cabeçalhos das dimensões
  metricHeaders: Metric[]; // Cabeçalhos das métricas
  rows: Row[]; // As linhas contendo dados das dimensões e métricas
}

// Interface para resposta do erro
export interface ErrorResponse {
  error: string;
}
