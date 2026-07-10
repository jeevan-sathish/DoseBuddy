import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.userProfile);

  return (
    <section className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-6">
      <div className="max-w-4xl flex flex-col items-center text-center gap-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
            Code<span className="text-red-500">B</span>oard
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-8">
            Stay on top of your medications with intelligent reminders,
            personalized schedules, and AI-powered health assistance. Never miss
            a dose and take control of your health journey with confidence.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to={isAuthenticated ? "/DiagnosisPage" : "/LogInPage"}
            className="bg-red-500 hover:bg-red-600 transition duration-300 px-8 py-3 rounded-lg font-semibold"
          >
            Start with
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
