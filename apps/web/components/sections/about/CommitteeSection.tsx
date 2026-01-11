'use client'
import { useTranslations } from 'next-intl';
import { committeeData } from '@/data/committeeData';

export default function CommitteeSection() {
    const t = useTranslations('about');
    const committees = committeeData;

    return (
        <div className="committee-section-area sp2" style={{ background: '#fff', paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
                {/* Header */}
                <div className="row">
                    <div className="col-12">
                        <h2 style={{
                            fontSize: '32px',
                            fontWeight: '800',
                            color: '#1a1a2e',
                            marginBottom: '40px',
                            borderBottom: '4px solid #FFBA00',
                            paddingBottom: '16px',
                            display: 'inline-block'
                        }}>
                            COMMITTEE
                        </h2>
                    </div>
                </div>

                {/* Committee Sections */}
                {committees.map((committee, index) => (
                    <div key={index} style={{ marginBottom: '50px' }}>
                        {/* Category Title */}
                        <h3 style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#333',
                            marginBottom: '16px',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                        }}>
                            {committee.category}
                        </h3>

                        {/* Organizing Committee - 3 column layout */}
                        {committee.category === "ORGANIZING COMMITTEE" ? (
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: '14px',
                                background: '#fff'
                            }}>
                                <tbody>
                                    {committee.members.map((member, memberIndex) => (
                                        <tr key={memberIndex} style={{
                                            borderBottom: '1px solid #e5e5e5',
                                            background: memberIndex % 2 === 0 ? '#fff' : '#f9f9f9'
                                        }}>
                                            <td style={{
                                                padding: '12px 16px',
                                                color: '#333',
                                                fontWeight: '500',
                                                width: '15%',
                                                verticalAlign: 'top'
                                            }}>
                                                {member.title || ''}
                                            </td>
                                            <td style={{
                                                padding: '12px 8px',
                                                color: '#333',
                                                width: '3%',
                                                verticalAlign: 'top'
                                            }}>
                                                {member.title ? ':' : ''}
                                            </td>
                                            <td style={{
                                                padding: '12px 16px',
                                                color: '#333',
                                                verticalAlign: 'top'
                                            }}>
                                                {member.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            /* Regular 2 column table for other committees */
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: '14px',
                                background: '#fff'
                            }}>
                                <tbody>
                                    {committee.members.map((member, memberIndex) => (
                                        <tr key={memberIndex} style={{
                                            borderBottom: '1px solid #e5e5e5',
                                            background: memberIndex % 2 === 0 ? '#fff' : '#f9f9f9'
                                        }}>
                                            <td style={{
                                                padding: '12px 16px',
                                                color: '#333',
                                                fontWeight: '500',
                                                width: '35%',
                                                verticalAlign: 'top',
                                                lineHeight: '1.6'
                                            }}>
                                                {member.name}
                                            </td>
                                            <td style={{
                                                padding: '12px 16px',
                                                color: '#666',
                                                verticalAlign: 'top',
                                                lineHeight: '1.6'
                                            }}>
                                                {member.affiliation}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {/* Decorative divider after Advisors and Steering Committee */}
                        {(committee.category === "ADVISORS" || committee.category === "STEERING COMMITTEE") && (
                            <div style={{
                                marginTop: '30px',
                                marginBottom: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '8px',
                                flexWrap: 'wrap'
                            }}>
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} style={{
                                        width: '50px',
                                        height: '50px',
                                        background: `linear-gradient(135deg, ${i % 3 === 0 ? '#1a237e' : i % 3 === 1 ? '#FFBA00' : '#00897b'} 0%, ${i % 3 === 0 ? '#3949ab' : i % 3 === 1 ? '#FFC107' : '#26a69a'} 100%)`,
                                        borderRadius: '4px',
                                        opacity: 0.8
                                    }} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
