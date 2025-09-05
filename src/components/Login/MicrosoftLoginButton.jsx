export default function MicrosoftLoginButton() {
  const handleMicrosoftSignIn = () => {
    alert('Microsoft SSO integration goes here');
  };

  return (
    <button
      onClick={handleMicrosoftSignIn}
      className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-3"
    >
      <div className="w-5 h-5 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-sm"></div>
      <span>Sign in with Microsoft</span>
    </button>
  );
}
