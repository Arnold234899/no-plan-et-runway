
import { Link } from 'react-router-dom';

export const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="text-2xl font-bold text-white hover:text-zinc-300 transition-colors">
        NO PLAN-ET B
      </Link>
      <p className="text-zinc-400 mt-2">Join the fashion revolution</p>
    </div>
  );
};
