declare module 'papaparse' {
  const Papa: object;
  export default Papa;

  export function parse(
    file: File,
    arg1: {
      header: boolean;
      skipEmptyLines: boolean;
      complete: (results: { data: Partial<Grade>[]; }) => void;
      error: (error: unknown) => void;
    }
  ): void;
}