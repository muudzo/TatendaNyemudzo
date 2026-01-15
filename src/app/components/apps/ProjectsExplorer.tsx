export function ProjectsExplorer({ osType }: { osType: 'vista' | 'macos' }) {
  const projects = [
    { name: 'AI Chatbot Platform', type: 'Web App', year: '2025', description: 'Real-time chat with GPT-4 integration' },
    { name: 'E-Commerce Dashboard', type: 'React + Node', year: '2024', description: 'Analytics platform for online stores' },
    { name: 'Weather Forecast App', type: 'Mobile', year: '2024', description: 'iOS/Android weather visualization' },
    { name: 'Portfolio Generator', type: 'SaaS', year: '2023', description: 'Automated portfolio builder' },
    { name: 'Task Manager Pro', type: 'Desktop', year: '2023', description: 'Productivity suite with time tracking' },
    { name: 'Recipe Finder', type: 'Web App', year: '2022', description: 'AI-powered recipe recommendations' },
  ];

  if (osType === 'vista') {
    return (
      <div className="p-6">
        {/* Vista Explorer Toolbar */}
        <div
          className="mb-4 p-2 rounded flex items-center gap-2"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.8))',
            border: '1px solid rgba(0, 120, 212, 0.3)',
          }}
        >
          <button
            className="px-4 py-1.5 rounded text-sm transition-all"
            style={{
              fontFamily: '"Segoe UI", sans-serif',
              background: 'linear-gradient(to bottom, #ffffff, #e8f4ff)',
              border: '1px solid rgba(0, 120, 212, 0.4)',
              color: '#003d5c',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to bottom, #e8f4ff, #00a4ef)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to bottom, #ffffff, #e8f4ff)';
              e.currentTarget.style.color = '#003d5c';
            }}
          >
            Views ▼
          </button>
          <div
            className="flex-1 px-3 py-1.5 rounded"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: '12px',
              color: '#666',
            }}
          >
            📁 Projects
          </div>
        </div>

        {/* Vista List View */}
        <div
          className="border rounded"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0, 120, 212, 0.3)',
          }}
        >
          {/* Column Headers */}
          <div
            className="grid grid-cols-4 gap-4 p-2 border-b"
            style={{
              background: 'linear-gradient(to bottom, #f0f8ff, #e0f0ff)',
              borderBottom: '1px solid rgba(0, 120, 212, 0.3)',
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              color: '#003d5c',
            }}
          >
            <div>Name</div>
            <div>Type</div>
            <div>Year</div>
            <div>Description</div>
          </div>

          {/* Project Rows */}
          {projects.map((project, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 p-2 border-b cursor-pointer transition-all"
              style={{
                borderBottom: i < projects.length - 1 ? '1px solid rgba(0, 120, 212, 0.1)' : 'none',
                fontFamily: '"Segoe UI", sans-serif',
                fontSize: '12px',
                color: '#000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 164, 239, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '16px' }}>📄</span>
                <span>{project.name}</span>
              </div>
              <div className="text-gray-600">{project.type}</div>
              <div className="text-gray-600">{project.year}</div>
              <div className="text-gray-600 truncate">{project.description}</div>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div
          className="mt-4 p-2 rounded text-xs"
          style={{
            background: 'linear-gradient(to bottom, #f0f8ff, #e0f0ff)',
            border: '1px solid rgba(0, 120, 212, 0.3)',
            fontFamily: '"Segoe UI", sans-serif',
            color: '#003d5c',
          }}
        >
          {projects.length} items
        </div>
      </div>
    );
  } else {
    // macOS Finder
    return (
      <div className="p-4">
        {/* Finder Toolbar */}
        <div
          className="mb-4 p-2 rounded flex items-center gap-2"
          style={{
            background: 'linear-gradient(to bottom, #e8e8e8, #d0d0d0)',
            border: '1px solid rgba(0, 0, 0, 0.2)',
          }}
        >
          <button
            className="px-3 py-1 rounded text-xs transition-all"
            style={{
              fontFamily: '"Lucida Grande", sans-serif',
              background: 'linear-gradient(to bottom, #f0f9ff, #bae6fd)',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              color: '#000',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to bottom, #bae6fd, #7dd3fc)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to bottom, #f0f9ff, #bae6fd)';
            }}
          >
            Icon View
          </button>
          <button
            className="px-3 py-1 rounded text-xs"
            style={{
              fontFamily: '"Lucida Grande", sans-serif',
              background: 'linear-gradient(to bottom, #ffffff, #e8e8e8)',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              color: '#000',
            }}
          >
            List View
          </button>
        </div>

        {/* Finder Grid View */}
        <div className="grid grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex flex-col items-center cursor-pointer transition-all p-3 rounded"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(147, 197, 253, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Folder Icon */}
              <div
                className="w-20 h-20 mb-2 rounded flex items-center justify-center text-5xl"
                style={{
                  background: 'linear-gradient(to bottom, #8ec5e8, #5a9bc5)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                }}
              >
                📁
              </div>
              
              {/* Folder Name */}
              <div
                className="text-center text-xs max-w-full"
                style={{
                  fontFamily: '"Lucida Grande", sans-serif',
                  fontSize: '11px',
                  color: '#000',
                  wordWrap: 'break-word',
                }}
              >
                {project.name}
              </div>
              
              {/* Metadata */}
              <div
                className="text-center text-xs mt-1"
                style={{
                  fontFamily: '"Lucida Grande", sans-serif',
                  fontSize: '10px',
                  color: '#666',
                }}
              >
                {project.year}
              </div>
            </div>
          ))}
        </div>

        {/* Finder Status Bar */}
        <div
          className="mt-4 p-2 text-xs flex justify-between"
          style={{
            background: 'linear-gradient(to bottom, #e8e8e8, #d0d0d0)',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            fontFamily: '"Lucida Grande", sans-serif',
            color: '#333',
          }}
        >
          <span>{projects.length} items</span>
          <span>Projects folder</span>
        </div>
      </div>
    );
  }
}
