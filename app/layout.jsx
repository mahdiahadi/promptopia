import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
import '@styles/globals.css';
export const metadata = {
    title: 'promptia',
    description: 'Discover & Sharing AI propmts'
}
const layout = ({ children }) => {
    return (
        <html>
            <body>
                <Provider>
                    <div className="main">
                        <div className='gradiant' />
                    </div>
                    <main className='app'>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>

    )
}

export default layout