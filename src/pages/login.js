import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Header from '@/components/Header/AppHeader';
import Footer from '@/components/Header/Footer';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const auth = getAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoginPage={true} />
      <div className="flex-grow flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 w-11/12 max-w-2xl rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Log ind</h2>
          <form className="space-y-4 w-4/5 mx-auto" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-gray-700">E-mail</label>
              <input type="email" id="email" name="email" required className="w-full p-2 border custom-red" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input type="password" id="password" name="password" required className="w-full p-2 border custom-red" />
            </div>
            <button type="submit" className="w-full p-2 bg-custom-red text-white border custom-red">Log ind</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
