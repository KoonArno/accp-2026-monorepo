
import Layout from "@/components/layout/Layout"
import Link from "next/link"

const endpoints = [
    {
        category: "Health & Info",
        items: [
            { method: "GET", path: "/", description: "API information and available endpoints" },
            { method: "GET", path: "/health", description: "Health check endpoint" },
        ]
    },
    {
        category: "Authentication",
        items: [
            { method: "POST", path: "/api/auth/login", description: "Authenticate user and get JWT token" },
            { method: "POST", path: "/api/auth/register", description: "Register a new user account" },
            { method: "GET", path: "/api/auth/me", description: "Get current authenticated user (requires JWT)" },
        ]
    },
    {
        category: "Abstract Submission",
        items: [
            { method: "GET", path: "/api/abstracts/categories", description: "Get all 8 topic categories" },
            { method: "POST", path: "/api/abstracts/submit", description: "Submit a new abstract" },
            { method: "GET", path: "/api/abstracts/:trackingId", description: "Get abstract status by tracking ID" },
            { method: "GET", path: "/api/abstracts/deadlines", description: "Get submission deadlines" },
        ]
    },
    {
        category: "Registration",
        items: [
            { method: "GET", path: "/api/registrations/fees", description: "Get all registration fee tiers" },
            { method: "POST", path: "/api/registrations/register", description: "Register for the conference" },
            { method: "GET", path: "/api/registrations/:number", description: "Get registration status" },
            { method: "GET", path: "/api/registrations/deadlines", description: "Get registration deadlines" },
        ]
    },
]

const codeExamples = {
    submitAbstract: `// Submit Abstract
POST /api/abstracts/submit

{
  "title": "Effect of Clinical Pharmacy Services",
  "authors": "John Doe*, Jane Smith",
  "affiliations": "University of Bangkok",
  "category": "clinical_pharmacy",
  "abstractType": "oral",
  "keywords": "clinical pharmacy, patient outcomes",
  "abstractText": "Introduction: ... Methods: ...",
  "conflictOfInterest": "None declared"
}`,
    submitAbstractResponse: `// Response
{
  "success": true,
  "trackingId": "ACCP26-AB1234",
  "message": "Abstract submitted successfully",
  "abstract": {
    "status": "submitted",
    "submittedAt": "2026-02-01T10:30:00Z"
  }
}`,
    register: `// Register for Conference
POST /api/registrations/register

{
  "email": "attendee@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "affiliation": "University of Bangkok",
  "country": "Thailand",
  "delegateType": "all_delegate",
  "category": "full_registration",
  "includesWorkshop": true,
  "includesGalaDinner": true
}`,
    registerResponse: `// Response
{
  "success": true,
  "registrationNumber": "REG26123456",
  "registration": {
    "status": "pending",
    "totalAmount": 12200,
    "currency": "THB"
  },
  "payment": {
    "message": "Please proceed to payment"
  }
}`
}

export default function ApiDocs() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>API Documentation</h1>
                                        <div className="space20" />
                                        <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>API Docs</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Base URL */}
                    <div className="sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h5>ACCP 2026 Backend API</h5>
                                        <div className="space18" />
                                        <h2>API Reference</h2>
                                        <div className="space20" />
                                        <div style={{
                                            backgroundColor: '#1a1a2e',
                                            padding: '20px',
                                            borderRadius: '10px',
                                            fontFamily: 'monospace',
                                            color: '#00ff88'
                                        }}>
                                            <span style={{ color: '#888' }}>Base URL:</span> http://localhost:8080
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Endpoints */}
                    <div className="sp1" style={{ backgroundColor: '#f5f5f5' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <h2 style={{ marginBottom: '30px' }}>Endpoints</h2>

                                    {endpoints.map((category, idx) => (
                                        <div key={idx} style={{ marginBottom: '40px' }}>
                                            <h4 style={{
                                                color: '#1a237e',
                                                borderBottom: '2px solid #FFBA00',
                                                paddingBottom: '10px',
                                                marginBottom: '20px'
                                            }}>
                                                {category.category}
                                            </h4>
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{
                                                    width: '100%',
                                                    borderCollapse: 'collapse',
                                                    backgroundColor: 'white',
                                                    borderRadius: '10px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                                }}>
                                                    <thead>
                                                        <tr style={{ backgroundColor: '#1a237e', color: 'white' }}>
                                                            <th style={{ padding: '15px', textAlign: 'left', width: '100px' }}>Method</th>
                                                            <th style={{ padding: '15px', textAlign: 'left' }}>Endpoint</th>
                                                            <th style={{ padding: '15px', textAlign: 'left' }}>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {category.items.map((item, i) => (
                                                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                                                <td style={{ padding: '15px' }}>
                                                                    <span style={{
                                                                        backgroundColor: item.method === 'GET' ? '#4CAF50' : '#2196F3',
                                                                        color: 'white',
                                                                        padding: '5px 10px',
                                                                        borderRadius: '5px',
                                                                        fontSize: '12px',
                                                                        fontWeight: 'bold'
                                                                    }}>
                                                                        {item.method}
                                                                    </span>
                                                                </td>
                                                                <td style={{ padding: '15px', fontFamily: 'monospace', color: '#333' }}>
                                                                    {item.path}
                                                                </td>
                                                                <td style={{ padding: '15px', color: '#666' }}>
                                                                    {item.description}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Code Examples */}
                    <div className="sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <h2 style={{ marginBottom: '30px' }}>Code Examples</h2>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h5 style={{ marginBottom: '15px' }}>📝 Submit Abstract</h5>
                                            <pre style={{
                                                backgroundColor: '#1a1a2e',
                                                color: '#e0e0e0',
                                                padding: '20px',
                                                borderRadius: '10px',
                                                overflow: 'auto',
                                                fontSize: '13px',
                                                lineHeight: '1.5'
                                            }}>
                                                <code>{codeExamples.submitAbstract}</code>
                                            </pre>
                                        </div>
                                        <div className="col-lg-6">
                                            <h5 style={{ marginBottom: '15px' }}>✅ Response</h5>
                                            <pre style={{
                                                backgroundColor: '#1a1a2e',
                                                color: '#00ff88',
                                                padding: '20px',
                                                borderRadius: '10px',
                                                overflow: 'auto',
                                                fontSize: '13px',
                                                lineHeight: '1.5'
                                            }}>
                                                <code>{codeExamples.submitAbstractResponse}</code>
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="space40" />

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h5 style={{ marginBottom: '15px' }}>🎫 Register for Conference</h5>
                                            <pre style={{
                                                backgroundColor: '#1a1a2e',
                                                color: '#e0e0e0',
                                                padding: '20px',
                                                borderRadius: '10px',
                                                overflow: 'auto',
                                                fontSize: '13px',
                                                lineHeight: '1.5'
                                            }}>
                                                <code>{codeExamples.register}</code>
                                            </pre>
                                        </div>
                                        <div className="col-lg-6">
                                            <h5 style={{ marginBottom: '15px' }}>✅ Response</h5>
                                            <pre style={{
                                                backgroundColor: '#1a1a2e',
                                                color: '#00ff88',
                                                padding: '20px',
                                                borderRadius: '10px',
                                                overflow: 'auto',
                                                fontSize: '13px',
                                                lineHeight: '1.5'
                                            }}>
                                                <code>{codeExamples.registerResponse}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enums */}
                    <div className="sp1" style={{ backgroundColor: '#f5f5f5' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <h2 style={{ marginBottom: '30px' }}>Enums & Constants</h2>

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="pricing-boxarea">
                                                <h5>Abstract Types</h5>
                                                <div className="space15" />
                                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                                    <li><code>oral</code> - Oral presentation</li>
                                                    <li><code>poster</code> - Poster presentation</li>
                                                    <li><code>e_poster</code> - Electronic poster</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="pricing-boxarea">
                                                <h5>Registration Categories</h5>
                                                <div className="space15" />
                                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                                    <li><code>full_registration</code> - Full access</li>
                                                    <li><code>day_registration</code> - Single day</li>
                                                    <li><code>workshops</code> - Workshop only</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="pricing-boxarea">
                                                <h5>Delegate Types</h5>
                                                <div className="space15" />
                                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                                    <li><code>all_delegate</code> - Professional</li>
                                                    <li><code>pharmacy_students</code> - Student</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Topic Categories */}
                    <div className="sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <h2 style={{ marginBottom: '30px' }}>8 Topic Categories</h2>
                                    <div className="row">
                                        {[
                                            { num: 1, slug: "clinical_pharmacy", name: "Clinical Pharmacy" },
                                            { num: 2, slug: "social_administrative_pharmacy", name: "Social and Administrative Pharmacy" },
                                            { num: 3, slug: "pharmacology_toxicology", name: "Pharmacology and Toxicology" },
                                            { num: 4, slug: "pharmacoeconomics_pharmacoepidemiology", name: "Pharmacoeconomics and Pharmacoepidemiology" },
                                            { num: 5, slug: "pharmacy_education", name: "Pharmacy Education" },
                                            { num: 6, slug: "pharmaceutics_pharmaceutical_sciences", name: "Pharmaceutics and Pharmaceutical Sciences" },
                                            { num: 7, slug: "medicinal_chemistry", name: "Medicinal Chemistry" },
                                            { num: 8, slug: "pharmacognosy_pharmaceutical_biotechnology", name: "Pharmacognosy and Pharmaceutical Biotechnology" },
                                        ].map((topic) => (
                                            <div className="col-lg-6 mb-3" key={topic.num}>
                                                <div style={{
                                                    backgroundColor: 'white',
                                                    border: '1px solid #eee',
                                                    borderRadius: '10px',
                                                    padding: '15px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '15px'
                                                }}>
                                                    <span style={{
                                                        backgroundColor: '#FFBA00',
                                                        color: '#1a237e',
                                                        width: '35px',
                                                        height: '35px',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 'bold',
                                                        flexShrink: 0
                                                    }}>{topic.num}</span>
                                                    <div>
                                                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{topic.name}</div>
                                                        <code style={{ fontSize: '12px', color: '#666' }}>{topic.slug}</code>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
