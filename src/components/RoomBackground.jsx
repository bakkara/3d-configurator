export default function RoomBackground() {
    return (
      <div
        style={{
          backgroundImage: 'url("/3d-configurator/models/room.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
      />
    )
  }