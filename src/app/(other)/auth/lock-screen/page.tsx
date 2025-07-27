import { Metadata } from "next"
import LockScreen from "./component/LockScreen"

export const metadata: Metadata = { title: "Lock-Screen" }

const LockScreenPage = () => {
  return (
    <LockScreen />
  )
}

export default LockScreenPage