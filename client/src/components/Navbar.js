import { useNavigate } from 'react-router-dom'

function Navbar() {

    const history = useNavigate()
    const redirectToPage = (url) => history('/' + url)

    return <>
        <div className="navbar flex hover" onClick={() => redirectToPage("")}>
            MTG Helper
        </div>

        <style jsx>
            {`
                .navbar {
                    width: 100%;
                    height: 40px;
                    background: var(--dark-highlight);
                }
            `}
        </style>
    </>
}

export default Navbar;