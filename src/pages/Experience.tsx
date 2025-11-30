import { experiences } from '../data/content';

const ExperiencePage = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-3xl text-white font-semibold mb-4">
          <span className="text-primary">/</span>experience
        </h2>
        <p className="text-gray">My journey so far</p>
      </div>

      {/* Timeline Container */}
      <div className="max-w-3xl">
        <div className="relative border-l border-gray-600 ml-3 md:ml-6 space-y-12 pb-2">
          
          {experiences.map((job) => (
            /* 1. Add 'group' here so children can react to hovering this container */
            <div key={job.id} className="relative pl-8 group">
              
              {/* 2. Timeline Dot: Changed 'hover:' to 'group-hover:' Now it lights up when you hover ANYWHERE on the job item */}
              <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#282C33] border border-gray-600 rounded-full group-hover:bg-primary group-hover:border-primary transition-all duration-300"></div>

              {/* 3. Card: Changed 'hover:' to 'group-hover:' so the border glows together with the dot */}
              <div className="border border-gray-600 p-6 group-hover:border-white transition-colors bg-card">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-white font-medium text-xl">{job.role}</h3>
                  <span className="text-gray-500 font-mono">{job.period}</span>
                </div>
                
                <p className="text-primary font-medium mb-4">
                  {job.company} 
                  <span className="text-gray-500 ml-2 text-xs">
                    <i className="fas fa-map-marker-alt"></i> {job.location}
                  </span>
                </p>

                {Array.isArray(job.description) ? (
                  <ul className="list-disc list-inside text-gray-400 space-y-2 leading-relaxed">
                    {job.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 leading-relaxed">{job.description}</p>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;