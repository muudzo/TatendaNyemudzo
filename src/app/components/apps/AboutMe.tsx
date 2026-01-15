export function AboutMe({ osType }: { osType: 'vista' | 'macos' }) {
  const fontFamily = osType === 'vista' ? '"Segoe UI", sans-serif' : '"Lucida Grande", sans-serif';
  const primaryColor = osType === 'vista' ? '#003d5c' : '#000';
  const secondaryColor = osType === 'vista' ? '#1e5799' : '#333';

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Profile Section */}
      <div className="flex items-start gap-6 mb-8">
        <div
          className="w-32 h-32 rounded flex items-center justify-center text-6xl flex-shrink-0"
          style={{
            background: osType === 'vista'
              ? 'linear-gradient(to bottom, #e8f4ff, #00a4ef)'
              : 'linear-gradient(to bottom, #f0f9ff, #7dd3fc)',
            border: `2px solid ${osType === 'vista' ? 'rgba(0, 120, 212, 0.5)' : 'rgba(0, 0, 0, 0.2)'}`,
            boxShadow: osType === 'vista'
              ? '0 4px 12px rgba(0, 164, 239, 0.3)'
              : '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          👨‍💻
        </div>
        
        <div>
          <h1
            className="mb-2"
            style={{
              fontFamily,
              fontSize: '32px',
              fontWeight: osType === 'vista' ? 600 : 'bold',
              color: primaryColor,
            }}
          >
            Alex Thompson
          </h1>
          <p
            className="mb-4"
            style={{
              fontFamily,
              fontSize: '16px',
              color: secondaryColor,
            }}
          >
            Full-Stack Developer & UI/UX Designer
          </p>
          <div
            style={{
              fontFamily,
              fontSize: '13px',
              color: secondaryColor,
              lineHeight: '1.6',
            }}
          >
            <div className="mb-1">📧 alex.thompson@email.com</div>
            <div className="mb-1">🌐 github.com/alexthompson</div>
            <div>📍 San Francisco, CA</div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div
        className="mb-6 p-4 rounded"
        style={{
          background: osType === 'vista'
            ? 'rgba(232, 244, 255, 0.5)'
            : 'rgba(248, 248, 248, 1)',
          border: `1px solid ${osType === 'vista' ? 'rgba(0, 120, 212, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
      >
        <h2
          className="mb-3"
          style={{
            fontFamily,
            fontSize: '18px',
            fontWeight: osType === 'vista' ? 600 : 'bold',
            color: primaryColor,
          }}
        >
          About Me
        </h2>
        <p
          style={{
            fontFamily,
            fontSize: '13px',
            color: secondaryColor,
            lineHeight: '1.7',
          }}
        >
          I'm a passionate developer with 8+ years of experience building web applications, 
          mobile apps, and design systems. I specialize in React, TypeScript, and modern CSS, 
          with a deep appreciation for both cutting-edge technology and nostalgic UI design.
        </p>
      </div>

      {/* Skills Section */}
      <div
        className="mb-6 p-4 rounded"
        style={{
          background: osType === 'vista'
            ? 'rgba(232, 244, 255, 0.5)'
            : 'rgba(248, 248, 248, 1)',
          border: `1px solid ${osType === 'vista' ? 'rgba(0, 120, 212, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
      >
        <h2
          className="mb-3"
          style={{
            fontFamily,
            fontSize: '18px',
            fontWeight: osType === 'vista' ? 600 : 'bold',
            color: primaryColor,
          }}
        >
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { category: 'Frontend', skills: 'React, Vue, TypeScript, CSS/Sass' },
            { category: 'Backend', skills: 'Node.js, Python, PostgreSQL' },
            { category: 'Design', skills: 'Figma, Photoshop, UI Systems' },
            { category: 'Tools', skills: 'Git, Docker, AWS, CI/CD' },
          ].map((item, i) => (
            <div key={i}>
              <div
                className="mb-1"
                style={{
                  fontFamily,
                  fontSize: '13px',
                  fontWeight: osType === 'vista' ? 600 : 'bold',
                  color: primaryColor,
                }}
              >
                {item.category}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: '12px',
                  color: secondaryColor,
                }}
              >
                {item.skills}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div
        className="p-4 rounded"
        style={{
          background: osType === 'vista'
            ? 'rgba(232, 244, 255, 0.5)'
            : 'rgba(248, 248, 248, 1)',
          border: `1px solid ${osType === 'vista' ? 'rgba(0, 120, 212, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
      >
        <h2
          className="mb-3"
          style={{
            fontFamily,
            fontSize: '18px',
            fontWeight: osType === 'vista' ? 600 : 'bold',
            color: primaryColor,
          }}
        >
          Experience Highlights
        </h2>
        <div className="space-y-3">
          {[
            { role: 'Senior Developer', company: 'Tech Corp', year: '2020-Present' },
            { role: 'Full-Stack Developer', company: 'Startup Inc', year: '2018-2020' },
            { role: 'Frontend Developer', company: 'Agency Co', year: '2016-2018' },
          ].map((job, i) => (
            <div key={i} className="flex justify-between">
              <div>
                <div
                  style={{
                    fontFamily,
                    fontSize: '13px',
                    fontWeight: osType === 'vista' ? 600 : 'bold',
                    color: primaryColor,
                  }}
                >
                  {job.role}
                </div>
                <div
                  style={{
                    fontFamily,
                    fontSize: '12px',
                    color: secondaryColor,
                  }}
                >
                  {job.company}
                </div>
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: '12px',
                  color: secondaryColor,
                }}
              >
                {job.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
