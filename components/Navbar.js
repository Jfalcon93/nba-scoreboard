import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-row mt-16">
        <li className="mr-auto transition duration-300 ease-in-out text-indigo-400 hover:text-white">
          <a href="https://www.jordanfalcon.dev">[ jordanfalcon ] </a>
        </li>
        <li className="mr-3 transition duration-300 ease-in-out text-blue-400 hover:text-white">
          <a href="https://twitter.com/yungyoshh">
            [ <i className="fab fa-twitter"></i> ]
          </a>
        </li>
        <li className="transition duration-300 ease-in-out text-indigo-400 hover:text-white">
          <a href="https://github.com/jfalcon93">
            [ <i className="fab fa-github"></i> ]
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
