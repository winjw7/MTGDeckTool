import { useNavigate } from 'react-router-dom'

function Home() {

    const history = useNavigate()
    const redirectToPage = (url) => history('/' + url)

    return <>
        <div className="home-page flex col fadein">
            <div className='title'>
                MTG Helper
                <div className='sub'>
                The bestest of tools
                </div>
            </div>

            <div className='options flex'>
                <div className='button hover moveup flex' onClick={() => redirectToPage("precons")}>
                    View Precons
                </div>

                <div className='button build hover moveup flex' onClick={() => redirectToPage("build")}>
                    Build Library
                </div>
            </div>
        </div>

        <style jsx>
            {`
                .home-page {
                    width: 100%;
                    height: 100%;
                    overflow-y: scroll;
                    justify-content: space-evenly;
                }
                
                .title {
                    margin-top: 50px;
                    font-size: 64px;
                }

                .sub, .loading {
                    font-size: 32px;
                    font-family: Montserrat-Regular;
                    color: gray;
                }

                .options {
                    width: 100%;
                    gap: 50px;
                }

                .button {
                    font-family: Montserrat-Regular;
                    background: var(--color);
                    width: 20%;
                    height: 100px;
                    font-size: 32px;
                    border-radius: 12px;
                }

                .build {
                    background: var(--color2);
                }
            `}
        </style>
    </>
}

export default Home;