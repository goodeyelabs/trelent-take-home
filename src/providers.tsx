import {ThemeProvider} from 'next-themes'
import { Provider } from 'react-redux'
import { store, persistor } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { MessagesProvider } from "@/hooks/useMessages";

type providerProps = {
    children: React.ReactNode
}

export default function Providers({ children }:providerProps) {
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