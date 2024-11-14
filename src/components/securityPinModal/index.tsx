// import { useState, useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { X, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
// import { securityPinModalState } from '@/src/recoil/atoms/securityPinAtom';

// const schema = yup.object().shape({
//   pin: yup.string().required('PIN is required').length(4, 'PIN must be 4 digits'),
// });

// type FormData = {
//   pin: string;
// };

// export function SecurityPinModal() {
//   const [modalState, setModalState] = useRecoilState(securityPinModalState);
//   const [error, setError] = useState<string | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
//     resolver: yupResolver(schema),
//   });

//   useEffect(() => {
//     if (modalState.isOpen) {
//       setIsVisible(true);
//     }
//   }, [modalState.isOpen]);

//   const onSubmit = (data: FormData) => {
//     if (data.pin === '1234') { // Replace with actual validation logic
//       setError(null);
//       closeModal();
//       modalState.onSuccess?.();
//     } else {
//       setError('Incorrect PIN');
//     }
//   };

//   const closeModal = () => {
//     setIsVisible(false);
//     setTimeout(() => {
//       setModalState({ isOpen: false, onSuccess: undefined });
//       reset();
//       setError(null);
//     }, 300);
//   };

//   if (!modalState.isOpen) return null;

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
//       <div className={`bg-white rounded-lg p-8 w-full max-w-md shadow-2xl transition-all duration-300 transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 rounded-lg" />
//         <div className="relative">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//               <ShieldCheck className="mr-2 text-blue-500" size={28} />
//               Security PIN
//             </h2>
//             <button
//               onClick={closeModal}
//               className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//               aria-label="Close modal"
//             >
//               <X size={24} />
//             </button>
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div>
//               <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
//                 Enter your 4-digit PIN
//               </label>
//               <div className="relative">
//                 <input
//                   {...register('pin')}
//                   type="password"
//                   inputMode="numeric"
//                   maxLength={4}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg tracking-widest"
//                   placeholder="••••"
//                 />
//                 <Lock className="absolute right-3 top-3.5 text-gray-400" size={20} />
//               </div>
//               {errors.pin && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <AlertCircle size={16} className="mr-1" />
//                   {errors.pin.message}
//                 </p>
//               )}
//               {error && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <AlertCircle size={16} className="mr-1" />
//                   {error}
//                 </p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               Verify PIN
//             </button>
//           </form>
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-500">
//               Protect your account with a secure PIN
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>S
//   );
// }