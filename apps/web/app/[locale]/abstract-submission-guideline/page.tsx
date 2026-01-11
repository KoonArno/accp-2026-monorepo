'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function AbstractSubmissionGuideline() {
    const tCommon = useTranslations('common')

    // Hardcoded content based on the user provided image, adapted for ACCP 2026
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                {/* Header with Background */}
                <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="heading1 text-center">
                                    <h1>ABSTRACT GUIDELINE</h1>
                                    <div className="space20" />
                                    <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tCommon('callForAbstracts')}</span> <i className="fa-solid fa-angle-right" /> <span>{tCommon('abstractGuideline')}</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sp1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* Updated Date */}
                                <p style={{ color: '#666', marginBottom: '30px' }}>Updated: 15 January 2026</p>

                                {/* Divider Line */}
                                <div style={{ width: '50px', height: '4px', backgroundColor: '#0d6efd', marginBottom: '30px' }}></div>

                                {/* Introduction */}
                                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '40px' }}>
                                    The Organising Scientific Committee of the 25<sup>th</sup> Asian Conference on Clinical Pharmacy (ACCP 2026) invites you to submit an abstract. Please see guidelines below for the required format of the abstracts. Each abstract will undergo a peer review process.
                                </p>

                                {/* Accepted Abstracts Section */}
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                                    Accepted abstracts will be presented as:
                                </h3>
                                <ol style={{ paddingLeft: '25px', marginBottom: '50px', fontSize: '16px', lineHeight: '2' }}>
                                    <li>E-posters</li>
                                    <li>E-posters with Rapid Fire sessions</li>
                                    <li>Oral Presentations</li>
                                </ol>

                                {/* Important Dates Section */}
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '25px' }}>
                                    Important Dates
                                </h3>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '50px' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#c9a227', color: 'white' }}>
                                                <th style={{ padding: '15px 20px', textAlign: 'left', fontWeight: '600', width: '45%' }}>Activity</th>
                                                <th style={{ padding: '15px 20px', textAlign: 'left', fontWeight: '600' }}>Period</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ backgroundColor: '#fff' }}>
                                                <td style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>Registration & Abstract Submission OPEN</td>
                                                <td style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>2026-01-15</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#f9f9f9' }}>
                                                <td style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>Abstract Submission CLOSES</td>
                                                <td style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>2026-03-15</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Late-Breaking Abstract Info */}
                                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '25px' }}>
                                    A late-breaking abstract should contain new information that was not yet known or fully available by the abstract submission deadline, <span style={{ color: '#17a2b8' }}>15 March 2026</span>. The data in the abstract must not be published prior to the meeting. It should show data that is high-impact, innovative and newsworthy. Please note that the late-breaking abstract deadline is not intended to be an extension of the regular abstract submission deadline.
                                </p>

                                {/* Presenting Authors Registration */}
                                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '60px' }}>
                                    Presenting Authors must register for the congress by no later than <span style={{ color: '#17a2b8' }}>TBA</span>, and pay the registration fee in full by the registration deadline to secure their presence at the congress.
                                </p>

                                {/* ABSTRACT SUBMISSION GUIDELINES */}
                                <h2 style={{ color: '#17a2b8', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
                                    ABSTRACT SUBMISSION GUIDELINES
                                </h2>
                                <div style={{ width: '50px', height: '4px', backgroundColor: '#17a2b8', marginBottom: '30px' }}></div>

                                <ul style={{ paddingLeft: '25px', marginBottom: '20px', fontSize: '16px', lineHeight: '2' }}>
                                    <li>Abstracts must be submitted online via the ACCP 2026 website only.</li>
                                    <li>Abstracts must contain original work that has not previously been reported</li>
                                    <li>Abstracts may be original research and case studies</li>
                                    <li>Only the presenting author may submit the abstract</li>
                                    <li>The abstract MUST NOT exceed 250 words, excluding the title, authors and affiliations</li>
                                    <li>Full papers are NOT required</li>
                                    <li>You MUST include results or data in your abstract - you may include pictures, figures and/or tables</li>
                                    <li>Abstracts that describe plans for a study or state "results will be presented" will NOT be accepted</li>
                                    <li>Do NOT include references</li>
                                    <li>Do NOT submit abstracts with typographical or grammatical errors</li>
                                    <li>All abbreviations should be given in brackets after the first full use of the word</li>
                                    <li>All presentations MUST be in English</li>
                                    <li>Authors can indicate their preferred presentation type from the following three options:
                                        <ul style={{ paddingLeft: '30px', listStyleType: 'circle' }}>
                                            <li>E-poster only</li>
                                            <li>E-poster with rapid-fire presentation</li>
                                            <li>Oral presentation</li>
                                        </ul>
                                    </li>
                                </ul>
                                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', paddingLeft: '25px' }}>
                                    Authors may select more than one option. However, the ACCP 2026 Organizing Committee reserves the right to determine the final presentation format for all abstracts after review.
                                </p>
                                <ul style={{ paddingLeft: '25px', marginBottom: '20px', fontSize: '16px', lineHeight: '2' }}>
                                    <li>Acknowledgement of submission will be sent automatically to the abstract submitter only. Please contact the secretariat at <a href="mailto:info@accp2026.org" style={{ color: '#17a2b8' }}>info@accp2026.org</a> if you do not receive the confirmation email.</li>
                                    <li>All submitted abstracts will be reviewed by the ACCP scientific committee according to the review process.</li>
                                    <li>On completing your abstract submission, please complete the <a href="#" style={{ color: '#17a2b8' }}>Conflict of Interest (COI) form</a> for each submitted abstract; one COI form per author and co-author(s) and upload it to the relevant abstract account. Or, you may also email the same to the Secretariat at info@accp2026.org.</li>
                                </ul>

                                {/* ABSTRACT TOPICS */}
                                <h2 style={{ color: '#17a2b8', fontSize: '28px', fontWeight: 'bold', marginTop: '60px', marginBottom: '20px' }}>
                                    ABSTRACT TOPICS
                                </h2>
                                <div style={{ width: '50px', height: '4px', backgroundColor: '#17a2b8', marginBottom: '30px' }}></div>

                                <ol style={{ paddingLeft: '25px', marginBottom: '50px', fontSize: '16px', lineHeight: '1.8' }}>
                                    <li style={{ marginBottom: '15px' }}>
                                        <strong>Antimicrobial Agents & Resistance:</strong>
                                        <ul style={{ paddingLeft: '30px', listStyleType: 'circle', marginTop: '10px' }}>
                                            <li>Antimicrobial Agents and PK/PD</li>
                                            <li>Antimicrobial Resistance</li>
                                        </ul>
                                    </li>
                                    <li style={{ marginBottom: '15px' }}>
                                        <strong>Antimicrobial Stewardship & Clinical Microbiology Diagnostics:</strong>
                                        <ul style={{ paddingLeft: '30px', listStyleType: 'circle', marginTop: '10px' }}>
                                            <li>Antimicrobial Stewardship Program</li>
                                            <li>Clinical Microbiology and Diagnostics</li>
                                            <li>Diagnostic Stewardship</li>
                                        </ul>
                                    </li>
                                    <li style={{ marginBottom: '15px' }}>
                                        <strong>Clinical Infectious Diseases (Bacterial, Fungal, Mycobacterial, Parasitic):</strong>
                                        <ul style={{ paddingLeft: '30px', listStyleType: 'circle', marginTop: '10px' }}>
                                            <li>Bacterial Infection</li>
                                            <li>Fungal Infection</li>
                                            <li>Tuberculosis and other Mycobacterial Infections</li>
                                            <li>Medical parasitology</li>
                                            <li>Clinical Syndromes</li>
                                        </ul>
                                    </li>
                                    <li style={{ marginBottom: '15px' }}>
                                        <strong>Viral Infections & Immunology:</strong>
                                        <ul style={{ paddingLeft: '30px', listStyleType: 'circle', marginTop: '10px' }}>
                                            <li>COVID-19</li>
                                            <li>HIV</li>
                                            <li>Viral Infection (All Viruses other than HIV and SARS-Cov-2)</li>
                                            <li>Vaccine and Immunology</li>
                                        </ul>
                                    </li>
                                    <li style={{ marginBottom: '15px' }}>
                                        <strong>Healthcare Epidemiology & Infection Prevention/Control:</strong>
                                        <ul style={{ paddingLeft: '30px', listStyleType: 'circle', marginTop: '10px' }}>
                                            <li>Healthcare Epidemiology</li>
                                            <li>Infection Prevention/Control</li>
                                        </ul>
                                    </li>
                                    <li style={{ marginBottom: '15px' }}>
                                        <strong>Emerging Topics & Others:</strong>
                                        <ul style={{ paddingLeft: '30px', listStyleType: 'circle', marginTop: '10px' }}>
                                            <li>Microbiome</li>
                                            <li>Public Health and Socioeconomic Impact</li>
                                            <li>Others</li>
                                        </ul>
                                    </li>
                                </ol>

                                {/* Abstract Format */}
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '25px' }}>
                                    Abstract Format
                                </h3>
                                <div style={{ overflowX: 'auto', marginBottom: '50px' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ backgroundColor: '#c9a227', color: 'white', padding: '15px 20px', fontWeight: '600', width: '20%', verticalAlign: 'top' }}>Language</td>
                                                <td style={{ backgroundColor: '#fff8e6', padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>English</td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: '#c9a227', color: 'white', padding: '15px 20px', fontWeight: '600', verticalAlign: 'top' }}>Title</td>
                                                <td style={{ backgroundColor: '#fff8e6', padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                                        <li>Capitalize the first letter of each word. Titles in ALL CAPS are not allowed.</li>
                                                        <li>Refrain from using standard abbreviations or acronyms in the title.</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: '#c9a227', color: 'white', padding: '15px 20px', fontWeight: '600', verticalAlign: 'top' }}>Author Information</td>
                                                <td style={{ backgroundColor: '#fff8e6', padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Name</p>
                                                    <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
                                                        <li>All co-authors' first and family name(s) must be provided in full.</li>
                                                        <li>Degrees or titles such as MD after an author's name must be deleted.</li>
                                                    </ul>
                                                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Affiliation</p>
                                                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                                        <li>Affiliation should be structured as follows: Department, Institution and Country.</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: '#c9a227', color: 'white', padding: '15px 20px', fontWeight: '600', verticalAlign: 'top' }}>Abstract Body</td>
                                                <td style={{ backgroundColor: '#fff8e6', padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Text</p>
                                                    <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
                                                        <li>The text of the entire abstract must not exceed 250 words.</li>
                                                        <li>Use standard abbreviations or acronyms in the text. ALL CAPS are not allowed.</li>
                                                    </ul>
                                                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Structure</p>
                                                    <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
                                                        <li>The abstract body can be written either as an original article or case report.</li>
                                                        <li>Original Article: Summary description of study/research set out in a systematic, stylized form under headings structured in: Background, Methods, Results, Conclusion.</li>
                                                        <li>Case Report: Summary description set out in a systematic, stylized form under headings structured in: Title, Introduction, Case Presentation, Conclusion.</li>
                                                    </ul>
                                                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Pictures/Graphs/Tables</p>
                                                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                                        <li>You can only upload one file (jpeg or jpg file) of pictures, graphs or table per abstract.</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Declaration & Assignation */}
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#1a3a5c' }}>
                                    Declaration & Assignation
                                </h3>
                                <ul style={{ paddingLeft: '25px', marginBottom: '40px', fontSize: '16px', lineHeight: '2' }}>
                                    <li>Abstracts must not have been published or presented at any other conference by any co-authors.</li>
                                    <li>The authors grant the ACCP 2026 Organizing Committee a royalty-free, irrevocable, and non-exclusive right to publish, reproduce, distribute, display or otherwise use the submitted abstracts. The authors will also retain the copyright of their abstracts.</li>
                                </ul>

                                {/* Acceptance Notification */}
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#1a3a5c' }}>
                                    Acceptance Notification
                                </h3>
                                <ul style={{ paddingLeft: '25px', marginBottom: '40px', fontSize: '16px', lineHeight: '2' }}>
                                    <li>Acceptance notification will be sent to the abstract submitter only.</li>
                                    <li>On receiving the acceptance notification, the abstract submitter must confirm attendance of the presenting author and instruct the presenting author to register no later than <span style={{ color: '#17a2b8' }}>TBA</span>. Accepted abstracts whose presenting author does not register and pay in full by then will be automatically withdrawn.</li>
                                </ul>

                                {/* Abstract Withdrawal */}
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#1a3a5c' }}>
                                    Abstract Withdrawal
                                </h3>
                                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '40px' }}>
                                    Authors who want to withdraw an abstract should send a written request to the secretariat at <a href="mailto:info@accp2026.org" style={{ color: '#17a2b8' }}>info@accp2026.org</a> by <span style={{ color: '#17a2b8' }}>TBA</span>. Abstract withdrawal is deemed complete upon the confirmation of the secretariat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
