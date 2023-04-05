import './header.css'

export const Header = () => {
    return (
        <div className="navbar">
            <div className="dropdown">
                <button className="dropdown-button">
                    DATA SEARCH
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <a href="/data-search1">Lab 1.1</a>
                    <a href="/data-search12">Lab 1.2</a>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropdown-button">
                    DATA SECURITY
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <a href="/data-security1">Lab 1</a>
                </div>
            </div>
        </div>
    )
}