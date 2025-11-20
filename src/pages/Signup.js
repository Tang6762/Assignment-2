import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import backgroundImage from '../assets/bg-image.png';
import googleLogo from '../assets/google.svg';
import appleLogo from '../assets/apple.svg';

function Signup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const savedTheme = localStorage.getItem('groovifyBackground');
  const darkBackground = savedTheme === 'dark';

  const backgroundStyle = darkBackground
      ? { backgroundColor: '#111827' }
      : { backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'repeat' };

  const handleSignup = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      const docRef = await addDoc(collection(db, 'users'), {
        name: data.name,
        email: data.email,
        password: data.password, // real app: hash password!
        createdAt: serverTimestamp(),
        signupMethod: 'email'
      });

      console.log("User created ID:", docRef.id);
      setMessage("✅ Account created successfully!");
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("❌ Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          className="min-h-screen text-white flex flex-col items-center"
          style={backgroundStyle}
      >
        <Navbar />

        <div className="mt-28 mb-10 flex flex-col items-center py-8 px-10 rounded-xl w-96 text-center bg-gray-800 bg-opacity-95 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">

          <p className="font-bold text-3xl mb-5">Create your account</p>

          {/* Success/Error Message */}
          {message && (
              <div className={`w-full p-3 rounded mb-4 text-sm ${
                  message.includes('✅') ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {message}
              </div>
          )}

          {/* Reusable Form */}
          <AuthForm
              type="signup"
              onSubmit={handleSignup}
          />

          <div className="my-4 text-gray-400">or</div>

          <button className="w-full py-2 rounded-full border border-gray-600 bg-transparent text-white mb-3 cursor-pointer hover:bg-gray-700 transition-colors duration-300 flex justify-center items-center gap-3">
            <img className="h-5 w-5" src={googleLogo} alt="Google Logo" />
            Sign up with Google
          </button>

          <button className="w-full py-2 rounded-full border border-gray-600 bg-transparent text-white mb-3 cursor-pointer hover:bg-gray-700 transition-colors duration-300 flex justify-center items-center gap-3">
            <img className="h-5 w-5" src={appleLogo} alt="Apple Logo" />
            Sign up with Apple
          </button>

          <p className="mt-5 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 no-underline hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <Footer />
      </div>
  );
}

export default Signup;
