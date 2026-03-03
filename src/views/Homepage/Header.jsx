export default function Header({ headerRef }) {
  return (
    <section ref={headerRef} className='w-full px-6 h-max flex justify-between items-center'>
      <div class='font-music text-4xl h-full flex justify-center py-4 items-center px-3 bg-[#b09958]'>
        q
      </div>

      <div className='flex flex-col gap-2  w-30'>
        {[1, 2, 3].map(item => (
          <div
            key={item}
            className={`w-full h-0.5 inline-block bg-[#878787]`}
          ></div>
        ))}
      </div>
    </section>
  )
}
