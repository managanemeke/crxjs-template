export default interface Props {
  readonly children: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly onClick?: () => void;
}
