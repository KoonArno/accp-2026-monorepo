

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'sans-serif'
        }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>404</h1>
            <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Page Not Found</p>
            <a href="/" style={{ marginTop: '2rem', color: 'blue', textDecoration: 'underline' }}>
                Go back home
            </a>
        </div>
    );
}
