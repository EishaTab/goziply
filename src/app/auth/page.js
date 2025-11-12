'use client'
import React from 'react'
import Link from 'next/link'
const Page = () => {
  return (
    <>
        <div className="p-4 flex flex-col w-full sm:w-[90%] justify-center items-center gap-4 sm:gap-6">
         <Link 
  href="/auth/login"
  className="text-center cursor-pointer transition-all bg-black text-white rounded-full w-full sm:w-[70%] px-4 py-2 text-base sm:text-lg"
>
  Sign In
</Link>

            <Link href='/auth/signup'
              className="text-center cursor-pointer rounded-full border-2 w-full sm:w-[70%] px-4 py-2 text-base sm:text-lg"
              
            >
              Sign Up
            </Link>
          </div>

          {/* Terms */}
          <div className="text-xs sm:text-sm text-center px-2 mt-4">
            By signing up you agree to our{" "}
            <a
              className="font-bold text-[black] hover:text-[#0a2a7a]"
              href=""
            >
              Terms of Use
            </a>{" "}
            and{" "}
            <a
              className="font-bold text-[black] hover:text-[#0a2a7a]"
              href=""
            >
              Privacy Policy
            </a>.
          </div>
    </>
  )
}

export default Page
