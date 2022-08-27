export default function Button ({
  icon,
  children,
  onClick,
  disabled=false,
  color='text-white bg-indigo-600 hover:bg-indigo-700'
}: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative w-64 flex justify-center py-2 px-4
        border border-transparent text-sm font-medium rounded-md
        ${color} focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${disabled && 'disabled:opacity-60 cursor-not-allowed'}`}>
      <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
        { icon }
      </span>
      { children }
    </button>
  )
}
