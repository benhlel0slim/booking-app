import { Link } from 'react-router-dom';
import { ReactComponent as ExternalLink } from '../../assets/linkIcon.svg';

type Props = {
  name: string;
  link: string;
};

export function LinkIcon({ name, link }: Props) {
  return (
    <li>
      <Link to={link} target="_blank">
        {`${name} `}
        <ExternalLink />
      </Link>
    </li>
  );
}
