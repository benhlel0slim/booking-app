import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

type LoadingButtonProps = {
  isLoading?: boolean;
} & ButtonProps;

function LoadingButton({
  isLoading = false,
  children,
  ...rest
}: LoadingButtonProps) {
  return (
    <Button
      style={{ minHeight: 38, minWidth: 135 }}
      type="submit"
      variant="contained"
      {...rest}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size="1em" /> : children}
    </Button>
  );
}
export default LoadingButton;
