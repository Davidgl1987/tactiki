export function Slider() {
  return (
    <div className="bg-slider">
      <div
        className="slide"
        style={{
          animationDelay: '0s',
          backgroundImage: 'url(src/assets/pic4539224.webp)',
        }}
      />
      <div
        className="slide"
        style={{
          animationDelay: '-8s',
          backgroundImage: 'url(src/assets/pic4539225.webp)',
        }}
      />
      <div
        className="slide"
        style={{
          animationDelay: '-16s',
          backgroundImage: 'url(src/assets/pic4539227.webp)',
        }}
      />
      <div
        className="slide"
        style={{
          animationDelay: '-24s',
          backgroundImage: 'url(src/assets/pic4539229.webp)',
        }}
      />
    </div>
  )
}
