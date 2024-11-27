export default interface Interface {
  readonly children: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly onClick?: () => void;
}
