type Style = {
  isActive: boolean;
  isPending: boolean;
};

export const navLinkStyle = ({ isActive, isPending }: Style) => {
  return {
    fontWeight: isActive ? 'bold' : '',
    color: isPending ? '' : 'black',
  };
};
