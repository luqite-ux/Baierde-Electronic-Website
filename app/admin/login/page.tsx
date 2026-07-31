'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const params = useSearchParams()
  const [pending, setPending] = useState(false)
  const error = params.get('error')
  const reason = params.get('reason')

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-cyan-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">佰尔得电子</h1>
          <p className="mt-2 text-sm text-slate-600">网站管理后台登录</p>
        </div>

        {reason === 'unauthorized' ? (
          <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
            请先登录后再访问管理后台
          </p>
        ) : null}

        <form
          action="/api/auth/login"
          method="post"
          className="space-y-4"
          onSubmit={() => setPending(true)}
        >
          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              邮箱
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-cyan-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 disabled:opacity-60"
          >
            {pending ? '登录中…' : '登录'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
          加载中…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
