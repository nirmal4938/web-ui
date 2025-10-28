import { CustomButton } from '../atoms/ButtonPrimary/ButtonPrimary.styles';
import { StyledButton } from './Button.styles';

type Props = { label: string; onClick: () => void };

const Button = ({ label, onClick }: Props) => (
  <CustomButton onClick={onClick}>{label}</CustomButton>
);

export default Button;
