import {useNavigate} from 'react-router-dom';

const NavItem = ({ name, path, activeItem, setActiveItem }) => {
    // const router = useRouter();
    const navigate=useNavigate();
    return (
      <li
        title={name}
        className={`${
          activeItem === path ? 'nav-active':'nav-inactive'
        }`}
        onClick={() => {
          setActiveItem(path)
          navigate(path);
        }}
      >
        {name}
      </li>
    )
  };
  
  export default NavItem;