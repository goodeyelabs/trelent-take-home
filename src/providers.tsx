//  ======
//  Add various functions via middleware wrappers, such as theming, persisting redux state between sessions
//  ======

import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { store, persistor } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { MessagesProvider } from "@/utils/useMessages";

type providerProps = {
  children: React.ReactNode
}

//  TODO: there's a console error about serialization for reduct-persist that doesn't seem to break anything but should be investigated

export default function Providers({ children }: providerProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class">
          <MessagesProvider>
            {children}
          </MessagesProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}