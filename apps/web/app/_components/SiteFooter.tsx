import Link from "next/link";
import GithubIcon from "../_utils/GithubIcon";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#06050b] py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">
            DevMatrix
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/docs/introduction" className="hover:text-white transition-colors">
            Docs
          </Link>
          <Link
            href="#"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <GithubIcon width={30} height={30} className="text-black" />
            GitHub
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-8 text-center md:text-left text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} DevMatrix Ecosystem. All rights
        reserved.
      </div>
    </footer>
  );
}
