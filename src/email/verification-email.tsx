export function VerificationEmail({ link }: { link: string }) {
    return (
        <div
            style={{
                maxWidth: 600,
                margin: '0 auto',
                padding: 20,
                backgroundColor: '#f8f9fa',
                borderRadius: 8,
                border: '1px solid #e0e0e0',
            }}
        >
            <h1
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#8b5cf6',
                }}
            >
                Formy 📃
            </h1>
            <p style={{ color: '#666666', marginTop: 16 }}>
                We&apos;re verifying your account. Please click the button below
                to confirm your email and activate your account.
            </p>

            <div style={{ marginTop: 24 }}>
                <a
                    href={link}
                    style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#4f46e5',
                        color: '#ffffff',
                        textDecoration: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        transition: '0.2s ease',
                    }}
                >
                    Verify
                </a>
            </div>
        </div>
    );
}
