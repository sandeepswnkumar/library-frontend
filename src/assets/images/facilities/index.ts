// Static imports for facility images so we can resolve dynamic filenames at runtime
// (Next.js will bundle these and provide proper URLs).
import img27x7 from './27x7.jpg'
import airPurifier from './air-purifier.png'
import bankLocker from './bank-locker.jpg'
import dinkingWater from './dinking-water.jpg'
import drinkWater from './drink-water.png'
import gamingRoom from './gaming-room.jpg'
import gdRoom from './gd-room.jpg'
import ivCabin from './iv-cabin.jpg'
import locker from './locker.jpg'
import meetingRoom from './meeting-room.png'
import powerBackup from './power-backup.png'
import quiteZone from './quite_zone.jpg'
import tableSocket from './table_socket.png'
import wifiIcon from './wifi_icon.png'

const facilityImages: Record<string, string> = {
  '27x7.jpg': img27x7,
  'air-purifier.png': airPurifier,
  'bank-locker.jpg': bankLocker,
  'dinking-water.jpg': dinkingWater,
  'drink-water.png': drinkWater,
  'gaming-room.jpg': gamingRoom,
  'gd-room.jpg': gdRoom,
  'iv-cabin.jpg': ivCabin,
  'locker.jpg': locker,
  'meeting-room.png': meetingRoom,
  'power-backup.png': powerBackup,
  'quite_zone.jpg': quiteZone,
  'table_socket.png': tableSocket,
  'wifi_icon.png': wifiIcon,
}

export default facilityImages
