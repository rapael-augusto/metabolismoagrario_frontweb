export default interface buttonType {
  texto: string;
  classe: string;
  onclick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  tipo?: "button" | "submit";
}
