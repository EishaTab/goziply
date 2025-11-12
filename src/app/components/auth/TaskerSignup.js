import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export const TaskerSignup = ({ setShowTS }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { countryCode: 'US' },
  });

  const [open, setOpen] = useState(false);

  const countries = [
    { name: 'United States', code: 'US', dialCode: '+1', min: 10, max: 10 },
    { name: 'United Kingdom', code: 'GB', dialCode: '+44', min: 10, max: 11 },
    { name: 'India', code: 'IN', dialCode: '+91', min: 10, max: 10 },
    { name: 'Pakistan', code: 'PK', dialCode: '+92', min: 10, max: 11 },
    { name: 'Canada', code: 'CA', dialCode: '+1', min: 10, max: 10 },
    { name: 'Australia', code: 'AU', dialCode: '+61', min: 9, max: 9 },
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    register('countryCode', { required: true });
    setValue('countryCode', 'US', { shouldValidate: false });
  }, [register, setValue]);

  const countryCode = watch('countryCode') || 'US';
  const selectedCountry = countries.find((c) => c.code === countryCode) || countries[0];

  useEffect(() => {
    function onDocClick(e) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const onPhoneInput = (e) => {
    const cleaned = (e.target.value || '').replace(/\D/g, '');
    e.target.value = cleaned;
  };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    setShowTS(false);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50 p-4"
      onClick={() => setShowTS(false)}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8 relative flex flex-col max-h-[95vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowTS(false)}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#0d362c] mb-2">Create your account</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Create an account to get started. Then we’ll text you a link to download the Tasker app to complete your
          registration. Standard call, messaging, or data rates apply.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="First Name"
            {...register('firstName', { required: "Can't be blank." })}
            className={`w-full border rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

          <input
            type="text"
            placeholder="Last Name"
            {...register('lastName', { required: "Can't be blank." })}
            className={`w-full border rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: "Can't be blank.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
            })}
            className={`w-full border rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Phone with country selection */}
          <div className="flex gap-3 items-stretch">
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                className="flex items-center gap-2 border rounded px-3 py-2 min-w-[110px] bg-white hover:shadow-sm cursor-pointer"
              >
                <img
                  src={`https://flagsapi.com/${selectedCountry.code}/flat/32.png`}
                  alt={`${selectedCountry.name} flag`}
                  className="w-6 h-4 object-cover"
                />
                <span className="font-medium">{selectedCountry.dialCode}</span>
              </button>
              {open && (
                <ul className="absolute left-0 mt-2 w-60 max-h-56 overflow-auto rounded bg-white border shadow-lg z-50">
                  {countries.map((c) => (
                    <li
                      key={c.code}
                      onClick={() => {
                        setValue('countryCode', c.code, { shouldValidate: true, shouldDirty: true });
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={`https://flagsapi.com/${c.code}/flat/32.png`}
                        alt={`${c.name} flag`}
                        className="w-6 h-4 object-cover"
                      />
                      <span className="flex-1 text-sm">{c.name}</span>
                      <span className="text-sm text-gray-600">{c.dialCode}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="tel"
              placeholder="Phone Number"
              {...register('phone', {
                required: "Can't be blank.",
                setValueAs: (v) => (v || '').replace(/\D/g, ''),
                validate: (val) => {
                  const len = (val || '').length;
                  return len >= selectedCountry.min && len <= selectedCountry.max || 'Invalid phone number';
                },
              })}
              onInput={onPhoneInput}
              className={`flex-1 border rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: "Can't be blank.",
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
            className={`w-full border rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <div className="space-y-2 pt-2">
            <label className="flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                {...register('soleProprietor', { required: 'Required' })}
                className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm sm:text-base">I acknowledge I am a sole proprietor.</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                {...register('terms', { required: 'Required' })}
                className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm sm:text-base">I agree to the Terms and Conditions and Privacy Policy.</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-600 transition mt-4"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};
