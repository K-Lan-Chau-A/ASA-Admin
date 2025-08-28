import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="dark min-h-screen flex items-center justify-center bg-[#3D3D3D]">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
