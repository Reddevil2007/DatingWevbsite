import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold">HeartLink</Link>
        <nav className="flex items-center gap-4">
          <Link to="/discover" className="text-sm">Discover</Link>
          <Link to="/matches" className="text-sm">Matches</Link>
          <Link to="/profile" className="text-sm">Profile</Link>
          <Link to="/login" className="text-sm">Login</Link>
          <Link to="/signup" className="rounded bg-pink-600 px-3 py-1.5 text-sm text-white">Sign up</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
