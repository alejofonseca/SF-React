//import logo from '../../images/my_client.svg'
import logo from '../brose.svg';
import { Link, useLocation } from 'react-router-dom';

function Menu(props){
    //console.log(props);

    const location = useLocation();
    const { pathname } = location;

    return <nav className="navbar navbar-expand-lg navbar-dark bg-navbar-color py-0">
        <div className="container-fluid">
            <a className="navbar-brand" href="my-client.com"><img src={logo} className="d-inline-block align-text-top logo" alt="Brose" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {props.menuItems.map(menu =>
                    ('submenu' in menu) ? 
                        (
                        <li className="nav-item dropdown">
                            <button className={menu.submenu.find(({ to }) => to === pathname) ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"} id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                {menu.label}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {menu.submenu.map(submenu1 =>
                                    <Link className={submenu1.to === pathname ? "dropdown-item active" : "dropdown-item"} to={submenu1.to}>{submenu1.label}</Link>
                                )}
                            </ul>
                        </li>
                        )
                    :
                        (
                        <li className="nav-item">
                            <Link className={menu.to === pathname ? "nav-link active" : "nav-link"} to={menu.to}>{menu.label}</Link>
                        </li>
                        )
                )}
                </ul>
            </div>
        </div>
        </nav>
}

export default Menu;