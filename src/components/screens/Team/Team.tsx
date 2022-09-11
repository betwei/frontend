import { useState } from 'react'
import Image from 'next/image'
import { IoLogoGithub } from 'react-icons/io5'

function Team() {
  const [current, setCurrent] = useState(null as any)
  const items = [
    {
      photo: '/team/esteban.jpeg',
      name: 'Esteban',
      contact: 'stban94diaz@gmail.com',
      github: 'https://github.com/stban94diaz'
    },
    {
      photo: '/team/julian.png',
      name: 'Julian',
      contact: 'njmdistrisoft@gmail.com',
      github: 'https://github.com/fkmurphy'
    },
    {
      photo: '/team/adan.webp',
      name: 'Adan',
      contact: 'https://twitter.com/AdanUriPlata',
      github: 'https://github.com/adanuriplata'
    },
    {
      photo: '/team/armando.webp',
      name: 'Armando',
      contact: 'rivera.armando0829@gmail.com',
      github: 'https://github.com/Armando101'
    },
    {
      photo: '/team/nilton.jpeg',
      name: 'Nilton',
      contact: '@nilt0n',
      github: 'https://github.com/nilt0n'
    },
  ]
  return (
    <div>
      <div className="flex items-center space-x-2 text-base">
        <h4 className="font-semibold text-slate-400">Team</h4>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {items.length}
        </span>
        {current && <>
          <b>{current.name}</b>
          <span>{current.contact}</span>
          <a href={current.github} className="text-blue-500">
            <IoLogoGithub />
          </a>
        </>}
      </div>
      <div className="mt-3 flex -space-x-2 overflow-hidden">
        {items.map((item, i) => (
          <Image key={i}
            className="inline-block rounded-full object-cover right-3"
            width={80} height={80}
            src={item.photo} alt={item.name}
            onMouseEnter={() => setCurrent(item)} />
        ))}
      </div>
    </div>
  )
}

export default Team