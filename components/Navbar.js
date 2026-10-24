const Navbar = () => {
  return (
    <nav className="flex flex-wrap justify-between items-center gap-3 pt-12 text-[15px]">
      <a
        href="https://www.jordanfalcon.dev"
        className="transition duration-300 ease-in-out text-indigo-400 hover:text-white"
      >
        [ jordanfalcon ]
      </a>
      <div className="flex gap-4">
        <a
          href="https://twitter.com/yungyoshh"
          className="transition duration-300 ease-in-out text-blue-400 hover:text-white"
        >
          [ twitter ]
        </a>
        <a
          href="https://github.com/jfalcon93"
          className="transition duration-300 ease-in-out text-indigo-400 hover:text-white"
        >
          [ github ]
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
