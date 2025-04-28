import { getYear } from "../utilities/getDates";

const Footer = ({ copyright = getYear(), author = "PennyWise" }) => (
  <footer className="font-Mon font-bold p-4 text-[#434343] text-center lg:text-[1.5rem]">
    <p>
      &copy; {copyright} {author}
    </p>
  </footer>
);

export default Footer;