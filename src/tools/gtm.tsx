import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

function GTM() {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-W33GP5PP" })
  }, [])

  return null
}

export default GTM