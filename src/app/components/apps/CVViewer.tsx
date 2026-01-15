export function CVViewer({ osType }: { osType: 'vista' | 'macos' }) {
  const fontFamily = osType === 'vista' ? '"Segoe UI", sans-serif' : '"Lucida Grande", sans-serif';

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div
        className="p-2 flex items-center gap-2 border-b"
        style={{
          background: osType === 'vista'
            ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.8))'
            : 'linear-gradient(to bottom, #e8e8e8, #d0d0d0)',
          borderBottom: `1px solid ${osType === 'vista' ? 'rgba(0, 120, 212, 0.3)' : 'rgba(0, 0, 0, 0.2)'}`,
        }}
      >
        <button
          className="px-3 py-1 rounded text-xs transition-all"
          style={{
            fontFamily,
            background: osType === 'vista'
              ? 'linear-gradient(to bottom, #ffffff, #e8f4ff)'
              : 'linear-gradient(to bottom, #f0f9ff, #bae6fd)',
            border: `1px solid ${osType === 'vista' ? 'rgba(0, 120, 212, 0.4)' : 'rgba(0, 0, 0, 0.2)'}`,
            color: osType === 'vista' ? '#003d5c' : '#000',
          }}
        >
          📄 Print
        </button>
        <button
          className="px-3 py-1 rounded text-xs"
          style={{
            fontFamily,
            background: osType === 'vista'
              ? 'linear-gradient(to bottom, #ffffff, #e8f4ff)'
              : 'linear-gradient(to bottom, #f0f9ff, #bae6fd)',
            border: `1px solid ${osType === 'vista' ? 'rgba(0, 120, 212, 0.4)' : 'rgba(0, 0, 0, 0.2)'}`,
            color: osType === 'vista' ? '#003d5c' : '#000',
          }}
        >
          💾 Save As...
        </button>
        <div className="flex-1" />
        <span
          className="text-xs"
          style={{
            fontFamily,
            color: osType === 'vista' ? '#003d5c' : '#333',
          }}
        >
          100%
        </span>
      </div>

      {/* Document View */}
      <div className="flex-1 overflow-auto p-8 flex justify-center" style={{ background: '#e5e5e5' }}>
        <div
          className="w-full max-w-3xl p-12 shadow-lg"
          style={{
            background: '#ffffff',
            minHeight: '100%',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* CV Header */}
          <div className="mb-8 text-center border-b-2 pb-6" style={{ borderColor: osType === 'vista' ? '#00a4ef' : '#7dd3fc' }}>
            <h1
              className="mb-2"
              style={{
                fontFamily,
                fontSize: '36px',
                fontWeight: 'bold',
                color: osType === 'vista' ? '#003d5c' : '#000',
              }}
            >
              ALEX THOMPSON
            </h1>
            <p
              style={{
                fontFamily,
                fontSize: '14px',
                color: '#666',
              }}
            >
              Full-Stack Developer & UI/UX Designer
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily,
                fontSize: '12px',
                color: '#666',
              }}
            >
              alex.thompson@email.com | +1 (555) 123-4567 | San Francisco, CA
            </p>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2
              className="mb-3 pb-2 border-b"
              style={{
                fontFamily,
                fontSize: '18px',
                fontWeight: 'bold',
                color: osType === 'vista' ? '#003d5c' : '#000',
                borderBottom: `1px solid #ddd`,
              }}
            >
              PROFESSIONAL SUMMARY
            </h2>
            <p
              style={{
                fontFamily,
                fontSize: '12px',
                color: '#333',
                lineHeight: '1.7',
              }}
            >
              Results-driven Full-Stack Developer with 8+ years of experience designing and implementing 
              scalable web applications. Expertise in React, TypeScript, Node.js, and modern design systems. 
              Passionate about creating intuitive user experiences and optimizing application performance.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2
              className="mb-3 pb-2 border-b"
              style={{
                fontFamily,
                fontSize: '18px',
                fontWeight: 'bold',
                color: osType === 'vista' ? '#003d5c' : '#000',
                borderBottom: `1px solid #ddd`,
              }}
            >
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {[
                {
                  role: 'Senior Full-Stack Developer',
                  company: 'Tech Corporation',
                  period: '2020 - Present',
                  points: [
                    'Led development of microservices architecture serving 1M+ users',
                    'Implemented design system used across 15+ product teams',
                    'Reduced application load time by 60% through optimization',
                  ],
                },
                {
                  role: 'Full-Stack Developer',
                  company: 'Startup Innovations Inc.',
                  period: '2018 - 2020',
                  points: [
                    'Built and deployed 12 production web applications',
                    'Established CI/CD pipeline reducing deployment time by 80%',
                    'Mentored 5 junior developers in best practices',
                  ],
                },
                {
                  role: 'Frontend Developer',
                  company: 'Digital Agency Co.',
                  period: '2016 - 2018',
                  points: [
                    'Developed responsive websites for Fortune 500 clients',
                    'Created reusable component library in React',
                    'Collaborated with designers on UX improvements',
                  ],
                },
              ].map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span
                      style={{
                        fontFamily,
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#000',
                      }}
                    >
                      {job.role}
                    </span>
                    <span
                      style={{
                        fontFamily,
                        fontSize: '12px',
                        color: '#666',
                      }}
                    >
                      {job.period}
                    </span>
                  </div>
                  <div
                    className="mb-2"
                    style={{
                      fontFamily,
                      fontSize: '12px',
                      color: '#666',
                      fontStyle: 'italic',
                    }}
                  >
                    {job.company}
                  </div>
                  <ul className="list-disc ml-5 space-y-1">
                    {job.points.map((point, j) => (
                      <li
                        key={j}
                        style={{
                          fontFamily,
                          fontSize: '11px',
                          color: '#333',
                          lineHeight: '1.6',
                        }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2
              className="mb-3 pb-2 border-b"
              style={{
                fontFamily,
                fontSize: '18px',
                fontWeight: 'bold',
                color: osType === 'vista' ? '#003d5c' : '#000',
                borderBottom: `1px solid #ddd`,
              }}
            >
              EDUCATION
            </h2>
            <div className="flex justify-between">
              <div>
                <div
                  style={{
                    fontFamily,
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#000',
                  }}
                >
                  Bachelor of Science in Computer Science
                </div>
                <div
                  style={{
                    fontFamily,
                    fontSize: '12px',
                    color: '#666',
                  }}
                >
                  University of California, Berkeley
                </div>
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: '12px',
                  color: '#666',
                }}
              >
                2012 - 2016
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2
              className="mb-3 pb-2 border-b"
              style={{
                fontFamily,
                fontSize: '18px',
                fontWeight: 'bold',
                color: osType === 'vista' ? '#003d5c' : '#000',
                borderBottom: `1px solid #ddd`,
              }}
            >
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { category: 'Languages', skills: 'JavaScript, TypeScript, Python, HTML/CSS' },
                { category: 'Frameworks', skills: 'React, Vue, Node.js, Express, Next.js' },
                { category: 'Databases', skills: 'PostgreSQL, MongoDB, Redis, MySQL' },
                { category: 'Tools', skills: 'Git, Docker, AWS, CI/CD, Figma' },
              ].map((item, i) => (
                <div key={i}>
                  <span
                    style={{
                      fontFamily,
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#000',
                    }}
                  >
                    {item.category}:
                  </span>{' '}
                  <span
                    style={{
                      fontFamily,
                      fontSize: '11px',
                      color: '#333',
                    }}
                  >
                    {item.skills}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
