export type Edition = "NEVER NEXT" | "ALWAYS" | "ALONE";

export interface EditionItem {
  editionNr: number;
  name: Edition;
  editionType: string;
  format: "video" | "image";
  cover: string;
  benefits?: Record<
    string,
    {
      main: string;
      subs: string[];
    }
  >;
}
