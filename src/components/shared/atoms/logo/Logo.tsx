/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

function Logo({ className }: any) {
  return (
    <>
      <img className={`${className} hidden md:block`} src='/logo-betwei.svg' />
      <img className={`${className} block md:hidden w-10`} src='/favicon.ico' />
    </>
  )
}

export default Logo
