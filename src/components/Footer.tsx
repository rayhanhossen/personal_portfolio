import { personalInfo } from '../data/content';

const Footer = () => {
  return (
    <footer className="border-t border-gray-600 pt-8 pb-8 mt-24">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-lg mb-2">
            <i className="fas fa-terminal text-primary"></i>
            <span>{personalInfo.name}</span>
            <span className="text-gray-500 text-sm font-normal ml-2"
                // 🚨 ADD THIS ATTRIBUTE 🚨
                data-detectors="false"
                data-item-type="false" // Sometimes needed for newer iOS versions
                x-apple-data-detectors="false"
            >
                {personalInfo.email}
            </span>
          </div>
          <p className="text-green-400 text-sm">AI Software Engineer</p>
        </div>

        <div>
            <h3 className="text-white font-bold text-lg mb-2">Socials<span className="animate-pulse">_</span></h3>
            <div className="flex gap-4">
                <a href={personalInfo.linkedin} target="_blank" className="text-gray hover:text-primary text-xl"><i className="fab fa-linkedin"></i></a>
                <a href={personalInfo.github} target="_blank" className="text-gray hover:text-primary text-xl"><i className="fab fa-github"></i></a>
                <a href={personalInfo.whatsapp} target="_blank" className="text-gray hover:text-primary text-xl"><i className="fab fa-whatsapp"></i></a>
                <a href={personalInfo.facebook} target="_blank" className="text-gray hover:text-primary text-xl"><i className="fa-brands fa-facebook"></i></a>
                <a href={personalInfo.instagram} target="_blank" className="text-gray hover:text-primary text-xl"><i className="fa-brands fa-instagram"></i></a>
            </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm">
        &copy; Copyright {new Date().getFullYear()}. <span className="font-mono ml-1 text-gray-600">$ sudo make by <span className='gradient-text'>{personalInfo.name}</span></span>
      </div>
    </footer>
  );
};

export default Footer;