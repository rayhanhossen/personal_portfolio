import { personalInfo } from '../data/content';

const Footer = () => {
  return (
    // 🚨 UPDATED: Light border, increased top margin
    <footer className="border-t border-gray-300 pt-10 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-[30px] md:mb-[32px]">
        <div>
          {/* 🚨 UPDATED: Logo/Name (Clean, Sans-serif) */}
          <div className="flex items-center gap-2 font-bold text-gray-800 text-xl mb-2">
            <i className="fas fa-code text-accent"></i> {/* Use a professional icon */}
            <span>{personalInfo.name}</span>
            {/* 🚨 UPDATED: Email (Subtle, dark text) */}
            <span 
                className="text-gray-500 text-sm font-normal ml-2 sm:inline"
                data-detectors="false"
                data-item-type="false"
                x-apple-data-detectors="false"
            >
                {personalInfo.email}
            </span>
          </div>
          {/* 🚨 UPDATED: Title/Role (Subtle, professional color) */}
          <p className="text-gray-600 text-sm font-medium">{personalInfo.title}</p>
        </div>

        <div>
            {/* 🚨 UPDATED: Heading */}
            <h3 className="text-gray-800 font-bold text-lg mb-3">Connect</h3>
            {/* 🚨 UPDATED: Social Icons (Dark gray, hover accent) */}
            <div className="flex gap-4">
                <a href={personalInfo.linkedin} target="_blank" className="text-gray-500 hover:text-accent text-xl transition-colors" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a href={personalInfo.github} target="_blank" className="text-gray-500 hover:text-accent text-xl transition-colors" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href={personalInfo.whatsapp} target="_blank" className="text-gray-500 hover:text-accent text-xl transition-colors" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                <a href={personalInfo.facebook} target="_blank" className="text-gray-500 hover:text-accent text-xl transition-colors" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
                <a href={personalInfo.instagram} target="_blank" className="text-gray-500 hover:text-accent text-xl transition-colors" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
        </div>
      </div>
      
      {/* 🚨 UPDATED: Clean Copyright Notice */}
      <div className="md:text-center text-gray-500 text-sm pt-3">
        &copy; {new Date().getFullYear()}. Designed & Built by <span className='font-semibold text-gray-700'>{personalInfo.name}</span>.
      </div>
    </footer>
  );
};

export default Footer;