'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <h2 className="mb-4">Something went wrong!</h2>
          <button className="btn btn-primary" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}