'use client';

import Link from 'next/link';

// This component uses the root layout, so no <html> or <body> tags needed here.
export default function NotFound() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <h1 className="display-1 fw-bold">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="mb-4 text-center" style={{ maxWidth: '500px' }}>
        We couldn't find the page you were looking for. It might have been removed, renamed, or did not exist in the first place.
      </p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}